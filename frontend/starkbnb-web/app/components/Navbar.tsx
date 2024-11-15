import React from 'react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'

const Navbar = () => {
  return (
    <div>
        <Logo />
        <Button text='Connect Wallet' dark={true}/>
    </div>
  )
}

export default Navbar