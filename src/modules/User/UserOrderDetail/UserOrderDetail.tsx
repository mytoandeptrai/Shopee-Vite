import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { orderAPI } from '~/api'
import { Loading } from '~/components/Loading'
import {
  OrderCancelAction,
  OrderEmpty,
  OrderInformation,
  OrderPayment,
  OrderReviews,
  OrderShippingProgress
} from '~/modules/Order'
import PageNotFound from '~/pages/PageNotFound'
import { OrderStatusVietnamese } from '~/types'

const UserOrderDetail = () => {
  const { id = '' } = useParams()
  const {
    isLoading,
    data: orderDetailsData,
    refetch
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => orderAPI.getSingleOrder(id),
    staleTime: 5 * 60 * 1000
  })

  const orderDetails = React.useMemo(() => {
    if (!orderDetailsData || !orderDetailsData?.data?._id) {
      return null
    }
    return orderDetailsData.data
  }, [orderDetailsData])

  if (isLoading) {
    return <Loading />
  }

  if (!orderDetails) {
    return <OrderEmpty />
  }

  return (
    <div>
      <Helmet>
        <title>Chi tiết đơn hàng</title>
      </Helmet>
      <div className='section-white'>
        <div className='flex flex-col justify-between md:flex-row md:items-center'>
          <h3 className='text-lg font-medium'>Quản lí đơn hàng</h3>
          <div>
            ID ĐƠN HÀNG: {orderDetails._id} |{' '}
            <span className='uppercase text-orangeCustomize'>{OrderStatusVietnamese[orderDetails?.status]}</span>
          </div>
        </div>
        <OrderShippingProgress orderDetails={orderDetails} />
        <OrderInformation orderDetails={orderDetails} />
      </div>
      <OrderCancelAction refetch={refetch} status={orderDetails.status} />
      <OrderReviews orderItems={orderDetails.orderItems} />
      <OrderPayment
        promotion={orderDetails.promotion}
        shippingFee={orderDetails.shippingFee}
        totalPayment={orderDetails.total}
        totalProductsPrice={orderDetails.price}
      />
    </div>
  )
}

export default UserOrderDetail
