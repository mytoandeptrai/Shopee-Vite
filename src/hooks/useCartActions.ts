import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { cartAPI } from '~/api'
import { useStore } from '~/store/globalStore'
import { IPayloadAddToCart } from '~/types'

export default function useCartActions() {
  const { carts, setCarts } = useStore((state) => state)

  const addToCartMutation = useMutation({
    mutationFn: (payload: IPayloadAddToCart) => cartAPI.addToCart(payload),
    onSuccess: ({ data }, payload) => {
      const foundProductIndex = carts.findIndex((cart) => data._id === cart._id)
      carts[foundProductIndex].quantity = payload.quantity
      setCarts([...carts])
    },
    onError(error: any) {
      toast.error(error?.message)
    }
  })

  const removeCartMutation = useMutation({
    mutationFn: (cartId: string) => cartAPI.deleteSingleCart(cartId),
    onSuccess: ({ message }, cartId) => {
      const newCarts = carts.filter((item) => item._id !== cartId)
      setCarts(newCarts)
      toast.success(message)
    },
    onError(error: any) {
      toast.error(error?.message)
    }
  })
  const removeAllCartMutation = useMutation({
    mutationFn: () => cartAPI.deleteAllCart(),
    onSuccess: ({ message }) => {
      setCarts([])
      toast.success(message)
    },
    onError(error: any) {
      toast.error(error?.message)
    }
  })

  return {
    addToCartMutation,
    removeCartMutation,
    removeAllCartMutation,
    carts
  }
}
