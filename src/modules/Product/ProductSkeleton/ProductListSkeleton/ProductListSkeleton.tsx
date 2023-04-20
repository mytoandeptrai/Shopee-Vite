import { v4 as uuidv4 } from 'uuid'
import { ProductGridLayout } from '../../ProductGridLayout'
import { ProductCardSkeleton } from '../ProductCardSkeleton'
interface ProductListSkeletonProps {
  count?: number
}

const ProductListSkeleton = ({ count = 12 }: ProductListSkeletonProps) => {
  return (
    <ProductGridLayout>
      {Array(count)
        .fill(0)
        .map((_item, _index) => (
          <ProductCardSkeleton key={uuidv4()} />
        ))}
    </ProductGridLayout>
  )
}

export default ProductListSkeleton
