import { AuthResponse, ILogoutAuth, IPayloadAuth, IResponse } from '~/types'
import axiosClient from './axiosClient'

export const authAPI = {
  signIn: (payload: IPayloadAuth): Promise<AuthResponse> => {
    const path = '/v1/auth/sign-in'
    return axiosClient.post(path, payload)
  },
  signUp: (payload: IPayloadAuth): Promise<AuthResponse> => {
    const path = '/v1/auth/sign-up'
    return axiosClient.post(path, payload)
  },
  logout: (payload: ILogoutAuth): Promise<IResponse> => {
    const path = '/v1/auth/logout'
    return axiosClient.post(path, payload)
  }
}
