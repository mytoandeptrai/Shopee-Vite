import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { orderAPI } from '~/api'
import { CheckoutHeader, CheckoutMain } from '~/modules/Checkout'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'
import { IOrderPayload, IPayloadBuyProduct } from '~/types'
import { sweetAlertInfo, sweetAlertQuestion } from '~/utils/sweetAlert'

const CheckOutPage = () => {
  const navigate = useNavigate()
  const { currentUser, carts, setCarts } = useStore((state) => state)
  const [shippingFee, setShippingFee] = useState(0)
  const buyProductsMutation = useMutation({
    mutationFn: (payload: IPayloadBuyProduct) => orderAPI.createNewOrder(payload),
    onSuccess: ({ message }) => {
      toast.success(message)
      setCarts([])
      navigate(`/${routeConfig.ProfilePage}`)
    },
    onError(error: any) {
      toast.error(error?.message)
    }
  })

  const handlerCheckout = useCallback(
    (order: IOrderPayload) => {
      if (carts.length <= 0) {
        const navigateToCartPage = () => navigate(routeConfig.CartPage)
        sweetAlertInfo('Giỏ hàng của bạn đang trống', 'Vui lòng kiểm tra giỏ hàng và thử lại', navigateToCartPage)
        return
      }

      if (!currentUser || !currentUser.fullname || !currentUser.phone || !currentUser.address) {
        const navigateToProfilePage = () => navigate(routeConfig.ProfilePage)
        sweetAlertInfo(
          'Thông tin nhận hàng đang trống',
          'Vui lòng kiểm tra thông tin và thử lại',
          navigateToProfilePage
        )
        return
      }
      sweetAlertQuestion('Xác nhận', 'Bạn có chắc chắc muốn thanh toán?', () => buyProductsMutation.mutate(order))
    },
    [buyProductsMutation, carts.length, currentUser, navigate]
  )

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <CheckoutHeader />
      <CheckoutMain handlerCheckout={handlerCheckout} shippingFee={shippingFee} />
    </>
  )
}

export default CheckOutPage
