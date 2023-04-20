import React from 'react'
import { Outlet } from 'react-router-dom'
import { Logo } from '~/components/Logo'
import { Footer } from '~/layouts/components/Footer'

type Props = {
  title: string
}

const AuthLayout = ({ title }: Props) => {
  return (
    <div className='flex flex-col justify-between'>
      <header className='bg-white'>
        <div className='layout-container'>
          <div className='flex h-20 items-center gap-x-4'>
            <Logo primary>Shopee</Logo>
            <h2 className='text-xl'>{title}</h2>
          </div>
        </div>
      </header>
      <main className='flex-1 bg-orangeCustomize py-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AuthLayout
