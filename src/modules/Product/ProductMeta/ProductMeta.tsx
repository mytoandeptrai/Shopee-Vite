import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { IconHeart } from '~/components/Icons'
import { Rating } from '~/components/Rating'
import { useStore } from '~/store/globalStore'

type Props = {
  rating: number
  sold: number
}

const ProductMeta = ({ rating, sold }: Props) => {
  const { id = '' } = useParams()
  const { currentUser } = useStore((state) => state)
  const [isSaved, setIsSaved] = React.useState(false)

  const handleAddToWishList = useCallback(() => {
    return
  }, [])

  const handleRemoveFromWishList = useCallback(() => {
    return
  }, [])

  return (
    <div className='my-4 flex flex-wrap items-center gap-x-4 gap-y-2'>
      <span className='font-medium'>{rating}</span>
      <span className='border-r pr-4'>
        <Rating rating={rating} />
      </span>
      <div className='border-r border-[#00000024] pr-4'>
        <span>{sold}</span>
        <span className='pl-3 text-sm text-[#767676]'>Đã bán</span>
      </div>
      <div className='flex items-center gap-x-2'>
        {isSaved ? (
          <button type='button' onClick={handleRemoveFromWishList}>
            <IconHeart active />
          </button>
        ) : (
          <button type='button' onClick={handleAddToWishList}>
            <IconHeart active={false} />
          </button>
        )}
        <span className='text-sm'>Đã thích</span>
      </div>
    </div>
  )
}

export default ProductMeta
