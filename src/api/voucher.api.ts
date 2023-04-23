import {
  IDiscoverVoucherSearchParams,
  IPayloadVoucher,
  IResponse,
  IVoucherSearchParams,
  MyVouchersResponse,
  VoucherResponse,
  VouchersResponse
} from '~/types'
import axiosClient from './axiosClient'

export const voucherAPI = {
  getMyVoucher: (params?: Partial<IVoucherSearchParams>): Promise<MyVouchersResponse> => {
    const path = `/v1/vouchers/my-voucher`
    return axiosClient.get(path, { params })
  },
  getDiscoverVoucher: (params?: Partial<IDiscoverVoucherSearchParams>): Promise<VouchersResponse> => {
    const path = `/v1/vouchers/discover`
    return axiosClient.get(path, { params })
  },
  getAllVoucher: (params?: Partial<IVoucherSearchParams>): Promise<VouchersResponse> => {
    const path = `/v1/vouchers`
    return axiosClient.get(path, { params })
  },
  getSingleVoucher: (voucherId: string): Promise<VoucherResponse> => {
    const path = `/v1/vouchers/${voucherId}`
    return axiosClient.get(path)
  },
  saveVoucher: (code: string): Promise<VoucherResponse> => {
    const path = `/v1/vouchers/save?code=${code}`
    return axiosClient.post(path)
  },
  addNewVoucher: (payload: IPayloadVoucher): Promise<VoucherResponse> => {
    const path = `/v1/vouchers`
    return axiosClient.post(path, payload)
  },
  updateVoucher: (voucherId: string, payload: IPayloadVoucher): Promise<VoucherResponse> => {
    const path = `/v1/vouchers/${voucherId}`
    return axiosClient.put(path, payload)
  },
  deleteVoucher: (voucherId: string): Promise<IResponse> => {
    const path = `/v1/vouchers/${voucherId}`
    return axiosClient.delete(path)
  }
}
