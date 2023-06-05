import React from 'react'
import { IPagination } from '~/types'
import classNames from '~/utils/classNames'
import { v4 as uuidv4 } from 'uuid'
import { Pagination } from '../PaginationCustomize'

type Props = {
  thList: string[]
  children: JSX.Element
  isPagination?: boolean
  paginationOptions?: IPagination
  className?: string
}

const Table = ({
  thList,
  children,
  isPagination = false,
  paginationOptions = { length: 0, currentPage: 0, total: 0 },
  className = ''
}: Props) => {
  const classes = classNames('tableCustomize', className)

  const renderPagination = () => {
    if (!isPagination) {
      return null
    }

    return <Pagination pagination={paginationOptions} />
  }

  return (
    <>
      <div className={classes}>
        <table>
          <thead>
            <tr>
              {thList.map((el) => (
                <th key={uuidv4()}>{el}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {renderPagination()}
    </>
  )
}

export default Table
