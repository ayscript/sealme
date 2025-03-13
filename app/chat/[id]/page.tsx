'use client'
import Chat from '@/components/Chat';
import Input from '@/components/Input';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { addDoc, collection, serverTimestamp, onSnapshot } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

function displayDate(firebaseDate: firebase.firestore.Timestamp) {
    if (!firebaseDate) {
        return "Date processing"
    }
    
    const date = firebaseDate.toDate()
    
    const day = date.getDate()
    const year = date.getFullYear()
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[date.getMonth()]

    let hours: string | number = date.getHours()
    let minutes: string | number = date.getMinutes()
    hours = hours < 10 ? "0" + hours : hours.toString()
    minutes = minutes < 10 ? "0" + minutes : minutes.toString()

    return `${day} ${month} ${year} - ${hours}:${minutes}`
}

const Page = () => {

    interface Message {
        chatType: string;
        textContent: string;
        dateCreated: string;
        timestamp: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
    }
    
    const [messagesArray, setMessagesarray] = useState<Message[]>([])
    const [chatId, setChatId] = useState('')

    useEffect(() => {
        const id = window.location.pathname.split('/')[2];
        setChatId(id);
    }, []);

    useEffect(() => {
        if (chatId) {
            const messagesCollectionRef = collection(db, `chats/${chatId}/chats`);
            const unsubscribe = onSnapshot(messagesCollectionRef, (snapshot) => {
                const newMessages = snapshot.docs.map((doc) => {
                    const messageData = doc.data();

                    return {
                        chatType: messageData.sender,
                        textContent: messageData.message,
                        dateCreated: displayDate(messageData.timestamp),
                        timestamp: messageData.timestamp, // Add timestamp for sorting
                        sender: messageData.sender,
                        message: messageData.message
                    };
                });

                // Sort messages by timestamp
                newMessages.sort((a, b) => {
                        return a.timestamp - b.timestamp;
                });

                setMessagesarray(newMessages);
            });

            return () => unsubscribe();
        }
    }, [chatId]);

    interface Message {
            sender: string;
            message: string;
            timestamp: firebase.firestore.Timestamp | firebase.firestore.FieldValue
        }

    async function storeMessage(message: Message): Promise<void> {
        try {
            const mainCollectionRef = collection(db, `chats/${chatId}/chats`);
            await addDoc(mainCollectionRef, message);
        } catch (error) {
            console.error("Error creating document or sub-collection:", error);
        }
    }

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const messageArrayOutput = messagesArray.map((e, index) => (
        <Chat chatType={e.chatType} dateCreated={e.dateCreated} key={index}>
            {e.textContent}
        </Chat>
    ));

    useEffect(() => {
        scrollToBottom();
    }, [messagesArray]);

    const renderedOutput = (
        <section className='flex flex-col sm:flex-row h-[100svh]'>
            <section className='bg-foreground w-full sm:w-1/4 h-[10%] sm:h-full border-r border-[#e0d9d9] dark:border-[#3d3b3b]'></section>
            <div className='flex flex-col w-full sm:w-3/4 h-[90%] sm:h-full'>
                <section className='flex-col z-0 flex justify-start p-5 canvass relative overflow-auto bg-background flex-1' ref={scrollRef}>
                    {messageArrayOutput}
                </section>
                <Input onClick={function(text: string) {
                    if (text) {
                        storeMessage({ chatType: 'self', textContent: text.trim(), dateCreated: '', sender: 'self', message: text.trim(), timestamp: serverTimestamp() });
                    }
                }} />
            </div>
        </section>
    )

    return renderedOutput
}

export default Page
