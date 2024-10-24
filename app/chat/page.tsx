'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Button from '@/components/Button';
import Link from 'next/link';

function randomString(){
  const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',]
  let chatId = "";
  for(let i = 0; i < 10; i++){
    const randomlink = Math.floor(Math.random() * characters.length)
    chatId += characters[randomlink]
  }

  return `${window.location.href}/${chatId}`
}

const Page = () => {

  const [showPopup, setShowPopup] = useState(false)
  const [chatLink, setChatLink] = useState('')
  const [chatCreated, setChatCreated] = useState(true)

    useEffect(() => {
        console.log(randomString())
    }, [])

  return (
    <>
      <Header />
      <p className='text-center mt-5 text-xs'>Create a new chat room and share within your, friends, classmate and people you want in the chat room.</p>
      <form action="" className='flex flex-col gap-4 w-[80%] max-w-[480px] mx-auto mt-4' onSubmit={e => {
        e.preventDefault()
        if(chatCreated){
          setShowPopup(true)
          setChatLink(randomString())
          setChatCreated(false)
        }
        }}>
        <div className='flex flex-col gap-2'>
            <label htmlFor="w">Enter Chat Room Name</label>
            <input className='bg-transparent py-3 px-4 border outline-none focus:border-primary rounded border-solid placeholder:text-gray-400 dark:placeholder:text-gray-700' type="text" placeholder='Give your chat room a name' required />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="w">Number of people you want</label>
            <input className='bg-transparent py-3 px-4 border outline-none focus:border-primary rounded border-solid placeholder:text-gray-400 dark:placeholder:text-gray-700' type="number" min={'8'} max={'256'} placeholder='Default (256)' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="w">State the chat room rules and guidelines</label>
            <textarea className='bg-transparent py-3 px-4 border outline-none focus:border-primary rounded border-solid placeholder:text-gray-400 dark:placeholder:text-gray-700' placeholder='Briefly mention the rules and regulations each member of the chat has to follow before joining the anonymous chat.' style={{height: '150px', resize: 'block', minHeight: '100px'}}></textarea>
        </div>
        <Button>Create Chat</Button>
      </form>
      {
      showPopup ? 
      <div className='fixed top-0 bottom-0 w-full flex items-center justify-center bg-[#11111165]' onClick={e => {
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
