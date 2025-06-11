'use client'
import React, { useState } from 'react'
import { Send } from './Icon'

const Input = (props: { onClick: (arg0: string) => void }) => {
  const [text, setText] = useState('')

  return (
    <form onSubmit={e => {e.preventDefault()}} className='w-[95%] rounded-2xl mb-2 mt-auto focus-within:border focus-within:border-primary absolute bottom-0 bg-foreground py-3 h-24 text-text flex items-center justify-between px-4'>
        <textarea onChange={e => {setText(e.target.value)}} value={text} className='bg-transparent resize-none focus:outline-none w-full h-full' placeholder='Write something ...'></textarea>
        {/* <input type="text" onChange={e => {setText(e.target.value)}} value={text} className='bg-transparent focus:outline-none w-full h-full' placeholder='Write something ...' /> */}
        <button onClick={() => {
          if (text.trim() !== '') {
            props.onClick(text)
            setText('')
          }
          }} className='rounded-full bg-background p-2'>
            <Send />
        </button>
    </form>
  )
}

export default Input
