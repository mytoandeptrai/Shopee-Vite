import {
  IDiscoverVoucherSearchParams,
  IPayloadBuyProduct,
  IPayloadVoucher,
  IResponse,
  IVoucherSearchParams,
  MyVouchersResponse,
  OrderResponse,
  VoucherResponse,
  VouchersResponse
} from '~/types'
import axiosClient from './axiosClient'

export const orderAPI = {
  createNewOrder: (payload: IPayloadBuyProduct): Promise<OrderResponse> => {
    const path = `/v1/orders`
    return axiosClient.post(path, payload)
  }
}
