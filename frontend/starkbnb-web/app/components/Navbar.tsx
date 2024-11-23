'use client'

import React from 'react'
import Logo from './ui/Logo'
import Button from './ui/Button'
import { FaWallet } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useConnect } from '@starknet-react/core';
import ConnectorButton from './connector';
import HostButton from './HostForm';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MidElement = () => {

const route = usePathname()

return (
  <div>
    {
      route.startsWith('/hosting') ?
        (
          <div className="flex gap-12 justify-center">
              <div className="border px-4 py-2 border-black rounded-lg">
                  <Link href={'/hosting'}>
                      My Listings
                  </Link>
              </div>
              <div className="border px-4 py-2 border-black rounded-lg">
                  <Link href={'/hosting/host-a-property'}>
                      Host a Property
                  </Link>
              </div>
              <div className="border px-4 py-2 border-black rounded-lg">
                  <Link href={'client-interaction'}>
                      Client Interaction
                  </Link>
              </div>
          </div>
        ) : (
          <div className='flex w-fit gap-4 justify-between items-center'>
            <Link href={'/hosting/host-a-property'}>
              <HostButton />
            </Link>
          </div>
        )
      }
    </div>
  )
}

const Navbar = () => {

  const { connect, connectors } = useConnect()
  
  return (
    <div className='top-0 left-0 w-full flex m-auto gap-16 items-center justify-between py-4 px-28 bg-white border border-b border-black fixed'>
        <Logo />

        <MidElement />

        <div>
          <ConnectorButton />
        </div>
    </div>
  )
}

export default Navbar