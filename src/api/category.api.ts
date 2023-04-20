import { CategoriesResponse } from '~/types'
import axiosClient from './axiosClient'

export const categoryAPI = {
  getAllCategory: (): Promise<CategoriesResponse> => {
    const path = `v1/categories`
    return axiosClient.get(path)
  }
}
