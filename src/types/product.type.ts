import { IReview } from './review.type'
import { IShopInfo } from './shop.type'
import { IPagination, SuccessResponse } from './utils.type'

export interface IProduct {
  _id: string
  name: string
  image: string
  images: string[]
  description: string
  category: string
  oldPrice: number
  price: number
  rating: number
  stock: number
  sold: number
  view: number
  reviews: IReview[]
  shop?: IShopInfo
}

export interface IProductSearchParams {
  page: string
  limit: string
  category: string
  rating: string
  price_max: string
  price_min: string
  sort_by: string
  order: string
  name: string
}

export interface IProductsConfig {
  page?: string
  limit?: string
  category?: string
  rating?: string
  price_max?: string
  price_min?: string
  sort_by?: string
  order?: string
  name?: string
}

export type IPayloadProduct = Omit<IProduct, '_id' | 'reviews'>
export type ProductResponse = SuccessResponse<IProduct>
export type ProductsResponse = SuccessResponse<{
  products: IProduct[]
  pagination: IPagination
}>
