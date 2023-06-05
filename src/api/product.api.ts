import { IPayloadProduct, IProductsConfig, ProductResponse, ProductsResponse } from '~/types'
import axiosClient from './axiosClient'

export const productAPI = {
  addNewProduct: (payload: IPayloadProduct): Promise<ProductResponse> => {
    const path = `/v1/products/create`
    return axiosClient.post(path, payload)
  },
  updateProduct: (productId: string, payload: IPayloadProduct): Promise<ProductResponse> => {
    const path = `/v1/products/${productId}`
    return axiosClient.patch(path, payload)
  },
  deleteProduct: (productId: string): Promise<ProductResponse> => {
    const path = `/v1/products/${productId}`
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
