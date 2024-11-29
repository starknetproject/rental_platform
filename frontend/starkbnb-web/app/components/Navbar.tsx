'use client'

import React from 'react'
import Logo from './ui/Logo'
import ConnectorButton from './connector';
import HostButton from './HostButton';
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
  
  return (
    <div className='top-0 left-0 w-full flex justify-between items-center m-auto gap-16 py-4 px-28 bg-white border border-b border-black fixed'>
        <Logo />

        <div className='flex justify-end items-center gap-12'>
          <MidElement />
          <div>
            <ConnectorButton />
          </div>
        </div>
    </div>
  )
}

export default Navbar