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
        textContent: 'Welcome to the chat'
    },
])

const messageArrayOutput = messagesArray.map((e, index)=> 
    { return <Chat chatType={e.chatType} key={index}>{e.textContent}</Chat>}
)

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
                    setMessagesarray(prev => [...prev, {chatType: 'self', textContent: text.trim()}])
                    setTimeout(() => {
                        setMessagesarray(prev => [...prev, {chatType: '', textContent: text}])
                    }, 3000)
                }
                
            }} />
        </div>
    </section>
  )
}

export default Page
