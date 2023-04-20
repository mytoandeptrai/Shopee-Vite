import React from 'react'
import { Button } from '~/components/ButtonCustomize'
import usePagination from '~/hooks/usePagination'
import useQueryParams from '~/hooks/useQueryParams'
import { IPagination } from '~/types'
import { v4 as uuidv4 } from 'uuid'
import { Option, Select } from '~/components/SelectCustomize'
import { PaginationButton } from '~/components/PaginationCustomize'
import { IconNext, IconPrev } from '~/components/Icons'

type Props = {
  pagination: IPagination
}

const SearchSortBar = ({ pagination }: Props) => {
  const { queryParams, setSearchParams } = useQueryParams()
  const { goPrevPage, goNextPage, handleFilter } = usePagination()

  const page = Number(queryParams?.page) || 1
  const sortBy = queryParams?.sort_by || ''
  const buttonRenderArray = React.useMemo(
    () => [
      {
        className: 'py-0 rounded-sm h-9',
        content: 'Phổ biến',
        primary: sortBy === 'view' || sortBy === '',
        onClick: () => setSearchParams({ ...queryParams, sort_by: 'view' })
      },
      {
        className: 'py-0 rounded-sm h-9',
        content: 'Mới nhất',
        primary: sortBy === 'createdAt',
        onClick: () => setSearchParams({ ...queryParams, sort_by: 'createdAt' })
      },
      {
        className: 'py-0 rounded-sm h-9',
        content: 'Bán chạy',
        primary: sortBy === 'sold',
        onClick: () => setSearchParams({ ...queryParams, sort_by: 'sold' })
      }
    ],
    [sortBy, queryParams, setSearchParams]
  )

  const handleSortByPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilter({ order: e.target.value, sort_by: 'price' })
  }

  return (
    <div className='flex items-center justify-between gap-x-8 overflow-auto whitespace-nowrap bg-[#00000008] p-3'>
      <div className='flex items-center gap-x-3'>
        <span>Sắp xếp theo</span>
        {buttonRenderArray.map((button) => (
          <Button key={uuidv4()} className={button.className} primary={button.primary} onClick={button.onClick}>
            {button.content}
          </Button>
        ))}
        <Select
          id='sortPrice'
          name='sortPrice'
          className='h-9 border border-black017 py-0 px-2 outline-none'
          onChange={handleSortByPrice}
        >
          <Option disabled>Giá</Option>
          <Option value='asc'>Giá: Thấp đến Cao</Option>
          <Option value='desc'>Giá: Cao đến Thấp</Option>
        </Select>
      </div>
      <div className='flex items-center'>
        <div className='mr-3'>
          <span className='text-orangeCustomize'>{page}</span>
          <span>/{pagination?.total}</span>
        </div>
        <PaginationButton onClick={goPrevPage} primary={pagination.currentPage > 1}>
          <IconPrev className='h-3 w-3' />
        </PaginationButton>
        <PaginationButton onClick={goNextPage} primary={pagination.total > page}>
          <IconNext className='h-3 w-3' />
        </PaginationButton>
      </div>
    </div>
  )
}

export default SearchSortBar
