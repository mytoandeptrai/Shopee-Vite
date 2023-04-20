import axios from 'axios'
import queryString from 'query-string'
import { CityResponse, DistrictResponse, IParamsDistrict, IParamsWard, WardResponse } from '~/types'

const BASE_URL_CITY = import.meta.env.VITE_BASE_URL_ADMINISTRATION
const axiosCity = axios.create({
  baseURL: BASE_URL_CITY,
  paramsSerializer: {
    serialize: (params) => {
      return queryString.stringify(params)
    }
  },
  headers: { 'Content-Type': 'application/json' }
})

export const cityAPI = {
  getAllCities: (): Promise<CityResponse> => {
    const path = '/city'
    return axiosCity.get(path)
  },
  getAllDistrict: (params: IParamsDistrict): Promise<DistrictResponse> => {
    const path = `/district`
    return axiosCity.get(path, { params })
  },
  getAllWard: (params: IParamsWard): Promise<WardResponse> => {
    const path = `/ward`
    return axiosCity.get(path, { params })
  }
}
