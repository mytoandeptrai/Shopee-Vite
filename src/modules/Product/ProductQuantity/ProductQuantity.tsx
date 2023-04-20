import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cartAPI } from '~/api'
import { ButtonOutline } from '~/components/ButtonCustomize'
import { IconCartOutline } from '~/components/Icons'
import { QuantityController } from '~/components/QuantityCustomize'
import { useStore } from '~/store/globalStore'
import { IPayloadAddToCart } from '~/types'

type Props = {
  stock: number
}

const ProductQuantity = ({ stock }: Props) => {
  const { id = '' } = useParams()
  const { setCarts, carts, currentUser } = useStore((state) => state)
  const addToCartMutation = useMutation({
    mutationFn: (payload: IPayloadAddToCart) => cartAPI.addToCart(payload)
  })

  const [addedQuantity, setAddedQuantity] = useState(1)
  const handleChangeQuantity = (quantity: number) => setAddedQuantity(() => quantity)

  const handleAddToCart = async () => {
    if (addedQuantity < 1) return
    if (!currentUser || !currentUser._id) {
      toast.error('Vui lòng đăng nhập để thêm giỏ hàng!')
      return
    }

    let quantity = addedQuantity
    const cartExist = carts?.find((cart) => cart.product._id === id)
    if (cartExist) {
      quantity = cartExist.quantity + addedQuantity
      cartExist.quantity = quantity
    }
    const payload = { productId: id, quantity }
    addToCartMutation.mutate(payload, {
      onSuccess({ message, data }) {
        if (cartExist) {
          const cartsRemoveExist = carts.filter((el) => el?._id !== cartExist?._id)
          setCarts([...cartsRemoveExist, cartExist])
        } else {
          setCarts([...carts, data])
        }
        toast.success(message)
      },
      onError(error: any) {
        toast.error(error?.message)
      }
    })
  }

  return (
    <>
      <div className='mt-2 flex flex-col gap-y-2 gap-x-4 md:flex-row md:items-center'>
        <span>Số lượng</span>
        <QuantityController defaultQuantity={addedQuantity} onChangeValue={handleChangeQuantity} />
        <span>{stock} sản phẩm có sẵn</span>
      </div>
      <div className='mt-6 flex flex-col gap-2 md:flex-row md:items-center'>
        <ButtonOutline primary className='flex h-10 w-max items-center lg:h-12' onClick={handleAddToCart}>
          <IconCartOutline className='mr-2 h-4 w-4' />
          <span className='text-sm'>Thêm vào giỏ hàng</span>
        </ButtonOutline>
      </div>
    </>
  )
}

export default ProductQuantity
