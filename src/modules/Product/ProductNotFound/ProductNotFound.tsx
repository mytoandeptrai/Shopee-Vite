import React from 'react'
import productNotFound from '~/assets/images/product-notfound.png'

const ProductNotFound = ({ title = 'Không tìm thấy sản phẩm' }: { title?: string }) => {
  return (
    <div className='flex h-[400px] flex-col items-center justify-center gap-y-2'>
      <img src={productNotFound} alt='not found product' />
      <span className='text-[#bababa]'>{title}</span>
    </div>
  )
}

export default ProductNotFound
