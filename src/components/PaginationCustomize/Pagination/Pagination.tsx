import React, { useMemo } from 'react'
import { IconNext, IconPrev } from '~/components/Icons'
import { RANGE_CONSTANT } from '~/constants'
import usePagination from '~/hooks/usePagination'
import { IPagination } from '~/types'
import { PaginationNumber } from '../PaginationNumber'

type Props = {
  pagination: IPagination
}

const Pagination = ({ pagination }: Props) => {
  const { goPrevPage, goNextPage, handleClickNumberPage, currentPageInParams } = usePagination()
  const currentPage = Number(pagination.currentPage)

  const disabledCurrentPageButton = useMemo(() => {
    return currentPage === currentPageInParams
  }, [currentPage, currentPageInParams])

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='text-xl'>
            ...
          </span>
        )
      }

      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='text-xl'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pagination.total)
      .fill(0)
      .map((_item, index) => {
        const pageNumber = index + 1
        const range = RANGE_CONSTANT.RANGE

        if (
          currentPage <= range * 2 + 1 &&
          pageNumber > currentPage + range &&
          pageNumber < pagination.total - range + 1
        ) {
          return renderDotAfter(index)
        }

        if (
          currentPage <= range * 2 + 1 &&
          pageNumber > currentPage + range &&
          pageNumber < pagination.total - range + 1
        ) {
          return renderDotAfter(index)
        }
        if (currentPage > range * 2 + 1 && currentPage < pagination.total - range * 2) {
          if (pageNumber < currentPage - range && pageNumber > range) {
            return renderDotBefore(index)
          }
          if (pageNumber > currentPage + range && pageNumber < pagination.total - range + 1) {
            return renderDotAfter(index)
          }
        } else if (
          currentPage >= pagination.total - range * 2 &&
          pageNumber > range &&
          pageNumber < currentPage - range
        ) {
          return renderDotBefore(index)
        }

        return (
          <PaginationNumber
            key={pageNumber}
            active={pageNumber === pagination.currentPage}
            onClick={() => handleClickNumberPage(pageNumber)}
            disabled={disabledCurrentPageButton}
            className={disabledCurrentPageButton ? 'disabled:cursor-not-allowed' : ''}
          >
            {pageNumber}
          </PaginationNumber>
        )
      })
  }

  return (
    <div className='my-8 flex flex-wrap items-center justify-center gap-x-3 text-[#00000066]'>
      <button
        onClick={goPrevPage}
        type='button'
        className='cursor-pointer disabled:cursor-not-allowed'
        disabled={pagination.currentPage <= 1}
      >
        <IconPrev />
      </button>
      {renderPagination()}
      <button
        onClick={goNextPage}
        type='button'
        className='cursor-pointer disabled:cursor-not-allowed'
        disabled={pagination.currentPage >= pagination.total}
      >
        <IconNext />
      </button>
    </div>
  )
}

export default Pagination
