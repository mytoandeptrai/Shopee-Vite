import { HTMLAttributes } from 'react'
import classNames from '~/utils/classNames'

type FormErrorProps = HTMLAttributes<HTMLSpanElement>

const FormError = ({ children, className }: FormErrorProps) => {
  return <span className={classNames('text-xs font-medium text-redCustomize', className)}>{children}</span>
}

export default FormError
