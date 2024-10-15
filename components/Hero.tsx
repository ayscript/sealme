import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-center p-6'>
      <div className='flex flex-col gap-6 w-full sm:w-[50%]'>
        <h1 className='text-4xl'>Connect Anonymously,<br className='hidden sm:inline' /> Share Freely</h1>
        <p className='text-lg'>Join a space where your voice is heard, not your identity. Dive into real-time, anonymous group chats and connect with others without barriers. No sign-ups, no profiles—just open conversations.</p>
      </div>
      <Image
        src={'/cartoon.webp'}
        width={320}
        height={500}
        className='w-full sm:w-[25%]'
        alt='cartoon holding phone'
      />
    </div>
  )
}

export default Hero
