import React from 'react'
import { Logo } from './Icon'
import Button from './Button'
import { Plus } from './Icon'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='flex items-center justify-between px-5'>
      <Link href={'/'}>
        <Logo />
      </Link>
      <nav className='hidden sm:inline-block'>
        <ul className='flex items-center justify-center gap-8'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#">Contact</Link></li>
        </ul>
      </nav>
      <Link href='/chat'>
        <Button><Plus /> Create Chat</Button>
      </Link>
    </header>
  )
}

export default Header
