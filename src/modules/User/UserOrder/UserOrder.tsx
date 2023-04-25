import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { orderAPI } from '~/api'
import { STALE_TIME_CONSTANT } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import { UserOrderInput } from '../Components/UserOrderInput'
import { Loading } from '~/components/Loading'
import { OrderEmpty, OrderList } from '~/modules/Order'
import { Pagination } from '~/components/PaginationCustomize'

const UserOrder = () => {
  const { queryParams, setSearchParams } = useQueryParams()
  const status = queryParams?.status ?? ''

  const { isLoading, data: ordersData } = useQuery({
    queryKey: ['ordersMe', queryParams],
    queryFn: () => orderAPI.getOrderUser(queryParams),
    keepPreviousData: true,
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const handleSubmitOrder = React.useCallback(
    (orderId: string) => {
      setSearchParams({ orderId })
    },
    [setSearchParams]
  )

  const renderUserOrder = () => {
    if (isLoading) {
      return <Loading />
    }

    if (ordersData?.data?.orders?.length === 0 || !ordersData?.data?.orders) {
      return <OrderEmpty />
    }

    return (
      <div>
        <OrderList ordersList={ordersData?.data?.orders} />
        <Pagination pagination={ordersData.meta} />
      </div>
    )
  }

  return (
    <div>
      <Helmet>
        <title>Đơn hàng của bạn</title>
      </Helmet>
      <UserOrderInput handleSubmitOrder={handleSubmitOrder} />
      {renderUserOrder()}
    </div>
  )
}

export default UserOrder
