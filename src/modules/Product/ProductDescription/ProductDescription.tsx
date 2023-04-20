import React from 'react'

type Props = {
  description: string
}

const ProductDescription = ({ description }: Props) => {
  return (
    <div className='section-white mt-4'>
      <div className='section-gray'>CHI TIẾT SẢN PHẨM</div>
      <div
        className='product-desc mt-3 leading-6 text-[#242424]'
        dangerouslySetInnerHTML={{ __html: description || '' }}
      />
    </div>
  )
}

export default ProductDescription
