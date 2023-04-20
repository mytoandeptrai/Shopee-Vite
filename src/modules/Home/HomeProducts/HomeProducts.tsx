import { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { productAPI } from '~/api'
import { Pagination } from '~/components/PaginationCustomize'
import { QUERIES_KEY, STALE_TIME_CONSTANT } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import { ProductList, ProductListSkeleton } from '~/modules/Product'
import { isEmptyObject } from '~/utils'

const HomeProducts = () => {
  const { queryParams } = useQueryParams()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { isLoading, data: productsData } = useQuery({
    queryKey: [QUERIES_KEY.PRODUCTS, queryParams],
    queryFn: () => productAPI.getAllProduct(queryParams),
    keepPreviousData: true,
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  useEffect(() => {
    if (sectionRef.current && !isEmptyObject(queryParams)) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [queryParams])

  const renderProductList = () => {
    if (isLoading || !productsData?.data) {
      return (
        <div className='layout-container' ref={sectionRef}>
          <div className='bg-white px-5 py-4 text-center text-base font-medium uppercase text-orangeCustomize'>
            <h2>GỢI Ý HÔM NAY</h2>
          </div>
          <ProductListSkeleton />
        </div>
      )
    }

    if (productsData) {
      return (
        <>
          <ProductList products={productsData.data} />
          <Pagination pagination={productsData.meta} />
        </>
      )
    }
  }

  return (
    <div className='layout-container' ref={sectionRef}>
      <div className='border-b-4 border-b-[#ee4d2d] bg-white px-5 py-4 text-center text-base font-medium uppercase text-orangeCustomize'>
        <h2>GỢI Ý HÔM NAY</h2>
      </div>
      {renderProductList()}
    </div>
  )
}

export default HomeProducts
