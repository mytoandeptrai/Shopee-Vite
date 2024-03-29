/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import classNames from '~/utils/classNames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  to?: string
}

const Button = ({ children, type, className, primary = false, to = '', ...props }: ButtonProps) => {
  const stylesButton = primary
    ? 'py-2 px-4 rounded-sm border border-transparent text-white bg-orangeCustomize hover:bg-[#f05d40] transition-all duration-200 disabled:cursor-not-allowed'
    : 'py-2 rounded-sm px-4 border border-[#00000016] hover:bg-[#00000005] text-[#555] shadow-button-normal bg-white transition-all duration-200 disabled:cursor-not-allowed'
  if (to) {
    return (
      <Link to={to}>
        <button type={type} {...props} className={classNames(stylesButton, className)}>
          {children}
        </button>
      </Link>
    )
  }
  return (
    <button type={type} {...props} className={classNames(stylesButton, className)}>
      {children}
    </button>
  )
}

export default Button
