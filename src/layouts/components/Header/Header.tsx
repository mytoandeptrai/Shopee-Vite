import React from 'react'
import { Logo } from '~/components/Logo'
import { HeaderCart } from '../HeaderCart'
import { Navbar } from '../Navbar'
import { SearchBar } from '../SearchBar'

const Header = () => {
  return (
    <header className='bg-linearOrange'>
      <div className='layout-container'>
        <Navbar />
        <div className='flex h-20 items-center justify-between md:gap-x-6 lg:ml-0'>
          <Logo className='hidden w-0 sm:flex sm:w-36'>Shopee</Logo>
          <SearchBar />
          <HeaderCart />
        </div>
      </div>
    </header>
  )
}

export default Header
