import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '~/components/Logo'
import Notification from '~/modules/Notification/Notification'
import { routeConfig } from '~/route/routeConfig'
import { Menu } from '../Menu'

const Navbar = () => {
  return (
    <div className='flex h-12 items-center justify-between text-white'>
      <Link to={routeConfig.OrderPage} className='hidden sm:block'>
        Kiểm tra đơn hàng
      </Link>
      <Logo className='!text-xl sm:hidden'>Shopbee</Logo>
      <div className='flex items-center gap-x-6'>
        <Notification />
        <Menu />
      </div>
    </div>
  )
}

export default Navbar
