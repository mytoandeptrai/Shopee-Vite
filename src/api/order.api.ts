import {
  IDiscoverVoucherSearchParams,
  IOrderParams,
  IPayloadBuyProduct,
  IPayloadCancelOrder,
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
  },
  getSingleOrder: (idOrder: string): Promise<OrderResponse> => {
    const path = `/v1/orders/${idOrder}`
    return axiosClient.get(path)
  },
  cancelOrder: (id: string, payload: IPayloadCancelOrder): Promise<OrderResponse> => {
    const path = `/v1/orders/${id}/canceled`
    return axiosClient.put(path, payload)
  }
}
