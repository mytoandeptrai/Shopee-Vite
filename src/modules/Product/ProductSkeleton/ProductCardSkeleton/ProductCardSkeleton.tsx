import React from 'react'
import { Image } from '~/components/Image'
import cardLoading from '~/assets/images/card-loading.png'

const ProductCardSkeleton = () => {
  return (
    <div className='shadow-product-card hover:shadow-product-card-hover overflow-hidden rounded border border-transparent bg-white transition-all duration-300 hover:-translate-y-[3px]'>
      <Image
        alt='product-loading'
        src={cardLoading}
        placeholderSrc={cardLoading}
        className='aspect-square h-auto w-[500px] max-w-full bg-[#fafafa]'
      />
      <div className='p-2 pb-4'>
        <div className='h-8 w-full bg-[#fafafa]' />
        <div className='mt-2 h-5 w-full bg-[#fafafa]' />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
