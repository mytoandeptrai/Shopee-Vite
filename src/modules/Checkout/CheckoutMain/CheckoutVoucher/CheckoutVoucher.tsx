import React from 'react'

type Props = {
  voucherCode: any
  onToggleModal?: () => void
}

const CheckoutVoucher = ({
  voucherCode,
  onToggleModal = () => {
    return
  }
}: Props) => {
  return (
    <div className='section-dotted flex items-center justify-between'>
      <h3>Voucher Shopbee</h3>
      <div className='flex gap-x-5'>
        {voucherCode && <span className='text-[#23c27f]'>Đã chọn 1 mã giảm giá: {voucherCode}</span>}
        <button type='button' className='text-[15px] text-[#05a]' onClick={onToggleModal}>
          Chọn Voucher
        </button>
      </div>
    </div>
  )
}

export default CheckoutVoucher
