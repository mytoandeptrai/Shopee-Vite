import React from 'react'
import { useStore } from '~/store/globalStore'
import { Sidebar } from '../Sidebar'
import { generateUsername } from '~/utils'
import { routeConfig } from '~/route/routeConfig'
import { Link } from 'react-router-dom'
import { SIDEBAR_LINKS } from './SidebarUser.config'
import { v4 as uuidv4 } from 'uuid'

const SidebarUser = () => {
  const { currentUser } = useStore((state) => state)
  const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE

  return (
    <Sidebar content='Tài khoản của tôi'>
      <div className='flex items-center gap-x-2'>
        <img alt={currentUser?.fullname} className='h-10 w-10 rounded-full' src={currentUser?.avatar || defaultImage} />
        <div>
          <h3 className='line-clamp-1 font-semibold'>{generateUsername(currentUser?.email as string)}</h3>
          <Link to={routeConfig.ProfilePage}>Sửa hồ sơ</Link>
        </div>
      </div>
      <ul className='mt-7'>
        {SIDEBAR_LINKS.map((link) => (
          <li key={uuidv4()} className='mb-4'>
            <Link to={link.path} className='flex items-center gap-x-3'>
              <img src={link.icon} alt={link.display} className='h-5 w-5' />
              <span>{link.display}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  )
}

export default SidebarUser
