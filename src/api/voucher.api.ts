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
  getMyVoucher: (): Promise<MyVouchersResponse> => {
    const path = `/v1/vouchers/my-voucher`
    return axiosClient.get(path)
  },
  getDiscoverVoucher: (params?: Partial<IDiscoverVoucherSearchParams>): Promise<VouchersResponse> => {
    const path = `api/vouchers/discover`
    return axiosClient.get(path, { params })
  },
  getAllVoucher: (params?: Partial<IVoucherSearchParams>): Promise<VouchersResponse> => {
    const path = `api/vouchers`
    return axiosClient.get(path, { params })
  },
  getSingleVoucher: (voucherId: string): Promise<VoucherResponse> => {
    const path = `api/vouchers/${voucherId}`
    return axiosClient.get(path)
  },
  saveVoucher: (code: string): Promise<VoucherResponse> => {
    const path = `api/vouchers/save?code=${code}`
    return axiosClient.post(path)
  },
  addNewVoucher: (payload: IPayloadVoucher): Promise<VoucherResponse> => {
    const path = `api/vouchers`
    return axiosClient.post(path, payload)
  },
  updateVoucher: (voucherId: string, payload: IPayloadVoucher): Promise<VoucherResponse> => {
    const path = `api/vouchers/${voucherId}`
    return axiosClient.put(path, payload)
  },
  deleteVoucher: (voucherId: string): Promise<IResponse> => {
    const path = `api/vouchers/${voucherId}`
    return axiosClient.delete(path)
  }
}
