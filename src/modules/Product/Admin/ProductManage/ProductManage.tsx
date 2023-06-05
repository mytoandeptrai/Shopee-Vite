import { Helmet } from 'react-helmet-async'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { productAPI } from '~/api'
import { Button } from '~/components/ButtonCustomize'
import { Image } from '~/components/Image'
import { InputSearch } from '~/components/InputCustomize'
import { Loading } from '~/components/Loading'
import { Table } from '~/components/Table'
import { QUERIES_KEY, STALE_TIME_CONSTANT } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import { CommonLayout } from '~/layouts/templates'
import { useDeleteProductMutation } from '~/mutations/product.mutations'
import { routeConfig } from '~/route/routeConfig'
import { formatMoney } from '~/utils'
import { sweetAlertDelete } from '~/utils/sweetAlert'
import { ProductNotFound } from '../../ProductNotFound'
import { ProductPriceSale } from '../../ProductPriceSale'
import { TH_TABLE_LIST } from './ProductManage.config'

const ProductManage = () => {
  const { queryParams, setSearchParams } = useQueryParams()
  const name = queryParams?.name || ''
  const queryClient = useQueryClient()
  const deleteProduct = useDeleteProductMutation()
  const { isLoading, data: productsData } = useQuery({
    queryKey: [QUERIES_KEY.PRODUCTS, name],
    queryFn: () => productAPI.getAllProduct(queryParams),
    keepPreviousData: true,
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const handleSearchChange = (searchValue: string) => {
    const payload = { name: searchValue }
    setSearchParams(payload)
  }

  const handleDeleteProduct = (productId: string) => {
    sweetAlertDelete(() =>
      deleteProduct.mutate(productId, {
        onSuccess: ({ message }) => {
          toast.success(message)
          queryClient.invalidateQueries({ queryKey: [QUERIES_KEY.PRODUCTS, name], exact: true })
        },
        onError: (error: any) => {
          toast.error(error.message)
        }
      })
    )
  }

  const renderProductsTable = () => {
    if (isLoading) {
      return <Loading />
    }

    if (!productsData || (productsData.data && productsData?.data?.length === 0)) {
      return <ProductNotFound />
    }

    return (
      <div>
        <Table thList={TH_TABLE_LIST} isPagination={true} paginationOptions={productsData.meta}>
          {productsData.data?.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td className='w-[300px]'>
                <p className='line-clamp-2 !whitespace-pre-line'>{product.name}</p>
              </td>
              <td>
                <Image alt={product.name} src={product.image} className='h-14 w-14 rounded border border-slate-200' />
              </td>
              <td>{product.stock}</td>
              <td>{formatMoney(product.oldPrice)}</td>
              <td>
                <ProductPriceSale className='text-sm'>{product.price}</ProductPriceSale>
              </td>
              <td>
                <div className='flex gap-x-1'>
                  <Button to={`${routeConfig.ProductUpdatePage}/${product._id}`}>Sửa</Button>
                  <Button onClick={() => handleDeleteProduct(product._id)}>Xóa</Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    )
  }

  return (
    <CommonLayout title='Quản lí sản phẩm' desc='Thêm, xóa, sửa các sản phẩm của bạn'>
      <Helmet>
        <title>Quản lí sản phẩm</title>
      </Helmet>
      <InputSearch onChangeInputValue={handleSearchChange} />
      {renderProductsTable()}
    </CommonLayout>
  )
}

export default ProductManage
