import { useMutation } from 'react-query'
import { productAPI } from '~/api'

const useAddProductMutation = () => useMutation((payload: any) => productAPI.addNewProduct(payload))
const useDeleteProductMutation = () => useMutation((productId: string) => productAPI.deleteProduct(productId))
const useUpdateProductMutation = () =>
  useMutation(({ productId, payload }: { productId: string; payload: any }) =>
    productAPI.updateProduct(productId, payload)
  )
export { useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation }
