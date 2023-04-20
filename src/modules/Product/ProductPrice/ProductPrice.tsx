import React from 'react'
import { useCallback } from 'react'
import { LabelSale } from '~/components/LabelSale'
import { ProductPriceOld } from '../ProductPriceOld'
import { ProductPriceSale } from '../ProductPriceSale'

type Props = {
  oldPrice: number
  price: number
}

const ProductPrice = ({ oldPrice, price }: Props) => {
  const calcPercentSale = useCallback(() => {
    return Math.ceil(100 - (price / oldPrice) * 100)
  }, [oldPrice, price])
  return (
    <div className='section-gray flex flex-col-reverse gap-x-3 md:flex-row md:items-center'>
      <ProductPriceOld className='text-[#929292]'>{oldPrice}</ProductPriceOld>
      <ProductPriceSale className='lg:text-3xl'>{price}</ProductPriceSale>
      <LabelSale>-{calcPercentSale()}%</LabelSale>
    </div>
  )
}

export default ProductPrice
