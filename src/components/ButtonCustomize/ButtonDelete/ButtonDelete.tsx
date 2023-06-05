import { ButtonHTMLAttributes } from 'react'
import { IconClipboard } from '~/components/Icons'
import classNames from '~/utils/classNames'

type ButtonDeleteProps = ButtonHTMLAttributes<HTMLButtonElement>

const ButtonDelete = ({ className, ...props }: ButtonDeleteProps) => {
  return (
    <button
      type='button'
      className={classNames(
        'absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-redCustomize',
        className
      )}
      {...props}
    >
      <IconClipboard className='h-[14px] w-[14px] text-white' />
    </button>
  )
}

export default ButtonDelete
