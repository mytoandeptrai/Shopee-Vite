import { ProductResponse, ShopResponse, ShopsResponse } from '~/types'
import axiosClient from './axiosClient'

export const shopAPI = {
  getAllShop: (): Promise<ShopsResponse> => {
    const path = `/v1/shops`
    return axiosClient.get(path)
  },
  getProductsOfShop: (params: { shopId: string }): Promise<ProductResponse> => {
    const path = `/v1/shops/${params.shopId}/products`
    return axiosClient.get(path)
  },
  getSingleShop: (params: { shopId: string }): Promise<ShopResponse> => {
    const path = `/v1/shops/${params.shopId}`
    return axiosClient.get(path)
  }
}
