import React from 'react'
import { ButtonOutline } from '~/components/ButtonCustomize'
import { MethodPaymentType } from '../CheckoutMain'

type Props = {
  methodPayment: string
  disabled?: boolean
  onChangeMethod: (method: MethodPaymentType) => void
}

const CheckoutActions = ({ methodPayment, disabled = false, onChangeMethod }: Props) => {
  return (
    <div className='section-dotted mt-3 flex flex-col gap-x-4 gap-y-2 lg:flex-row lg:items-center'>
      <h3 className='text-base font-medium'>Phương thức thanh toán</h3>
      <ButtonOutline
        disabled={disabled}
        primary={methodPayment === 'credit-card'}
        onClick={() => onChangeMethod('credit-card')}
      >
        Thẻ Tín Dụng/Ghi Nợ
      </ButtonOutline>
      <ButtonOutline primary={methodPayment === 'money'} onClick={() => onChangeMethod('money')}>
        Thanh toán khi nhận hàng
      </ButtonOutline>
    </div>
  )
}

export default CheckoutActions
