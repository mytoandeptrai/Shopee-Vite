import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { reviewAPI } from '~/api'
import { STALE_TIME_CONSTANT } from '~/constants'
import reviewEmpty from '~/assets/images/review-empty.png'
import { ReviewItem } from '~/modules/Shared'
import { PaginationV2 } from '~/components/PaginationCustomize'

type Props = {
  productId: string
}
const reviewsPerPage = 5
const ProductReview = ({ productId }: Props) => {
  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewAPI.getAllReviewOfProduct(productId),
    enabled: productId !== '',
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviewsData?.data.slice(indexOfFirstReview, indexOfLastReview) || []
  const handlePageChange = (page: number) => setCurrentPage(page)

  const renderReview = () => {
    if (currentReviews.length > 0) {
      return (
        <>
          {currentReviews.map((review) => (
            <ReviewItem
              key={review._id}
              avatar={review.user.avatar}
              fullname={review.user.fullname}
              rating={review.rating}
              createdAt={review.created_at}
            >
              {review.comment}
            </ReviewItem>
          ))}
        </>
      )
    }

    return (
      <div className='flex h-[180px] flex-col items-center justify-center gap-2 bg-white'>
        <img src={reviewEmpty} alt='review-empty' />
        <h3>Chưa có đánh giá</h3>
      </div>
    )
  }

  return (
    <div className='section-white mt-4'>
      <div className='section-gray'>ĐÁNH GIÁ SẢN PHẨM</div>
      <div>
        {renderReview()}
        {currentReviews.length > 0 && (
          <PaginationV2
            className='mt-6 mb-2'
            currentPage={currentPage}
            itemsPerPage={reviewsPerPage}
            handlePageChange={handlePageChange}
            totalItems={reviewsData?.data.length as number}
          />
        )}
      </div>
    </div>
  )
}

export default ProductReview
