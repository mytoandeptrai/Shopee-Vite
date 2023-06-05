import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '~/components/Logo'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'

const DashboardHeader = () => {
  const { currentUser } = useStore((state) => state)
  const defaultUserAvatar = import.meta.env.VITE_DEFAULT_IMAGE
  return (
    <header className='shadowCustomize__deeper flex h-14 items-center justify-between bg-white px-4'>
      <Logo primary>Shopee</Logo>
      <Link to={routeConfig.ProfilePage} className='flex h-full items-center justify-end gap-x-2'>
        <img
          alt={currentUser?.fullname}
          src={currentUser?.avatar || defaultUserAvatar}
          className='h-7 w-7 rounded-full object-cover'
        />
        <span className='max5se:line-clamp-1 font-medium '>{currentUser?.fullname || 'User'}</span>
      </Link>
    </header>
  )
}

export default DashboardHeader
