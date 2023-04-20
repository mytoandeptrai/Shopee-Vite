/* eslint-disable react/prop-types */
import React from 'react'
import { IconHiddenPassword, IconShowPassword } from '~/components/Icons'
import classNames from '~/utils/classNames'

type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>

const InputPassword = ({ name, type = 'text', className = '', ...props }: InputPasswordProps) => {
  const [isFocus, setIsFocus] = React.useState(false)
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false)

  const classes = classNames(
    'flex items-center border shadow-input pr-4',
    isFocus ? 'border-[#0000008a]' : 'border-[#00000023]'
  )

  const toggleVisiblePassword = () => {
    setIsVisiblePassword((prevState) => !prevState)
  }

  return (
    <div className={classes}>
      <input
        id={name}
        name={name}
        type={isVisiblePassword ? 'text' : 'password'}
        className={classNames('h-10 flex-1 rounded-sm px-4 outline-none', className)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...props}
      />
      <button type='button' onClick={toggleVisiblePassword} className='h-5 w-5'>
        {isVisiblePassword ? <IconShowPassword /> : <IconHiddenPassword />}
      </button>
    </div>
  )
}

export default InputPassword
