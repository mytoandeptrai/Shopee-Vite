import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useModal from '~/hooks/useModal'
import { IOrderItem, IProduct, IReview } from '~/types'

type Props = {
  orderItems: IOrderItem[]
}

const OrderReviews = (props: Props) => {
  const { id = '' } = useParams()
  const { isShow: isShowAdd, toggleModal: toggleModalAdd } = useModal()
  const { isShow: isShowUpdate, toggleModal: toggleModalUpdate } = useModal()
  const [productReview, setProductReview] = useState<IProduct>(Object)
  const [dataReview, setDataReview] = useState<IReview>(Object)
  return <div>OrderReviews</div>
}

export default OrderReviews
