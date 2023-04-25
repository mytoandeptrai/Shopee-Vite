import React from 'react'
import { IOrderDetails } from '~/types'
import { renderStatusOrderWithColor } from './OrderItem.config'
import { OrderProduct } from '../OrderProduct'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { Button } from '~/components/ButtonCustomize'
import { ProductPriceSale } from '~/modules/Product/ProductPriceSale'

type Props = {
  orderItem: IOrderDetails
}

const OrderItem = ({ orderItem }: Props) => {
  if (!orderItem) return null
  return (
    <div className='mt-3 rounded border border-black017 bg-white px-4 py-4 md:px-6'>
      <div className='mt-2 mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center'>
        <div>
          <span className='font-medium'>Mã đơn hàng: </span>
          <span>{orderItem._id}</span>
        </div>
        {renderStatusOrderWithColor(orderItem.statusCode)}
      </div>
      <div className='my-3'>
        {orderItem.orderItems?.map((order) => (
          <OrderProduct order={order} key={uuidv4()} />
        ))}
      </div>
      <div className='mt-5 flex flex-col-reverse justify-between gap-3 md:flex-row md:items-center'>
        <Link to={`${orderItem._id}`}>
          <Button>Xem chi tiết đơn</Button>
        </Link>
        <div>
          <span>Tổng số tiền: </span>
          <ProductPriceSale className='pl-1 text-lg lg:text-2xl'>{orderItem.total}</ProductPriceSale>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
