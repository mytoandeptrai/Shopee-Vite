import { useCallback } from 'react'
import classNames from '~/utils/classNames'
import { useDropdown } from '../DropdownProvider/DropdownProvider'

type DropdownSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

const DropdownSelect = ({ placeholder, className = '' }: DropdownSelectProps) => {
  const { show, toggleHandler } = useDropdown()
  const classes = classNames(
    'dropdown-select transition-all duration-200 flex items-center justify-between px-4 rounded-sm outline-none h-10 border border-[#00000024] shadow-input cursor-pointer',
    className
  )

  const renderSelectIcon = useCallback(() => {
    if (show) {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 15l7-7 7 7' />
        </svg>
      )
    }

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-4 w-4'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
      </svg>
    )
  }, [show])

  return (
    <div aria-hidden onClick={toggleHandler} className={classes}>
      <span className='capitalize'>{placeholder}</span>
      {renderSelectIcon()}
    </div>
  )
}

export default DropdownSelect
