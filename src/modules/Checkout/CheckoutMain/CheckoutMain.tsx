import React, { useMemo, useRef, useState } from 'react'
import Visa from '~/assets/images/icon-visa.png'
import { Button } from '~/components/ButtonCustomize'
import { ModalApplyVoucher } from '~/components/Modals'
import useModal from '~/hooks/useModal'
import { OrderPayment } from '~/modules/Order'
import { ProductPriceSale } from '~/modules/Product/ProductPriceSale'
import { useStore } from '~/store/globalStore'
import { IOrderPayload, IVoucher } from '~/types'
import { calcTotalPrice } from '~/utils'
import { CheckoutActions } from './CheckoutActions'
import { CheckoutCarts } from './CheckoutCarts'
import { CheckoutForm } from './CheckoutForm'
import { CheckoutUserInfo } from './CheckoutUserInfo'
import { CheckoutVoucher } from './CheckoutVoucher'

type Props = {
  handlerCheckout: (cart: IOrderPayload) => void
  shippingFee: number
}

export type MethodPaymentType = 'money' | 'credit-card'

const CheckoutMain = ({ handlerCheckout, shippingFee }: Props) => {
  const { currentUser, carts } = useStore((state) => state)
  const noteRef = useRef<string>('')
  const [appliedVoucher, setAppliedVoucher] = useState<IVoucher | null>(null)
  const [methodPayment, setMethodPayment] = useState<MethodPaymentType>('money')
  const { isShow, toggleModal: onToggleModal } = useModal()

  const totalProductsPrice = useMemo(() => calcTotalPrice(carts, 'price'), [carts])
  const totalPayment = useMemo(
    () => totalProductsPrice + shippingFee - (appliedVoucher?.value || 0) || 0,
    [totalProductsPrice, shippingFee, appliedVoucher?.value]
  )

  const onInputChange = React.useCallback((value: string) => {
    noteRef.current = value
  }, [])

  const onChangeMethod = React.useCallback((value: MethodPaymentType) => {
    setMethodPayment(value)
  }, [])

  const handleCheckout = () => {
    const orderItems = carts.map((cart) => ({
      quantity: Number(cart.quantity),
      product: cart.product._id,
      oldPrice: Number(cart.product.oldPrice),
      price: Number(cart.product.price),
      shop: {
        _id: cart.product.shop?._id,
        address: cart.product.shop?.address
      }
    }))
    const values = {
      orderItems,
      shippingTo: currentUser?.address || 'Unknown Location',
      price: totalProductsPrice,
      note: noteRef.current,
      shippingFee,
      promotion: appliedVoucher?.value || 0,
      total: totalPayment,
      voucherCode: appliedVoucher?.code,
      methodPayment
    }

    handlerCheckout && handlerCheckout(values)
  }

  const onChangeAppliedVoucher = React.useCallback(
    (newAppliedVoucher: IVoucher) => {
      const isAlreadyVoucher = appliedVoucher?._id === newAppliedVoucher?._id
      if (isAlreadyVoucher) {
        setAppliedVoucher(null)
      } else {
        setAppliedVoucher(newAppliedVoucher)
      }
    },
    [appliedVoucher, setAppliedVoucher]
  )

  const renderProductPriceSale = () => {
    return (
      <div className='flex flex-col justify-end gap-x-4 gap-y-1 border border-dotted border-black017 bg-[#fafdff] px-4 py-6 md:flex-row md:items-center'>
        <span>Tổng số tiền ({carts.length} sản phẩm):</span>
        <ProductPriceSale className='text-lg font-medium'>{totalProductsPrice}</ProductPriceSale>
      </div>
    )
  }

  const renderMethodPayment = () => {
    if (methodPayment === 'money') {
      return (
        <div className='flex items-center gap-x-4 border border-dotted border-black017 bg-[#fff] p-4'>
          <div>
            <p>Thanh toán khi nhận hàng</p>
            <p>Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.</p>
          </div>
        </div>
      )
    }

    return (
      <div className='flex items-center gap-x-4 border border-dotted border-black017 bg-[#fff] p-4'>
        <div className='flex flex-col gap-x-4 gap-y-2 lg:flex-row lg:items-center'>
          <div className='w-14 rounded-sm border border-[#00000024]'>
            <img alt='visa' className='mx-auto h-8 w-11' src={Visa} />
          </div>
          <span>Họ tên: {currentUser?.creditCard.name}</span>
          <span>Số thẻ: {currentUser?.creditCard.number}</span>
          <span>Hết hạn: {currentUser?.creditCard.expiry}</span>
        </div>
      </div>
    )
  }

  const renderSubmitButton = () => {
    return (
      <div className='flex flex-wrap-reverse justify-end gap-y-3 border border-dotted border-[rgba(0,0,0,.09)] bg-[#fffcf5] px-4 py-6 lg:items-center lg:justify-between'>
        <span className='maxsm:hidden'>Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopbee</span>
        <Button primary onClick={handleCheckout} className='py-3 px-14 text-base'>
          Đặt hàng
        </Button>
      </div>
    )
  }

  return (
    <>
      <main className='layout-container pt-6 pb-10'>
        <div className='gradient-line mt-3' />
        <CheckoutUserInfo currentUser={currentUser} />
        <CheckoutCarts carts={carts} />
        <CheckoutForm onInputChange={onInputChange} shippingFee={shippingFee} />
        {renderProductPriceSale()}
        <CheckoutVoucher voucherCode={appliedVoucher?.code} onToggleModal={onToggleModal} />
        <CheckoutActions methodPayment={methodPayment} onChangeMethod={onChangeMethod} />
        {renderMethodPayment()}
        <OrderPayment
          totalProductsPrice={totalProductsPrice}
          shippingFee={carts.length > 0 ? shippingFee : 0}
          promotion={appliedVoucher?.value || 0}
          totalPayment={carts.length > 0 ? totalPayment : 0}
        />
        {renderSubmitButton()}
      </main>
      <ModalApplyVoucher
        isShow={isShow}
        appliedVoucher={appliedVoucher}
        closeModal={onToggleModal}
        onChangeAppliedVoucher={onChangeAppliedVoucher}
      />
    </>
  )
}

export default CheckoutMain
