import React from 'react'
import { useDropdown } from '../DropdownProvider/DropdownProvider'

type DropdownOptionProps = React.OptionHTMLAttributes<HTMLOptionElement>

// eslint-disable-next-line react/prop-types
const DropdownOption = ({ onClick, children }: DropdownOptionProps) => {
  const { setShow } = useDropdown()
  const handleClick = (e: React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
    if (onClick) onClick(e)
    setShow(false)
  }
  return (
    <option
      onClick={handleClick}
      className='line-clamp-1 flex cursor-pointer items-center justify-between overflow-hidden whitespace-pre px-4 py-2 text-sm transition-all hover:text-orangeCustomize'
    >
      {children}
    </option>
  )
}

export default DropdownOption
