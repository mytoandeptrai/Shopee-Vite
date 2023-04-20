import React from 'react'
import { ProductPriceSale } from '~/modules/Product/ProductPriceSale'
import { formatMoney } from '~/utils'

type Props = {
  totalProductsPrice: number
  shippingFee: number
  promotion: number
  totalPayment: number
}

const OrderPayment = ({ totalProductsPrice, shippingFee, promotion, totalPayment }: Props) => {
  const orderPaymentArray = React.useMemo(
    () => [
      {
        title: 'Tổng tiền hàng',
        price: totalProductsPrice,
        isTotal: false
      },
      {
        title: 'Phí vận chuyển',
        price: shippingFee,
        isTotal: false
      },
      {
        title: 'Voucher từ Shopbee',
        price: promotion * -1,
        isTotal: false
      },
      {
        title: 'Tổng thanh toán',
        price: totalPayment,
        isTotal: true
      }
    ],
    [totalProductsPrice, shippingFee, promotion, totalPayment]
  )

  return (
    <div className='mt-3 rounded-md bg-[#fffcf5] p-4 text-right'>
      {orderPaymentArray.map((order) => (
        <div className='flex' key={order.title}>
          <div className='flex-1 py-2'>{order.title}</div>
          <div className='w-1/2 py-2 md:w-48'>
            {order.isTotal ? <ProductPriceSale>{totalPayment}</ProductPriceSale> : formatMoney(order.price)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderPayment
