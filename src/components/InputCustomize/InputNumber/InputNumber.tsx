import { ChangeEvent } from 'react'
import classNames from '~/utils/classNames'

type InputNumberProps = React.InputHTMLAttributes<HTMLInputElement>

const InputNumber = ({ name, onChange, value, className, ...props }: InputNumberProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if ((/^\d+$/.test(val) || val === '') && onChange) {
      e.target.value = val
      onChange(e)
    }
  }
  return (
    <input
      id={name}
      name={name}
      type='text'
      className={classNames(
        'shadow-input h-10 rounded-sm border border-[#00000024] px-4 outline-none focus:border focus:border-[#0000008a]',
        className
      )}
      onChange={handleChange}
      value={value}
      {...props}
    />
  )
}

export default InputNumber
