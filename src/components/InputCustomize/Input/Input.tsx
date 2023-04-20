/* eslint-disable react/prop-types */
import React from 'react'
import classNames from '~/utils/classNames'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ name, type = 'text', className, ...props }: InputProps) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      className={classNames(
        'shadow-input h-10 rounded-sm border border-[#00000024] px-4 outline-none focus:border focus:border-[#0000008a]',
        className
      )}
      {...props}
    />
  )
}

export default Input
