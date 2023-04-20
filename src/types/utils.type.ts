export interface SuccessResponse<Data> {
  data: Data
  message: string
  status: number
  success?: boolean
  [key: string]: any
}

export interface ErrorResponse<Data> {
  data?: Data
  message: string
  status: number
  success?: boolean
  [key: string]: any
}

export interface IResponse {
  data?: any
  message: string
  status: number
  success?: boolean
  [key: string]: any
}

export interface IErrorData {
  status: number
  success?: boolean
  message: string
  error?: { [key: string]: string }[]
}

export interface IPagination {
  length: number
  currentPage: number
  total: number
}

export interface IOrderItem {
  quantity: number
  product: string
  oldPrice: number
  price: number
  shop: {
    _id: string | undefined
    address: string | undefined
  }
}

export interface IOrderPayload {
  shippingTo: string
  price: number
  note: string
  shippingFee: number
  promotion: number
  total: number
  voucherCode: string | undefined
  methodPayment: string
  orderItems: IOrderItem[]
}
