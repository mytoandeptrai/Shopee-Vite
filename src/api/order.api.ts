import {
  IDiscoverVoucherSearchParams,
  IOrderParams,
  IPayloadBuyProduct,
  IPayloadVoucher,
  IResponse,
  IVoucherSearchParams,
  MyVouchersResponse,
  OrderResponse,
  OrdersResponse,
  VoucherResponse,
  VouchersResponse
} from '~/types'
import axiosClient from './axiosClient'

export const orderAPI = {
  createNewOrder: (payload: IPayloadBuyProduct): Promise<OrderResponse> => {
    const path = `/v1/orders`
    return axiosClient.post(path, payload)
  },
  getOrderUser: (params: IOrderParams): Promise<OrdersResponse> => {
    const path = `v1/orders`
    return axiosClient.get(path, { params })
  }
}
