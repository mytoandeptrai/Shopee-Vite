import React from 'react'

type Props = {
  children: React.ReactNode
}

const ProductGridLayout = ({ children }: Props) => {
  return <div className='product-grid mt-3'>{children}</div>
}

export default ProductGridLayout
