import { ICurrentUser } from './user.type'
import { SuccessResponse } from './utils.type'

export interface IReview {
  _id: string
  productId: string
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

export type ReviewsResponse = SuccessResponse<IReview[]>
export type ReviewResponse = SuccessResponse<IReview>
