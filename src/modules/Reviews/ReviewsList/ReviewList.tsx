import React from 'react'
import { IReview } from '~/types'
import { ReviewItem } from '../ReviewItem'
import { Button } from '~/components/ButtonCustomize'

type Props = {
  reviewsData: IReview[]
  handleUpdateReview?: (review: IReview) => void
  handleDeleteReview?: (reviewId: string) => void
  isCurrentUser?: boolean
}

const ReviewList = ({ reviewsData, handleDeleteReview, handleUpdateReview, isCurrentUser = false }: Props) => {
  const renderReviewAction = React.useCallback(
    (review: IReview) => {
      if (isCurrentUser && handleDeleteReview && handleUpdateReview) {
        return (
          <>
            <Button onClick={() => handleUpdateReview(review)}>Chỉnh sửa nhận xét</Button>
            <Button onClick={() => handleDeleteReview(review._id)}>Xóa nhận xét</Button>
          </>
        )
      }

      return null
    },
    [handleDeleteReview, handleUpdateReview, isCurrentUser]
  )

  return (
    <div>
      <h3 className='mt-5 mb-[6px] text-lg'>Nhận xét sản phẩm của đơn hàng</h3>
      {reviewsData?.map((review) => (
        <ReviewItem key={review._id} reviewItem={review} reviewActions={renderReviewAction(review)} />
      ))}
    </div>
  )
}

export default ReviewList
