import React from 'react'
import { Link } from 'react-router-dom'
import { IconGPS } from '~/components/Icons'
import { routeConfig } from '~/route/routeConfig'
import { ICurrentUser } from '~/types'

type Props = {
  currentUser: ICurrentUser | null
}

const CheckoutUserInfo = ({ currentUser }: Props) => {
  return (
    <div className='section-white rounded-tl-none rounded-tr-none text-base font-medium'>
      <h3 className='mb-2 flex items-center gap-2 text-lg font-medium text-orangeCustomize'>
        <IconGPS />
        <span>Thông tin nhận hàng</span>
      </h3>
      <p>Họ tên: {currentUser?.fullname || 'Trống'}</p>
      <p>Số điện thoại: {currentUser?.phone || 'Trống'}</p>
      <p>Địa chỉ nhận hàng: {currentUser?.address || 'Trống'}</p>
      <Link to={routeConfig.ProfilePage} className='font-medium text-blueCustomize'>
        Thay đổi địa chỉ giao hàng
      </Link>
    </div>
  )
}

export default CheckoutUserInfo
