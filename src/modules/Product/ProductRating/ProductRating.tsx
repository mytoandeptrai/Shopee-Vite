import React from 'react'
import { IconStar } from '~/components/Icons'
import classNames from '~/utils/classNames'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  rating: number
  className?: string
}

const renderRating = (rating: number, className: string) => {
  const scoreRating = Math.ceil(rating)
  return (
    <>
      {Array(5)
        .fill(0)
        .map((score, _index) => {
          if (score <= scoreRating) {
            return <IconStar key={uuidv4()} className={classNames('text-[#ffce3d]', className)} />
          }
          return <IconStar key={uuidv4()} className={classNames('text-[#d5d5d5]', className)} />
        })}
    </>
  )
}

const ProductRating = ({ rating, className = '' }: Props) => {
  return <div className='flex'>{renderRating(rating, className)}</div>
}

export default ProductRating
