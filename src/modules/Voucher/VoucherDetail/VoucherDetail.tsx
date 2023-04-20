import React from 'react'
import classNames from '~/utils/classNames'
import { stylesImage } from './VoucherDetail.config'
import voucherShope from '~/assets/images/voucher-shopbee.png'

type Props = {
  code: string
  title: string
  isFreeship: boolean
  expirationDate: number
  active?: boolean
  className?: string
}

const VoucherDetail = ({ active, code, expirationDate, isFreeship, title, className = '' }: Props) => {
  const styleBackgroundFreeShip = active ? 'bg-[#00bfa5]' : 'bg-[#bdbdbd]'
  const styleBackgroundShope = active ? 'bg-orangeCustomize' : 'bg-[#bdbdbd]'

  const classes = classNames(
    'flex items-center overflow-hidden bg-white rounded-md gap-x-2 md:gap-x-5 shadowCustomize',
    className
  )

  const renderContentFreeShip = () => {
    if (isFreeship) {
      return (
        <div className={classNames(stylesImage, styleBackgroundFreeShip)}>
          <span className='text-center font-medium text-white'>MIỄN PHÍ VẬN CHUYỂN</span>
        </div>
      )
    }

    return (
      <div className={classNames(stylesImage, styleBackgroundShope)}>
        <img src={voucherShope} className='h-3/5 w-3/5' alt={title} />
        <span className='text-white'>Shopee</span>
      </div>
    )
  }

  return <div className={classes}>{renderContentFreeShip()}</div>
}

export default VoucherDetail
