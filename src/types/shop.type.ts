import { ICurrentUser } from './user.type'
import { SuccessResponse } from './utils.type'

interface CommonKeyValue {
  id: string
  name: string
}

export interface IShopInfo {
  _id: string
  name: string
  avatar: string
  city: CommonKeyValue
  district: CommonKeyValue
  ward: CommonKeyValue
  street: string
  address: string
  slug: string
  user: ICurrentUser
  createdAt: string
  updatedAt: string
}

export interface IShopOverview {
  totalOrders: number
  totalOrdersWaiting: number
  totalOrdersProcessing: number
  totalOrdersShipping: number
  totalOrdersCanceled: number
  totalOrdersDelivered: number
  totalProducts: number
  totalUsers: number
  totalVouchers: number
  totalRevenue: number
}

export type ShopOverviewResponse = SuccessResponse<IShopOverview>

export type ShopsResponse = SuccessResponse<IShopInfo[]>
export type ShopResponse = SuccessResponse<IShopInfo>
