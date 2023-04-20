import React from 'react'
import { Input } from '~/components/InputCustomize'
import { formatDateVN, formatMoney } from '~/utils'

type Props = {
  shippingFee: number
  onInputChange: (value: string) => void
}

const CheckoutForm = ({ shippingFee, onInputChange }: Props) => {
  const [note, setNote] = React.useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNote(e.target.value)
    onInputChange(value)
  }

  return (
    <div className='flex flex-col justify-between gap-x-8 gap-y-4 border border-dotted border-[rgba(0,0,0,.09)] bg-[#fafdff] px-4 py-6 md:flex-row'>
      <div className='flex flex-1 flex-col gap-x-3 gap-y-2 md:flex-row md:items-center'>
        <span>Lời nhắn: </span>
        <Input value={note} className='md:flex-1' placeholder='Lưu ý cho người bán' onChange={handleInputChange} />
      </div>
      <div className='flex flex-col gap-x-4 md:flex-row'>
        <span className='text-greenCustomize'>Đơn vị vận chuyển:</span>
        <div>
          <h4>Nhanh</h4>
          <p>
            Nhận hàng vào {formatDateVN(Date.now() + 3600 * 1000 * 48)} - {formatDateVN(Date.now() + 3600 * 1000 * 96)}
          </p>
          <p>(Nhanh tay vào ngay &quot;Shopbee Voucher&quot; để săn mã Miễn phí vận chuyển nhé!)</p>
        </div>
        <span className='text-base'>{formatMoney(shippingFee)}</span>
      </div>
    </div>
  )
}

export default CheckoutForm
