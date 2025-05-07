"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Link from "next/link";
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const Page = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [chatLink, setChatLink] = useState("");
  const [chatCreated, setChatCreated] = useState(true);
  const [chatRoomName, setChatRoomName] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [createdChats, setCreatedChats] = useState<string[]>([]);

  // Load chats from localStorage on component mount
  useEffect(() => {
    const storedChats = localStorage.getItem("createdChats");
    if (storedChats) {
      setCreatedChats(JSON.parse(storedChats));
    }
  }, []);

  // Function to create a document
  async function createChatRoom() {
    try {
      setSubmitLoading(true);
      const mainCollectionRef = collection(db, "chats");
      const docRef = await addDoc(mainCollectionRef, { chatRoomName, createdAt: Timestamp.now() });

      const newChatLink = `${window.location.href}/${docRef.id}`;
      setChatLink(newChatLink);
      setShowPopup(true);
      setChatCreated(false);

      // Save the new chat link to localStorage
      const updatedChats = [...createdChats, newChatLink];
      setCreatedChats(updatedChats);
      localStorage.setItem("createdChats", JSON.stringify(updatedChats));

      setSubmitLoading(false);
    } catch (error) {
      console.error("Error creating document:", error);
      setSubmitLoading(false);
    }
  }

  // Function to handle sharing a specific chat link
  const handleShare = (link: string) => {
    setChatLink(link);
    setShowPopup(true);
  };

  return (
    <>
      <Header />
      <form
        action=""
        className="flex flex-col gap-4 w-[80%] max-w-[480px] mx-auto mt-24"
        onSubmit={(e) => {
          e.preventDefault();
          if (chatCreated) {
            createChatRoom();
          }
        }}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="w">Enter Chat Room Name</label>
          <input
            className="bg-transparent py-3 px-4 border outline-none focus:border-primary rounded border-solid placeholder:text-gray-400 dark:placeholder:text-gray-700"
            type="text"
            placeholder="Give your chat room a name"
            value={chatRoomName}
            onChange={(e) => {
              setChatRoomName(e.target.value);
            }}
            required
          />
        </div>
        <Button
          disabled={submitLoading}
          style={{ background: submitLoading ? "gray" : "" }}
        >
          {submitLoading ? "loading..." : "Create Chat"}
        </Button>
      </form>

      {/* Display chats created on this browser */}
      <section className="mt-8 w-[80%] max-w-[480px] mx-auto">
        <h2 className="text-lg font-bold mb-4">Chats Created on This Browser</h2>
        {createdChats.length > 0 ? (
          <ul className="list-disc pl-5">
            {createdChats.map((chat, index) => (
              <li key={index} className="mb-2 flex flex-col items-start gap-4">
                <Link href={chat} className="text-primary underline flex-1">
                  {chat.length > 30 ? `${chat.slice(0, 30)}...` : chat}
                </Link>
                <Button
                  onClick={() => handleShare(chat)}
                  className="bg-primary text-white px-3 py-1 rounded"
                >
                  Share
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No chats created yet.</p>
        )}
      </section>

      {showPopup ? (
        <div
          className="fixed top-0 bottom-0 w-full flex items-center justify-center bg-[#11111165] dark:bg-[#eeeeee65] p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-center bg-background text-center p-4 h-80 rounded">
            <p>
              Chat Room Created Successfully! <br /> Copy and share your chat
              room link below:
            </p>
            <Link href={chatLink} className="text-primary text-sm">
              {chatLink.length > 30 ? `${chatLink.slice(0, 40)}...` : chatLink}
            </Link>
            <div className="flex w-full items-center justify-center gap-4">
              <Button
                onClick={() => {
                  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
                    navigator.clipboard.writeText(chatLink)
                      .then(() => {
                        alert("Chat link copied to clipboard!");
                      })
                      .catch((err) => {
                        console.error("Failed to copy: ", err);
                        alert("Failed to copy the link. Please try again.");
                      });
                  } else {
                    // Fallback for older browsers
                    const textArea = document.createElement("textarea");
                    textArea.value = chatLink;
                    textArea.style.position = "fixed"; // Prevent scrolling to bottom
                    textArea.style.opacity = "0"; // Hide the textarea
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    try {
                      document.execCommand("copy");
                      alert("Chat link copied to clipboard!");
                    } catch (err) {
                      console.error("Fallback: Failed to copy: ", err);
                      alert("Failed to copy the link. Please try again.");
                    }
                    document.body.removeChild(textArea);
                  }
                }}
              >
                Copy Link
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 9.5A1.5 1.5 0 0 0 2.5 11H4v-1H2.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V4H5.5A1.5 1.5 0 0 0 4 5.5v7A1.5 1.5 0 0 0 5.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H11V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5zm4-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "Join my chat room!",
                        text: "Check out this chat room I created:",
                        url: chatLink,
                      })
                      .catch((error) => console.error("Error sharing:", error));
                  } else {
                    alert("Sharing is not supported on this browser.");
                  }
                }}
              >
                Share
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 52 52"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M48.5 30h-3c-.8 0-1.5.7-1.5 1.5v11c0 .8-.7 1.5-1.5 1.5h-33c-.8 0-1.5-.7-1.5-1.5v-21c0-.8.7-1.5 1.5-1.5h4c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H6c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V31.5c0-.8-.7-1.5-1.5-1.5M34 14c-10 0-19.1 8.9-19.9 19.4-.1.8.6 1.6 1.5 1.6h3c.8 0 1.4-.6 1.5-1.3C20.8 26.2 27.2 20 35 20h1.6c.9 0 1.3 1.1.7 1.7l-5.5 5.6c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L49.6 18c.6-.6.6-1.5 0-2.1L36.1 2.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.7 1.5-.1 2.1l5.6 5.6c.6.6.2 1.7-.7 1.7z" />
                </svg>
              </Button>
            </div>
            <div className="flex flex-col w-full items-center justify-center gap-4">
              <Button
                onClick={() => {
                  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                    `Join my chat room: ${chatLink}`
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="bg-[#25D366]"
                style={{ color: "white" }}
              >
                Share on WhatsApp
                <svg
                  width="24"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5s.2-.3.4-.4c.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4S9.7 8.5 9.5 8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3Q7 8.5 7 9.7c.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4" />
                </svg>
              </Button>
              <Button
                onClick={() => {
                  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    chatLink
                  )}`;
                  window.open(facebookUrl, "_blank");
                }}
                className="bg-[#4267B2]"
                style={{ color: "white" }}
              >
                Share on Facebook
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 7.5a7.5 7.5 0 1 1 8 7.484V9h2V8H8V6.5A1.5 1.5 0 0 1 9.5 5h.5V4h-.5A2.5 2.5 0 0 0 7 6.5V8H5v1h2v5.984A7.5 7.5 0 0 1 0 7.5"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Page;
