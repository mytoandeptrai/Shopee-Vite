import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '~/components/Rating'
import { routeConfig } from '~/route/routeConfig'
import { IReview } from '~/types'
import { formatDateVNFull } from '~/utils'

type Props = {
  reviewItem: IReview
  reviewActions?: JSX.Element | null
}

const ReviewItem = ({ reviewItem, reviewActions }: Props) => {
  return (
    <div className='mt-4'>
      <div className='flex gap-4'>
        <Link to={`${routeConfig.ProductPage}/${reviewItem?.productId?._id}`}>
          <img
            alt={reviewItem?.productId?.name}
            src={reviewItem?.productId?.image}
            className='h-14 w-14 border border-[#e1e1e1] object-cover'
          />
        </Link>
        <div>
          <span className='block'>{formatDateVNFull(reviewItem?.created_at)}</span>
          <p className='text-[15px]'>{reviewItem?.comment}</p>
          <Rating rating={reviewItem?.rating} />
        </div>
      </div>
      <div className='g mt-2 flex'>{reviewActions}</div>
    </div>
  )
}

export default ReviewItem
