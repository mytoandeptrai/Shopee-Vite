import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { wishListAPI } from '~/api'
import { IconHeart } from '~/components/Icons'
import { Loading } from '~/components/Loading'
import { STALE_TIME_CONSTANT } from '~/constants'
import { useStore } from '~/store/globalStore'
import wishListPic from '~/assets/images/wishlist.png'
import { ProductList } from '~/modules/Product'

const UserWishList = () => {
  const { currentUser } = useStore((state) => state)
  const { isLoading, data: wishListsData } = useQuery({
    queryKey: ['wishlists'],
    queryFn: () => wishListAPI.getMyWishlist(),
    keepPreviousData: true,
    enabled: Boolean(currentUser?._id),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const renderUserWishList = () => {
    if (isLoading) {
      return <Loading />
    }

    if (!wishListsData || (wishListsData && wishListsData?.data.length === 0)) {
      return (
        <div className='flex h-[300px] flex-col items-center justify-center gap-y-1'>
          <img src={wishListPic} alt='Sản phẩm yêu thích' className='h-24 w-24' />
          <h3 className='mt-1 text-base font-medium text-[#00000066]'>
            Hãy <IconHeart active className='inline-block scale-[70%]' /> sản phẩm bạn yêu thích để xem lại thuận tiện
            nhất
          </h3>
        </div>
      )
    }

    return <ProductList products={wishListsData.data} />
  }

  return (
    <>
      <Helmet>
        <title>Sản phẩm yêu thích</title>
      </Helmet>
      <h2 className='text-base font-medium'>Sản phẩm yêu thích của bạn</h2>
      {renderUserWishList()}
    </>
  )
}

export default UserWishList
