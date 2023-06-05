import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { productAPI } from '~/api'
import { QUERIES_KEY, STALE_TIME_CONSTANT } from '~/constants'
import { CommonLayout } from '~/layouts/templates'
import PageNotFound from '~/pages/PageNotFound'
import { ICreateProductPayload, IProduct } from '~/types'
import { ProductUpdateForm } from './components'
import { ProductNotFound } from '../../ProductNotFound'
import { toast } from 'react-toastify'
import { useUpdateProductMutation } from '~/mutations/product.mutations'

const minimumArrayLength = 5

const ProductUpdate = () => {
  const { id = '' } = useParams()
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null)
  const [isLoadingProgress, setIsLoadingProgress] = useState(false)
  const updateProduct = useUpdateProductMutation()

  const { refetch } = useQuery({
    queryKey: [QUERIES_KEY.PRODUCT, id],
    queryFn: () => productAPI.getSingleProduct(id),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    onSuccess: ({ data: productData }) => {
      setCurrentProduct(productData)
    },
    onError: (_error: any) => {
      setCurrentProduct(null)
    },
    enabled: id !== ''
  })

  const handleUpdateProduct = useCallback(
    (newProduct: ICreateProductPayload) => {
      if (newProduct.images.length < minimumArrayLength) {
        toast.error(`Please add up at least ${minimumArrayLength} images`)
        return
      }

      const payload = new FormData()
      Object.keys(newProduct).forEach((key) => {
        const tempProduct: any = { ...newProduct }
        if (Array.isArray(tempProduct[key])) {
          for (let i = 0; i < tempProduct[key].length; i++) {
            const file = tempProduct[key][i]
            payload.append(key, file)
          }
        } else {
          payload.append(key, tempProduct[key])
        }
      })

      setIsLoadingProgress(true)
      updateProduct.mutate(
        { productId: id, payload },
        {
          onSuccess: ({ message }) => {
            toast.success(message)
            setIsLoadingProgress(false)
            refetch()
          },
          onError(error: any) {
            toast.error(error?.message)
            setIsLoadingProgress(false)
          }
        }
      )
    },
    [id, refetch, updateProduct]
  )

  if (!id) {
    return <PageNotFound />
  }

  const renderProductUpdateForm = () => {
    if (!currentProduct) {
      return <ProductNotFound />
    }

    return (
      <ProductUpdateForm
        initialProductInfo={currentProduct}
        handleUpdateProduct={handleUpdateProduct}
        isDisableFieldAndButton={isLoadingProgress}
      />
    )
  }

  return (
    <CommonLayout title='Sửa thông tin sản phẩm' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
      <Helmet>
        <title>Cập nhật sản phẩm</title>
      </Helmet>
      {renderProductUpdateForm()}
    </CommonLayout>
  )
}

export default ProductUpdate
