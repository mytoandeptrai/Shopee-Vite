import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { productAPI, shopAPI } from '~/api'
import { Loading } from '~/components/Loading'
import { STALE_TIME_CONSTANT } from '~/constants'
import {
  ProductDescription,
  ProductImageSlider,
  ProductMeta,
  ProductNotFound,
  ProductPrice,
  ProductQuantity,
  ProductRelated,
  ProductReview,
  ProductShipping
} from '~/modules/Product'
import { ShopOverView } from '~/modules/Shared'
import { useStore } from '~/store/globalStore'
import { IShopInfo } from '~/types'
import { saveHistoryView } from '~/utils'
import PageNotFound from './PageNotFound'

const ProductDetailPage = () => {
  const { id = '' } = useParams()
  const { currentUser } = useStore((state) => state)

  const { isLoading, data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getSingleProduct(id),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    onSuccess: ({ data }) => {
      saveHistoryView(data)
    },
    enabled: id !== ''
  })

  const { data: shopInfoData } = useQuery({
    queryKey: ['shopInfo'],
    queryFn: () => shopAPI.getSingleShop({ shopId: productData?.data?.shop?.toString() ?? '' }),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    enabled: productData?.data?.shop !== undefined
  })

  const shopMockUp = useMemo(() => {
    return {
      name: 'Đồng hồ thời trang nam',
      avatar: 'https://cf.shopee.vn/file/e9c938e6ed0ca5d694897d0485bcae74',
      city: {
        id: '01',
        name: 'city 1'
      },
      district: {
        id: '2',
        name: 'district 1'
      },
      ward: {
        id: '2',
        name: 'ward 1'
      },
      street: 'street 1',
      address: 'address 1',
      slug: 'slug 1',
      user: currentUser
    }
  }, [currentUser])

  if (!id) return <PageNotFound />
  if (isLoading) return <Loading />
  if (!productData?.data) return <ProductNotFound />
  const { data: product } = productData

  return (
    <div className='layout-container'>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className='flex flex-col gap-6 bg-white p-4 lg:flex-row'>
        <ProductImageSlider images={product.images} productName={product.name} />
        <div className='flex-1'>
          <h1 className='text-base text-[#242424] lg:text-2xl'>{product.name}</h1>
          <ProductMeta rating={product.rating} sold={product.sold} />
          <ProductPrice oldPrice={product.oldPrice} price={product.price} />
          <ProductShipping shopCityId={(shopInfoData?.data?.city?.id as string) || shopMockUp.city.id} />
          <ProductQuantity stock={product.stock} />
        </div>
      </div>
      <ShopOverView shopInfo={(shopInfoData?.data as IShopInfo) || shopMockUp} />
      <ProductDescription description={product.description} />
      <ProductReview productId={id} />
      <ProductRelated categoryId={product.category} />
    </div>
  )
}

export default ProductDetailPage
