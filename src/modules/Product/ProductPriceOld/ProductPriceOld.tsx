import { formatMoney } from '~/utils'
import classNames from '~/utils/classNames'

interface ProductPriceOldProps {
  children: number
  className?: string
}

const ProductPriceOld = ({ children, className = 'text-[#666]' }: ProductPriceOldProps) => {
  return <span className={classNames('line-through', className)}>{formatMoney(children)}</span>
}

export default ProductPriceOld
