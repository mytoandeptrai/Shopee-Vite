import React, { useCallback } from 'react'
import { authAPI } from '~/api'
import usePopover from '~/hooks/usePopover'
import { useStore } from '~/store/globalStore'
import { generateUsername, removeCurrentUserLocalStorage } from '~/utils'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { routeConfig } from '~/route/routeConfig'
import { Popover } from '~/components/Popover'
import classNames from '~/utils/classNames'
const Menu = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state)
  const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE
  const { activePopover, hidePopover, showPopover } = usePopover()
  const logoutMutation = useMutation({
    mutationFn: () => authAPI.logout({ refreshToken: currentUser?.refreshToken as string }),
    onSuccess: ({ message }) => {
      setCurrentUser(null)
      removeCurrentUserLocalStorage()
      toast.success(message)
    },
    onError(error: any) {
      toast.error(error?.message)
    }
  })

  const handleLogout = useCallback(() => logoutMutation.mutate(), [])

  const stylesPopoverLink =
    'text-[#000000cc] block px-5 py-2 hover:bg-[#fafafa] transition-all duration-300 hover:text-[#00bfa5]'

  const renderMenuContent = () => {
    if (currentUser?.email) {
      return (
        <div
          className='relative h-full w-max max5se:max-w-[130px]'
          onMouseEnter={showPopover}
          onMouseLeave={hidePopover}
        >
          <div className='flex h-full cursor-pointer items-center justify-end gap-x-2 transition-all duration-100 hover:text-[#ffffffb3]'>
            <img
              src={currentUser?.avatar ? currentUser?.avatar : defaultImage}
              alt={currentUser?.fullname}
              className='h-5 w-5 rounded-full object-cover'
            />
            <span className='max5se:line-clamp-1 font-medium'>{generateUsername(currentUser?.email)}</span>
          </div>
          <Popover active={activePopover} className='mt-2 w-max'>
            {currentUser?.role === 'Admin' && (
              <Link to={routeConfig.DashboardPage} className={stylesPopoverLink}>
                Dashboard
              </Link>
            )}
            <Link to={routeConfig.ProfilePage} className={stylesPopoverLink}>
              Tài khoản của tôi
            </Link>
            <Link to={routeConfig.OrderPage} className={stylesPopoverLink}>
              Đơn mua
            </Link>
            <button type='button' onClick={handleLogout} className={classNames(stylesPopoverLink, 'w-full text-left')}>
              Đăng xuất
            </button>
          </Popover>
        </div>
      )
    }

    return (
      <div className='flex gap-x-4'>
        <Link className='transition-all duration-100 hover:opacity-70' to={routeConfig.SignUp}>
          Đăng ký
        </Link>
        <Link className='transition-all duration-100 hover:opacity-70' to={routeConfig.SignIn}>
          Đăng nhập
        </Link>
      </div>
    )
  }

  return <>{renderMenuContent()}</>
}

export default Menu
