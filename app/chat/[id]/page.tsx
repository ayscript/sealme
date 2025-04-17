"use client";
import Chat from "@/components/Chat";
import Input from "@/components/Input";
import React, { useEffect, useRef, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import Link from "next/link";
import Button from "@/components/Button";

const Page = () => {
  const [messagesArray, setMessagesarray] = useState<Message[]>([]);
  const [chatId, setChatId] = useState("");
  const [isValidChat, setIsValidChat] = useState<boolean | null>(null); // Track if the chat exists

  interface Message {
    chatType: string;
    textContent: string;
    dateCreated: string;
    id?: string;
  }

  function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // e.g., Jan, Feb
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
    const formattedDate = `${day} ${month} ${year}`;

    return `${formattedDate} - ${formattedTime}`;
  }

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    setChatId(id);

    // Check if the chat exists in Firebase
    const checkChatExists = async () => {
      const chatDocRef = doc(db, "chats", id);
      const chatDoc = await getDoc(chatDocRef);
      if (chatDoc.exists()) {
        setIsValidChat(true);
      } else {
        setIsValidChat(false);
      }
    };

    checkChatExists();
  }, []);

  useEffect(() => {
    if (chatId && isValidChat) {
      const messagesCollectionRef = collection(db, `chats/${chatId}/chats`);
      const unsubscribe = onSnapshot(
        messagesCollectionRef,
        (snapshot) => {
          const newMessages = snapshot.docChanges()
            .filter((change) => change.type === "added") // Only process new messages
            .map((change) => {
              const messageData = change.doc.data();

              return {
                id: change.doc.id, // Firestore document ID
                chatType: messageData.sender,
                textContent: messageData.textContent,
                dateCreated: messageData.dateCreated, // Keep as ISO string
              };
            });

          // Update the messages array without duplicates
          setMessagesarray((prevMessages) => {
            const updatedMessages = [...prevMessages];

            newMessages.forEach((newMessage) => {
              // Check if the message already exists
              const exists = updatedMessages.some(
                (msg) => msg.id === newMessage.id
              );

              if (!exists) {
                updatedMessages.push(newMessage);
              }
            });

            // Sort messages by dateCreated
            updatedMessages.sort((a, b) => {
              const dateA = new Date(a.dateCreated).getTime();
              const dateB = new Date(b.dateCreated).getTime();
              return dateA - dateB; // Ascending order
            });

            return updatedMessages;
          });
        },
        (error) => {
          console.error("Error retrieving messages: ", error);
        }
      );

      return () => unsubscribe();
    }
  }, [chatId, isValidChat]);

  async function storeMessage(message: Message): Promise<void> {
    try {
      const mainCollectionRef = collection(db, `chats/${chatId}/chats`);
      await addDoc(mainCollectionRef, {
        ...message,
        dateCreated: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error creating document or sub-collection:", error);
    }
  }

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const messageArrayOutput = messagesArray.map((e, index) => (
    <Chat chatType={e.chatType} dateCreated={formatDate(e.dateCreated)} key={index}>
      {e.textContent}
    </Chat>
  ));

  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  if (isValidChat === null) {
    return <p>Loading...</p>;
  }

  if (!isValidChat) {
    return (
      <section className="flex flex-col gap-4 items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">404 - Chat Not Found</h1>
        <p className="text-center">
          The chat room might have been deleted or you entered a wrong url
        </p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </section>
    );
  }

  const renderedOutput = (
    <section className="flex flex-col sm:flex-row h-[100svh]">
      <section className="bg-foreground w-full sm:w-1/4 h-[10%] sm:h-full border-r border-[#e0d9d9] dark:border-[#3d3b3b]"></section>
      <div className="flex flex-col w-full sm:w-3/4 h-[90%] sm:h-full">
        <section
          className="flex-col z-0 flex justify-start p-5 canvass relative overflow-auto overflow-x-hidden bg-background flex-1"
          ref={scrollRef}
        >
          {messageArrayOutput}
        </section>
        <Input
          onClick={function (text: string) {
            if (text) {
              storeMessage({
                chatType: "self",
                textContent: text.trim(),
                dateCreated: new Date().toISOString(),
              });
            }
          }}
        />
      </div>
    </section>
  );

  return renderedOutput;
};

export default Page;
