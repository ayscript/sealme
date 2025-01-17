'use client'
import React, { useState } from 'react'
import { Send } from './Icon'


const Input = (props: { onClick: (arg0: string) => void }) => {
  const [text, setText] = useState('')
  
  return (
    <form onSubmit={e => {e.preventDefault()}} className='w-full mt-auto bg-foreground py-3 h-16 text-text flex items-center justify-between px-4'>
        <input type="text" onChange={e => {setText(e.target.value)}} value={text} className='bg-transparent focus:outline-none w-full h-full' placeholder='Write something ...' />
        <button onClick={() => {
          props.onClick(text)
          setText('')
          }} className='rounded-full bg-background p-2'>
            <Send />
        </button>
    </form>
  )
}

export default Input
