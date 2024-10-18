'use client'
import Chat from '@/components/Chat'
import Input from '@/components/Input'
import React, { useEffect, useRef, useState } from 'react'


const Page = () => {
const scrollRef = useRef<HTMLDivElement | null>(null);
const scrollToBottom = () => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }

 
const [messagesArray, setMessagesarray] = useState([
    {
        chatType: 'other',
        textContent: 'Hello World, How are you doing'
    },
    {
        chatType: 'self',
        textContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quaerat inventore, modi dolore obcaecati fugiat, tempora expedita odio dicta vero sequi doloremque magni facilis molestiae nulla nisi eveniet totam dolores?'
    },
    {
        chatType: 'other',
        textContent: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quaerat inventore, modi dolore obcaecati fugiat, tempora expedita odio  vero sequi doloremque magni facilis molestiae nulla nisi eveniet totam dolores?'
    },
    {
        chatType: 'self',
        textContent: 'Hello World, How are you doing today'
    },
])

const messageArrayOutput = messagesArray.map(e => <Chat chatType={e.chatType} key={e.textContent}>{e.textContent}</Chat>)

useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  return (
    <section className='flex flex-col sm:flex-row h-[100svh]'>
        <section className='bg-foreground w-full sm:w-1/4 h-[10%] sm:h-full border-r border-[#e0d9d9] dark:border-[#3d3b3b]'></section>
        <div className='flex flex-col w-full sm:w-3/4 h-[90%] sm:h-full'>
            <section className='flex-col z-0 flex justify-start p-5 canvass relative overflow-auto bg-background flex-1' ref={scrollRef}>
                {messageArrayOutput}
            </section>
            <Input onClick={function(text: string){
                if(text){
                    setMessagesarray(prev => [...prev, {chatType: 'self', textContent: text}])
                }
                console.log(text)
            }} />
        </div>
    </section>
  )
}

export default Page
