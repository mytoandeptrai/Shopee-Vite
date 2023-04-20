import { IProduct } from '~/types'
import { ProductCard } from '../ProductCard'
import { ProductGridLayout } from '../ProductGridLayout'

interface Props {
  products: IProduct[]
}

const ProductList = ({ products }: Props) => {
  return (
    <ProductGridLayout>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </ProductGridLayout>
  )
}

export default ProductList
