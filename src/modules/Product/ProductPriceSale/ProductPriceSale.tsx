import React from 'react'
import { formatMoney } from '~/utils'
import classNames from '~/utils/classNames'

type Props = {
  children: number
  className?: string
}

const ProductPriceSale = ({ children, className = 'font-medium lg:text-base' }: Props) => {
  return <span className={classNames('text-redCustomize', className)}>{formatMoney(children)}</span>
}

export default ProductPriceSale
