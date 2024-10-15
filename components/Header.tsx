import React from 'react'
import { Logo } from './Icon'
import Button from './Button'
import { Plus } from './Icon'

const Header = () => {
  return (
    <header className='flex items-center justify-between px-5'>
      <Logo />
      <nav className='hidden sm:inline-block'>
        <ul className='flex items-center justify-center gap-8'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <Button><Plus /> Create Chat</Button>
    </header>
  )
}

export default Header
