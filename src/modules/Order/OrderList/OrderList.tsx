import React from 'react'
import { IOrderDetails } from '~/types'
import { OrderItem } from '../OrderItem'

type Props = {
  ordersList: IOrderDetails[]
}

const OrderList = ({ ordersList }: Props) => {
  return (
    <div>
      {ordersList.map((order) => (
        <OrderItem key={order._id} orderItem={order} />
      ))}
    </div>
  )
}

export default OrderList
