import React from 'react'
import { Link } from 'react-router-dom'
import { IconStar } from '~/components/Icons'
import { routeConfig } from '~/route/routeConfig'
import classNames from '~/utils/classNames'

const renderStarRating = (score: number) => {
  return [1, 2, 3, 4, 5].map((num) => {
    if (num <= score) {
      return <IconStar key={num} className={classNames('h-5 w-5 text-[#ffce3d]')} />
    }
    return <IconStar key={num} className={classNames('h-5 w-5 text-[#d5d5d5]')} />
  })
}

const SearchByRating = () => {
  return (
    <>
      <div className='search-category mt-6'>
        <IconStar />
        <span>Đánh giá</span>
      </div>
      <div className='mt-3'>
        {[5, 4, 3, 2, 1].map((num) => {
          if (num === 5) {
            return (
              <Link to={`${routeConfig.SearchPage}?rating=${num}`} className='mt-2 flex' key={num}>
                {renderStarRating(num)}
              </Link>
            )
          }
          return (
            <Link to={`${routeConfig.SearchPage}?rating=${num}`} className='mt-2 flex' key={num}>
              {renderStarRating(num)}
              <span className='ml-2 text-[#000000cc]'>Trở lên</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default SearchByRating
