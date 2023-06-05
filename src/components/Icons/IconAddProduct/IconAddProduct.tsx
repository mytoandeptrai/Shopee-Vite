import { SVGProps } from 'react'
import classNames from '~/utils/classNames'

type IconAddProductProps = SVGProps<SVGSVGElement>

const IconAddProduct = ({ className }: IconAddProductProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={classNames('h-4 w-4', className)}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
      />
    </svg>
  )
}

export default IconAddProduct
