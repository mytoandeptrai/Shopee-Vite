import { IProduct, IResponse, SuccessResponse } from '~/types'
import axiosClient from './axiosClient'

export type WishlistsResponse = SuccessResponse<IProduct[]>
export const wishListAPI = {
  getMyWishlist: (): Promise<WishlistsResponse> => {
    const path = `v1/wishlists`
    return axiosClient.get(path)
  },
  addToWishlist: (id: string): Promise<IResponse> => {
    const path = `v1/wishlists/create?productId=${id}`
    return axiosClient.post(path)
  },
  removeFromWishlist: (id: string): Promise<IResponse> => {
    const path = `v1/wishlists/delete?productId=${id}`
    return axiosClient.delete(path)
  }
}
