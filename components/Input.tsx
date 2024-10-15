import React from 'react'
import { Send } from './Icon'

const Input = () => {
  return (
    <div className='bg-transparent border border-solid border-text h-11 text-text focus-within:outline-1 focus-within:outline focus-within:outline-text flex items-center justify-between m-6 px-4 rounded-3xl gap-3'>
        <input type="text" className='bg-transparent focus:outline-none w-full' placeholder='Write something ...' />
        <button>
            <Send />
        </button>
    </div>
  )
}

export default Input
