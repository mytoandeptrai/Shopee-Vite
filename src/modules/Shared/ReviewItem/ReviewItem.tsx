import React from 'react'
import { Rating } from '~/components/Rating'
import { formatDateVNFull } from '~/utils'

type Props = {
  avatar: string
  fullname: string
  rating: number
  createdAt: string
  children: React.ReactNode
}

const ReviewItem = ({ avatar, fullname, rating, children, createdAt }: Props) => {
  const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE

  return (
    <div className='mt-4'>
      <div className='flex items-center gap-x-4'>
        <img src={avatar || defaultImage} alt='shop avatar' className='h-10 w-10 rounded-full' />
        <div>
          <h3 className='text-[15px] font-medium'>{fullname === '' ? 'Anonymous' : fullname}</h3>
          <Rating rating={rating} className='h-4 w-4' />
        </div>
      </div>
      <span className='mt-1 block text-[rgba(0,0,0,.54)] md:ml-14'>{formatDateVNFull(createdAt ?? new Date())}</span>
      <p className='mt-1 md:ml-14'>{children}</p>
    </div>
  )
}

export default ReviewItem
