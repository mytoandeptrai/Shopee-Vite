import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CommonLayout } from '~/layouts/templates'
import { useAddProductMutation } from '~/mutations/product.mutations'
import { routeConfig } from '~/route/routeConfig'
import { ICreateProductPayload } from '~/types'
import { ProductAddNewForm } from './components'

const ProductAddNew = () => {
  const [isLoadingProgress, setIsLoadingProgress] = React.useState(false)
  const addProduct = useAddProductMutation()
  const navigate = useNavigate()

  const handleAddNewProduct = (product: ICreateProductPayload) => {
    const formData = new FormData()
    Object.keys(product).forEach((key) => {
      const tempProduct: any = { ...product }
      if (Array.isArray(tempProduct[key])) {
        for (let i = 0; i < tempProduct[key].length; i++) {
          const file = tempProduct[key][i]
          formData.append(key, file)
        }
      } else {
        formData.append(key, tempProduct[key])
      }
    })
    setIsLoadingProgress(true)
    addProduct.mutate(formData, {
      onSuccess: ({ message }) => {
        toast.success(message)
        navigate(routeConfig.DashboardPage)
        setIsLoadingProgress(false)
      },
      onError(error: any) {
        toast.error(error?.message)
        setIsLoadingProgress(false)
      }
    })
  }

  return (
    <CommonLayout title='Thêm 1 sản phẩm mới' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
      <Helmet>
        <title>Thêm sản phẩm mới</title>
      </Helmet>
      <ProductAddNewForm handleAddNewProduct={handleAddNewProduct} isDisableFieldAndButton={isLoadingProgress} />
    </CommonLayout>
  )
}

export default ProductAddNew
