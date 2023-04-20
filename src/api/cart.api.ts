import { CartResponse, CartsResponse, IPayloadAddToCart, IResponse } from '~/types'
import axiosClient from './axiosClient'

export const cartAPI = {
  getAllCart: (): Promise<CartsResponse> => {
    const path = `/v1/carts`
    return axiosClient.get(path)
  },
  getCartOfUser: (): Promise<CartsResponse> => {
    const path = `/v1/carts/user`
    return axiosClient.get(path)
  },
  addToCart: (payload: IPayloadAddToCart): Promise<CartResponse> => {
    const path = `/v1/carts/create`
    return axiosClient.post(path, payload)
  },
  deleteSingleCart: (cartId: string): Promise<IResponse> => {
    const path = `/v1/carts/${cartId}`
    return axiosClient.delete(path)
  },
  deleteAllCart: (): Promise<IResponse> => {
    const path = `/v1/carts/delete`
    return axiosClient.delete(path)
  }
}
