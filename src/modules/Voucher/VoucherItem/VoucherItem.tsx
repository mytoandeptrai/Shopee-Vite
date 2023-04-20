import React from 'react'
import { IVoucher } from '~/types'
import voucherShope from '~/assets/images/voucher-shopbee.png'
import { formatDateVNFull } from '~/utils'

type Props = {
  voucher: IVoucher
  appliedVoucher: IVoucher | null
  onChangeAppliedVoucher: (voucher: IVoucher) => void
}

const VoucherItem = ({ voucher, appliedVoucher, onChangeAppliedVoucher }: Props) => {
  const renderVoucherFreeShip = () => {
    if (voucher.isFreeship) {
      return (
        <div className='flex h-20 w-20 flex-col items-center justify-center bg-[#00bfa5] sm:h-28 sm:w-28'>
          <span className='text-center font-medium text-white'>MIỄN PHÍ VẬN CHUYỂN</span>
        </div>
      )
    }

    return (
      <div className='flex h-20 w-20 flex-col items-center justify-center bg-orangeCustomize sm:h-28 sm:w-28'>
        <img className='h-3/5 w-3/5' alt={voucher.title} src={voucherShope} />
        <span className='text-white'>Shopbee</span>
      </div>
    )
  }

  const renderVoucherInfo = () => {
    return (
      <>
        <div className='flex flex-1 flex-col justify-center text-xs md:text-sm'>
          <h3 className='line-clamp-1 text-sm md:text-base'>{voucher.title}</h3>
          <span>Code: {voucher.code}</span>
          <span>HSD: {formatDateVNFull(voucher.expirationDate)}</span>
        </div>
        <div className='pr-2 md:pr-4'>
          <input
            type='checkbox'
            value={voucher.code}
            className='h-5 w-5'
            onChange={() => onChangeAppliedVoucher(voucher)}
            checked={voucher.code === appliedVoucher?.code}
          />
        </div>
      </>
    )
  }

  return (
    <div className='shadowCustomize mx-[2px] my-4 flex items-center gap-x-2 overflow-hidden rounded-md md:gap-x-5'>
      {renderVoucherFreeShip()}
      {renderVoucherInfo()}
    </div>
  )
}

export default VoucherItem
