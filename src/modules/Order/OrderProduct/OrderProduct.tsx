import React from 'react'
import { Link } from 'react-router-dom'
import { ProductPriceOld } from '~/modules/Product'
import { ProductPriceSale } from '~/modules/Product/ProductPriceSale'
import { routeConfig } from '~/route/routeConfig'
import { IOrderItem } from '~/types'

type Props = {
  order: IOrderItem
}

const OrderProduct = ({ order }: Props) => {
  const renderOrderProduct = () => {
    if (!order || !order.product) return null
    return (
      <div className='flex flex-col justify-between gap-3 py-2 lg:flex-row lg:items-center'>
        <div className='flex gap-3'>
          <img
            alt={order.product.name}
            src={order.product.image}
            className='h-20 w-20 border border-[#e1e1e1] object-cover'
          />
          <div>
            <Link to={`${routeConfig.ProductPage}/${order.product._id}`}>
              <h3>{order.product.name}</h3>
            </Link>
            <span className='mt-1 block'>x{order.quantity}</span>
          </div>
        </div>
        <div className='flex items-center gap-x-2'>
          <ProductPriceOld>{order.product.oldPrice}</ProductPriceOld>
          <ProductPriceSale>{order.product.price}</ProductPriceSale>
        </div>
      </div>
    )
  }

  return <>{renderOrderProduct()}</>
}

export default OrderProduct
