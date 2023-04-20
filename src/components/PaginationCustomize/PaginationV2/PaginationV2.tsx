import { useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IconNext, IconPrev } from '~/components/Icons'
import classNames from '~/utils/classNames'
import { PaginationNumber } from '../PaginationNumber'

type Props = {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  handlePageChange: (page: number) => void
  className?: string
}

const PaginationV2 = ({ itemsPerPage, currentPage, totalItems, handlePageChange, className = '' }: Props) => {
  const totalPage = useMemo((): number[] => {
    const array = []
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
      array.push(i)
    }
    return array
  }, [totalItems, itemsPerPage])

  const classes = classNames(
    'flex flex-wrap gap-x-3 gap-y-2 text-[#00000066] justify-center items-center my-8',
    className
  )

  return (
    <div className={classes}>
      <button
        type='button'
        className='cursor-pointer disabled:cursor-not-allowed'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <IconPrev />
      </button>
      {totalPage.map((page) => (
        <PaginationNumber key={uuidv4()} active={page === currentPage} onClick={() => handlePageChange(page)}>
          {page}
        </PaginationNumber>
      ))}
      <button
        type='button'
        className='cursor-pointer disabled:cursor-not-allowed'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPage.length}
      >
        <IconNext />
      </button>
    </div>
  )
}

export default PaginationV2
