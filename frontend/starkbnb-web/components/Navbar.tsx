import React from 'react'
import Logo from './ui/Logo'
import Button from './ui/Button'
import { FaWallet } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const Navbar = () => {
  
  return (
    <div className='flex w-[90%] m-auto gap-16 items-center justify-between'>
        <Logo />

        <div className='flex w-fit gap-4 justify-between items-center'>
          <Button text='Become a Host' dark type='submit' icon={FaCirclePlus} iconsize={2}/>
          <Button text='Connect Wallet' dark={true} type='submit' icon={FaWallet} iconsize={1}/>
        </div>
    </div>
  )
}

export default Navbar