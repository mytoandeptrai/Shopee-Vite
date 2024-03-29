import { IProduct } from './product.type'
import { IOrderItemPayload as IOrderItems, SuccessResponse } from './utils.type'
export enum EnumOrderStatus {
  waiting = 'waiting',
  processing = 'processing',
  shipping = 'shipping',
  delivered = 'delivered',
  canceled = 'canceled'
}

export enum OrderStatusVietnamese {
  waiting = 'Đang chờ',
  processing = 'Đang xử lí',
  shipping = 'Đang giao hàng',
  delivered = 'Đã giao hàng',
  canceled = 'Đã hủy'
}

export enum OrderStatusCode {
  waiting = 0,
  processing = 1,
  shipping = 2,
  delivered = 3,
  canceled = 4
}

export interface IOrderItem {
  product: IProduct
  quantity: number
}

export interface IOrderDetails {
  _id: string
  shop: any
  orderItems: IOrderItem[]
  shippingFrom: string
  shippingTo: string
  price: number
  shippingFee: number
  oldPrice: number
  promotion: number
  total: number
  note: string
  status: EnumOrderStatus
  statusCode: OrderStatusCode
  shippingAt: string
  deliveredAt: string
  canceledAt: string
  created_at: string
  updated_at: string
  reasonCancel: string
  methodPayment: string
  user: {
    _id: string
    email: string
    fullname: string
  }
}

export interface IPayloadBuyProduct {
  orderItems: IOrderItems[]
  shippingTo: string
  price: number
  note: string
  shippingFee: number
  promotion: number
  total: number
  voucherCode: string | undefined
  methodPayment: string
}

export interface IStatusOrder {
  active: boolean
  icon: React.ReactNode
  date: string
  status: string
}

export interface IOrderParams {
  [k: string]: string
}

export interface IPayloadCancelOrder {
  reasonCancel: string
}

export type OrderResponse = SuccessResponse<IOrderDetails>
export type OrdersResponse = SuccessResponse<{
  orders: IOrderDetails[]
}>
