import React from 'react'
import { OrderProduct } from '~/modules/Order'
import { ICart } from '~/types'

type Props = {
  carts: ICart[]
}

const CheckoutCarts = ({ carts }: Props) => {
  const renderCheckoutCarts = () => {
    if (carts.length === 0) {
      return <h3 className='text-base font-medium'>Giỏ hàng của bạn đang trống</h3>
    }

    return (
      <>
        {carts.map(({ _id, product, quantity }) => (
          <OrderProduct key={_id} order={{ product, quantity }} />
        ))}
      </>
    )
  }
  return (
    <div className='section-white mt-3'>
      <h2>Sản phẩm</h2>
      <div className='mt-3'>{renderCheckoutCarts()}</div>
    </div>
  )
}

export default CheckoutCarts
