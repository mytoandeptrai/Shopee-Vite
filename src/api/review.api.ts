import { IPayloadReview, IResponse, ReviewsResponse } from '~/types'
import axiosClient from './axiosClient'

export const reviewAPI = {
  createNewReview: (payload: IPayloadReview): Promise<ReviewsResponse> => {
    const path = `/v1/reviews/`
    return axiosClient.post(path, payload)
  },
  updateProduct: (reviewId: string, payload: IPayloadReview): Promise<IResponse> => {
    const path = `/v1/reviews/${reviewId}`
    return axiosClient.put(path, payload)
  },
  deleteReview: (reviewId: string): Promise<IResponse> => {
    const path = `/v1/reviews/${reviewId}`
    return axiosClient.delete(path)
  },
  getAllReviewOfProduct: (productId: string): Promise<ReviewsResponse> => {
    const path = `/v1/reviews/product/${productId}`
    return axiosClient.get(path)
  },
  getAllReviewOfOrder: (orderId: string): Promise<ReviewsResponse> => {
    const path = `/v1/reviews/order/${orderId}`
    return axiosClient.get(path)
  }
}
