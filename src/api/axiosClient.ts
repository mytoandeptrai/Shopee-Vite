import axios, { AxiosResponse } from 'axios'
import queryString from 'query-string'
import {
  getAccessTokenLocalStorage,
  getRefreshTokenLocalStorage,
  removeEmptyValuesObject,
  setCurrentUserLocalStorage
} from '~/utils'

const BASE_URL_API =
  import.meta.env.VITE_MODE === 'dev' ? import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD

const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  paramsSerializer: {
    serialize: (params) => {
      const removeEmptyStringValueObj = removeEmptyValuesObject(params)
      return queryString.stringify(removeEmptyStringValueObj)
    }
  }
})

const requestRefreshToken = async () => {
  const refreshToken = getRefreshTokenLocalStorage()
  const path = `${BASE_URL_API}/v1/auth/refresh-token?refreshToken=${refreshToken}`
  const { data } = await axios.post(path)
  return data.data
}

axiosClient.interceptors.request.use(
  async function (config: any) {
    const customConfig = {
      ...config,
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessTokenLocalStorage()}`
      }
    }
    return customConfig
  },
  function (error: any) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  async function (response: AxiosResponse) {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  async function (error: any) {
    const { response } = error
    const errorMessage = response?.data?.message

    if (response?.status === 401 && errorMessage === 'jwt expired') {
      try {
        const { accessToken, refreshToken } = await requestRefreshToken()
        response.config.headers.Authorization = `Bearer ${accessToken}`
        setCurrentUserLocalStorage({ accessToken, refreshToken })
        return await axiosClient(response.config)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error?.response?.data)
  }
)

export default axiosClient
