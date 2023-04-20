import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { productAPI } from '~/api'
import { Loading } from '~/components/Loading'
import { Pagination } from '~/components/PaginationCustomize'
import { STALE_TIME_CONSTANT } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import { ProductList, ProductNotFound } from '~/modules/Product'
import { SearchAside, SearchSortBar } from '~/modules/Search'
import { scrollToDestination } from '~/utils'

const SearchPage = () => {
  const currentMonth = useMemo(() => new Date().getMonth() + 1, [])
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const { queryParams } = useQueryParams()
  const { isLoading, data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productAPI.getAllProduct(queryParams),
    keepPreviousData: true,
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  useEffect(() => {
    scrollToDestination()
  }, [queryParams])

  const renderProductData = () => {
    if (isLoading) {
      return <Loading />
    }

    if (!productsData?.data) {
      return <ProductNotFound />
    }

    return (
      <div className='layout-container mt-8 flex flex-col gap-6 lg:flex-row'>
        <SearchAside />
        <div className='flex-1'>
          <SearchSortBar pagination={productsData.meta} />
          <ProductList products={productsData.data} />
          <Pagination pagination={productsData.meta} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          {queryParams?.name
            ? `${queryParams?.name} giá tốt Tháng ${currentMonth}, ${currentYear} | Mua ngay | Shopbee Việt Nam`
            : 'Tìm kiếm sản phẩm'}
        </title>
      </Helmet>
      {renderProductData()}
    </>
  )
}

export default SearchPage
