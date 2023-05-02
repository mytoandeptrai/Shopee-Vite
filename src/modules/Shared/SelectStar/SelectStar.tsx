import React, { Dispatch, SetStateAction } from 'react'
import { IconStar } from '~/components/Icons'

type Props = {
  rating: number
  setRating?: Dispatch<SetStateAction<number>>
  onSelectRating?: (ratingValue: number) => void
}

const SelectStar = ({
  rating,
  setRating = () => {
    return
  },
  onSelectRating
}: Props) => {
  const handleSelectRating = (num: number) => {
    if (onSelectRating) {
      onSelectRating(num)
      return
    }
    setRating(() => num)
  }

  return (
    <div className='mt-2 flex justify-center'>
      {[1, 2, 3, 4, 5].map((num) => {
        const color = num <= rating ? 'text-[#ffce3d]' : 'text-[#e3e3e3]'
        return (
          <button
            key={num}
            type='button'
            onClick={() => handleSelectRating(num)}
            onMouseEnter={() => handleSelectRating(num)}
          >
            <IconStar className={`h-7 w-7 ${color}`} />
          </button>
        )
      })}
    </div>
  )
}

export default SelectStar
