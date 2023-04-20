import { useQuery } from 'react-query'
import { productAPI } from '~/api'
import { STALE_TIME_CONSTANT } from '~/constants'
import { ProductList } from '../ProductList'

type Props = {
  categoryId: string
}

const ProductRelated = ({ categoryId }: Props) => {
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => productAPI.getAllProduct({ category: categoryId }),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    enabled: categoryId !== ''
  })

  if (isLoading || !productsData?.data) return null

  return (
    <div>
      <h3 className='my-3 text-base font-medium text-[#0000008a]'>SẢN PHẨM TƯƠNG TỰ</h3>
      <ProductList products={productsData?.data} />
    </div>
  )
}

export default ProductRelated
