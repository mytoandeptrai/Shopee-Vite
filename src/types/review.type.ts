import { ICurrentUser } from './user.type'
import { SuccessResponse } from './utils.type'
interface IProductReview {
  _id: string
  name: string
  image: string
}
export interface IReview {
  _id: string
  productId: IProductReview
  orderId: string
  comment: string
  rating: number
  user: ICurrentUser
  created_at: string
  updated_at: string
}

export interface IPayloadReview {
  rating: number
  comment: string
  productId: string
  orderId: string
}

export interface IPayloadUpdateReview {
  reviewId: string
  payload: IPayloadReview
}

export type ReviewsResponse = SuccessResponse<IReview[]>
export type ReviewResponse = SuccessResponse<IReview>
