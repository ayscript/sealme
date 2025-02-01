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
        textContent: 'Welcome to the chat',
        dateCreated: new Date().toLocaleString("en-GB")
    },
])

const messageArrayOutput = messagesArray.map((e, index)=> 
    { return <Chat chatType={e.chatType} dateCreated={e.dateCreated} key={index}>{e.textContent}</Chat>} 
)

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
            <Input onClick={function(text: string){
                if(text){
                    setMessagesarray(prev => [...prev, {chatType: 'self', textContent: text.trim(), dateCreated: new Date().toLocaleString("en-GB")}])
                    setTimeout(() => {
                        setMessagesarray(prev => [...prev, {chatType: '', textContent: text, dateCreated: new Date().toLocaleString("en-GB")}])
                    }, 3000)
                }
                
            }} />
        </div>
    </section>
    )

  return renderedOutput
}

export default Page
