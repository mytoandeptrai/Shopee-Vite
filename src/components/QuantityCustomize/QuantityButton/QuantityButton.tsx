import React from 'react'
import classNames from '~/utils/classNames'

type Props = {
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

const QuantityButton = ({
  onClick = () => {
    return
  },
  className = '',
  children
}: Props) => {
  return (
    <button
      className={classNames('flex h-8 w-8 items-center justify-center border border-black017', className)}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default QuantityButton
