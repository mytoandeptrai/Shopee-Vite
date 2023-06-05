import { IProductsConfig, ProductResponse, ProductsResponse } from '~/types'
import axiosClient from './axiosClient'

export const productAPI = {
  addNewProduct: (payload: any): Promise<ProductResponse> => {
    const path = `/admin/products/create`
    return axiosClient.post(path, payload)
  },
  updateProduct: (productId: string, payload: any): Promise<ProductResponse> => {
    const path = `/admin/products/${productId}`
    return axiosClient.patch(path, payload)
  },
  deleteProduct: (productId: string): Promise<ProductResponse> => {
    const path = `/admin/products/${productId}`
    return axiosClient.delete(path)
  },
  getAllProduct: (params: Partial<IProductsConfig>): Promise<ProductsResponse> => {
    const path = '/v1/products'
    return axiosClient.get(path, { params })
  },
  getSingleProduct: (productId: string): Promise<ProductResponse> => {
    const path = `/v1/products/${productId}`
    return axiosClient.get(path)
  }
}
