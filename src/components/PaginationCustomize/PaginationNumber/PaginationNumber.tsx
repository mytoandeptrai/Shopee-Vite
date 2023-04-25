import React, { ButtonHTMLAttributes } from 'react'
import classNames from '~/utils/classNames'

interface ButtonPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
}

const PaginationNumber = ({ active = false, className = '', children, ...props }: ButtonPageProps) => {
  const renderPaginationNumber = () => {
    if (active) {
      return (
        <button
          type='button'
          className={classNames('h-7 w-9 rounded-sm bg-orangeCustomize text-lg font-medium text-white', className)}
          {...props}
        >
          {children}
        </button>
      )
    }

    return (
      <button type='button' className={classNames('h-7 w-9 text-lg font-medium', className)} {...props}>
        {children}
      </button>
    )
  }

  return <>{renderPaginationNumber()}</>
}

export default PaginationNumber
