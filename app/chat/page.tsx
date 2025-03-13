'use client'
import React, { useState } from 'react'
import Header from '@/components/Header'
import Button from '@/components/Button';
import Link from 'next/link';
import {db} from '@/firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

// function randomString(){
//   const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',]
//   let chatId = "";
//   for(let i = 0; i < 10; i++){
//     const randomlink = Math.floor(Math.random() * characters.length)
//     chatId += characters[randomlink]
//   }

//   return `${window.location.href}/${chatId}`
// }


const Page = () => {

  const [showPopup, setShowPopup] = useState(false)
  const [chatLink, setChatLink] = useState('')
  const [chatCreated, setChatCreated] = useState(true)
  
  const [chatRoomName, setChatRoomName] = useState('')
  const [chatCapacity, setChatCapacity] = useState(0)
  const [chatRules, setChatRules] = useState('')
  
// Function to create a document
async function createChatRoom() {
  try {
    // Reference to the main collection
    const mainCollectionRef = collection(db, "chats");

    // Add a new document to the main collection
    const docRef = await addDoc(mainCollectionRef, {chatRoomName,chatCapacity,chatRules});
    
    setChatLink(`${window.location.href}/${docRef.id}`)
    setShowPopup(true)
    setChatCreated(false)

    async function sendMessage(){
      // Reference to the sub-collection "chats" within the newly created document
    const chatsCollectionRef = collection(docRef, "chats");

    // Add a document to the "chats" sub-collection
    await addDoc(chatsCollectionRef, {
      message: "Welcome to the chat!",
      timestamp: new Date(),
      sender: "Admin"
    });

    console.log("Sub-collection document created successfully.");
}

sendMessage()

console.log(`Document created with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error creating document or sub-collection:", error);
  }
}

  return (
    <>
      <Header />
      <p className='text-center mt-5 text-xs'>Create a new chat room and share within your, friends, classmate and people you want in the chat room.</p>
      <form action="" className='flex flex-col gap-4 w-[80%] max-w-[480px] mx-auto mt-4' onSubmit={e => {
        e.preventDefault()
        if(chatCreated){
          createChatRoom()
        }
        }}>
        <div className='flex flex-col gap-2'>
            <label htmlFor="w">Enter Chat Room Name</label>
            <input className='bg-transparent py-3 px-4 border outline-none focus:border-primary rounded border-solid placeholder:text-gray-400 dark:placeholder:text-gray-700' type="text" placeholder='Give your chat room a name' value={chatRoomName} onChange={e => {
              setChatRoomName(e.target.value)
            }} required />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="w">Number of people you want</label>
            <input className='bg-transparent py-3 px-4 border outline-none focus:border-primary rounded border-solid placeholder:text-gray-400 dark:placeholder:text-gray-700' type="number" min={'8'} max={'256'} placeholder='Default (256)' value={chatCapacity} onChange={e => {
              setChatCapacity(Number(e.target.value))
            }} />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="w">State the chat room rules and guidelines</label>
            <textarea className='bg-transparent py-3 px-4 border outline-none focus:border-primary rounded border-solid placeholder:text-gray-400 dark:placeholder:text-gray-700' placeholder='Briefly mention the rules and regulations each member of the chat has to follow before joining the anonymous chat.' style={{height: '150px', resize: 'block', minHeight: '100px'}} value={chatRules} onChange={e => {
              setChatRules(e.target.value)
            }} required
            ></textarea>
        </div>
        <Button>Create Chat</Button>
      </form>
      {
      showPopup ? 
      <div className='fixed top-0 bottom-0 w-full flex items-center justify-center bg-[#11111165] dark:bg-[#eeeeee65]' onClick={e => {
        if(e.target === e.currentTarget){
          setShowPopup(false)
        }
      }}>
        <div className='flex flex-col gap-2 items-center justify-center bg-background text-center p-4 h-80 rounded'>
          Chat Room Created Successfully! <br /> copy and share your chat room link below <br />
          <Link href={chatLink} className='text-primary'>{chatLink}</Link>
        </div>
      </div> : null
      }
    </>
  )
}

export default Page
