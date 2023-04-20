import classNames from 'classnames'
import React, { LabelHTMLAttributes } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

const Label = ({ htmlFor, className, children, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames('cursor-pointer font-medium text-[#555555cc]', className)}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
