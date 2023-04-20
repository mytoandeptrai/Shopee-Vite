import React, { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Image } from '~/components/Image'
import { routeConfig } from '~/route/routeConfig'
import { IProduct } from '~/types'
import { formatCash, slugify } from '~/utils'
import cardLoading from '~/assets/images/card-loading.png'
import { ProductRating } from '../ProductRating'
import { ProductPriceSale } from '../ProductPriceSale'
import Tippy from '@tippyjs/react/headless'

type Props = {
  product: IProduct
}

const ProductCard = ({ product }: Props) => {
  const sectionDiv = useRef<HTMLAnchorElement>(null)

  const percentPriceSale = useMemo(() => {
    return Math.ceil((1 - product.price / product.oldPrice) * 100)
  }, [product])

  return (
    <Tippy
      interactive
      placement='bottom-start'
      render={(_attrs) => (
        <div
          className={`w-full translate-y-[-10px] bg-[#ee4d2d] py-2 text-center text-xs font-semibold text-white`}
          style={{
            width: `${sectionDiv.current?.clientWidth ? `${sectionDiv.current?.clientWidth}px` : '100%'}`
          }}
        >
          Tìm Kiếm Sản Phẩm Tương Tự
        </div>
      )}
    >
      <Link
        ref={sectionDiv}
        key={product._id}
        to={`${routeConfig.ProductPage}/${product._id}`}
        className='product-card relative flex flex-col overflow-hidden rounded border-transparent bg-white transition-all duration-300 hover:-translate-y-[3px]'
      >
        <Image
          src={product.image}
          alt={slugify(product.name)}
          placeholderSrc={cardLoading}
          className='aspect-square h-auto w-[500px] max-w-full flex-shrink-0 bg-[#fafafa]'
        />

        <div className='z-1  absolute top-0 right-0 flex flex-col items-center bg-[rgba(255,212,36,.9)] px-1'>
          <span className='m-0 p-0 text-[#ee4d2d]'>{percentPriceSale}%</span>
          <span className='m-0 p-0 uppercase text-white'>Giảm</span>
        </div>

        <div className='flex flex-1 flex-col p-2 pb-4'>
          <h3 className='product-title'>{product.name}</h3>
          <div className='mt-auto'>
            <div className='my-1 flex flex-col justify-between gap-x-2 gap-y-1 md:flex-row md:items-center'>
              <ProductRating rating={product.rating} className='!h-[14px] !w-[14px]' />
              <span className='text-xs text-[#787878]'>Đã bán {formatCash(product.sold)}</span>
            </div>
            <div className='flex items-center items-center justify-between gap-x-2'>
              <ProductPriceSale>{product.price}</ProductPriceSale>
              <span className='w-11 rounded-sm border border-redCustomize bg-[#fff0f1] px-1 py-[2px] text-xs text-redCustomize'>
                -{percentPriceSale}%
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Tippy>
  )
}

export default ProductCard
