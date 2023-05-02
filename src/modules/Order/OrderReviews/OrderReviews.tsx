import React, { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reviewAPI } from '~/api'
import { Button } from '~/components/ButtonCustomize'
import { ModalAddNewReview, ModalEditReview } from '~/components/Modals'
import { STALE_TIME_CONSTANT } from '~/constants'
import useModal from '~/hooks/useModal'
import { ReviewList } from '~/modules/Reviews'
import { useCreateReview, useDeleteReview, useUpdateReview } from '~/mutations'
import { useStore } from '~/store/globalStore'
import { IOrderItem, IProduct, IReview } from '~/types'
import { OrderProduct } from '../OrderProduct'
import { sweetAlertDelete } from '~/utils/sweetAlert'

type IOrderUser = {
  _id: string
  fullname: string
  email: string
}

type Props = {
  orderItems: IOrderItem[]
  orderUser: IOrderUser
}

const OrderReviews = ({ orderItems, orderUser }: Props) => {
  const { id = '' } = useParams()
  const { currentUser } = useStore((state) => state)
  const { isShow: isShowAdd, toggleModal: toggleModalAdd } = useModal()
  const { isShow: isShowUpdate, toggleModal: toggleModalUpdate } = useModal()
  const [productReview, setProductReview] = useState<IProduct>(Object)
  const [dataReview, setDataReview] = useState<IReview>(Object)
  const createReview = useCreateReview()
  const updateReview = useUpdateReview()
  const deleteReview = useDeleteReview()

  const { data: reviewsData, refetch } = useQuery({
    queryKey: ['orderReviews', id],
    queryFn: () => reviewAPI.getAllReviewOfOrder(id),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const openModalAddHandler = useCallback(
    (product: IProduct) => {
      toggleModalAdd()
      setProductReview(product)
    },
    [toggleModalAdd]
  )

  const openModalUpdateHandler = useCallback(
    (review: IReview) => {
      toggleModalUpdate()
      setDataReview(review)
    },
    [toggleModalUpdate]
  )

  const handleAddNewReview = useCallback(
    (comment: string, rating: number, productId: string) => {
      const payload = { comment, rating, productId, orderId: id }
      createReview.mutate(payload, {
        onSuccess: ({ message }) => {
          toast.success(message)
          toggleModalUpdate()
          refetch()
        },
        onError: (error: any) => {
          toast.error(error?.message)
        }
      })
    },
    [createReview, id, refetch, toggleModalUpdate]
  )

  const handleDeleteReview = useCallback(
    (reviewId: string) => {
      sweetAlertDelete(() => {
        deleteReview.mutate(reviewId, {
          onSuccess: ({ message }) => {
            toast.success(message)
            refetch()
          },
          onError(error: any) {
            toast.error(error?.message)
          }
        })
      })
    },
    [deleteReview, refetch]
  )

  const handleEditReview = useCallback(
    (comment: string, rating: number, reviewId: string) => {
      if (comment === dataReview?.comment && rating === dataReview?.rating) {
        return
      }
      const payload = {
        comment,
        rating,
        productId: dataReview?.productId?._id,
        orderId: id
      }
      updateReview.mutate(
        { reviewId, payload },
        {
          onSuccess: ({ message }) => {
            toast.success(message)
            toggleModalAdd()
            refetch()
          },
          onError: (error: any) => {
            toast.error(error?.message)
          }
        }
      )
    },
    [dataReview?.comment, dataReview?.productId?._id, dataReview?.rating, id, refetch, toggleModalAdd, updateReview]
  )

  const isCurrentUser = React.useMemo(() => {
    return currentUser?._id === orderUser._id
  }, [currentUser?._id, orderUser._id])

  const renderOrderList = () => {
    if (orderItems.length > 0 && orderItems) {
      return (
        <>
          {orderItems.map((orderItem) => {
            return (
              <div className='my-3' key={orderItem.product._id}>
                <OrderProduct order={orderItem} />
                <Button onClick={() => openModalAddHandler(orderItem.product)}>Viết nhận xét</Button>
              </div>
            )
          })}
        </>
      )
    }
    return null
  }

  const renderReviewsList = () => {
    if (reviewsData?.data && reviewsData?.data?.length > 0) {
      return (
        <ReviewList
          reviewsData={reviewsData?.data}
          handleUpdateReview={openModalUpdateHandler}
          handleDeleteReview={handleDeleteReview}
          isCurrentUser={isCurrentUser}
        />
      )
    }

    return null
  }

  const renderModalEditReview = () => {
    if (dataReview?._id) {
      return (
        <ModalEditReview
          isOpenModal={isShowUpdate}
          onRequestClose={toggleModalUpdate}
          onSubmitEditHandler={handleEditReview}
          dataReview={dataReview}
        />
      )
    }

    return null
  }

  return (
    <div className='mt-4 rounded-md bg-white p-4'>
      {renderOrderList()}
      {renderReviewsList()}
      <ModalAddNewReview
        isOpenModal={isShowAdd}
        onRequestClose={toggleModalAdd}
        onSubmitAddHandler={handleAddNewReview}
        productReview={productReview}
      />
      {renderModalEditReview()}
    </div>
  )
}

export default OrderReviews
