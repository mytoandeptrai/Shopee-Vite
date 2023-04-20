import React from 'react'
import classNames from '~/utils/classNames'
import { activeStyle, normalStyle } from './PaginationButton.config'

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
}

const PaginationButton = ({ children, className = '', primary = false, ...props }: PaginationButtonProps) => {
  if (primary) {
    return (
      <button type='button' className={classNames(normalStyle, className)} {...props}>
        {children}
      </button>
    )
  }
  return (
    <button disabled type='button' className={classNames(activeStyle, className)} {...props}>
      {children}
    </button>
  )
}

export default PaginationButton
