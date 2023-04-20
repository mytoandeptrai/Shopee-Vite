import { BannerResponse, BannersResponse, IResponse } from '~/types'
import axiosClient from './axiosClient'

export const bannerAPI = {
  getAllBanner: (): Promise<BannersResponse> => {
    const path = `/v1/banners`
    return axiosClient.get(path)
  },
  addNewBanner: (payload: { bannerUrl: string }): Promise<BannerResponse> => {
    const path = `/v1/banners`
    return axiosClient.post(path, payload)
  },
  updateBanner: (id: string, payload: { bannerUrl: string }): Promise<IResponse> => {
    const path = `/v1/banners/${id}`
    return axiosClient.put(path, payload)
  },
  deleteBanner: (id: string): Promise<IResponse> => {
    const path = `/v1/banners/${id}`
    return axiosClient.delete(path)
  }
}
