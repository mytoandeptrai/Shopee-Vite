import React from 'react'
import { IOrderDetails } from '~/types'
import { formatDateVNFull } from '~/utils'

type Props = {
  orderDetails: IOrderDetails
}

const OrderInformation = ({ orderDetails }: Props) => {
  return (
    <>
      <div className='gradient-line mt-6 md:mt-14' />
      <div className='grid grid-cols-1 gap-x-6 gap-y-3 pt-5 text-xs md:text-sm lg:grid-cols-2'>
        <div>
          <h3 className='mb-1 text-lg'>Chi tiết đơn hàng</h3>
          <p>Mã đơn hàng: {orderDetails?._id}</p>
          <p>Đặt lúc: {formatDateVNFull(orderDetails?.created_at)}</p>
          <p>
            Phương thức thanh toán:{' '}
            {orderDetails.methodPayment === 'money' ? 'Thanh toán khi nhận hàng' : 'Thẻ Tín Dụng/Ghi Nợ'}
          </p>
          <p>Địa chỉ shop: {orderDetails?.shippingFrom}</p>
        </div>
        <div>
          <h3 className='mb-1 text-lg'>Thông tin nhận hàng</h3>
          <p>Người nhận: {orderDetails?.user?.fullname}</p>
          <p>Email: {orderDetails?.user?.email}</p>
          <p>Địa chỉ nhận hàng: {orderDetails?.shippingTo}</p>
          {orderDetails.note && <p>Lời nhắn: {orderDetails.note}</p>}
        </div>
      </div>
    </>
  )
}

export default OrderInformation
