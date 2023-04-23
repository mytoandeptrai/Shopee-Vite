import React, { memo } from 'react'
import classNames from '~/utils/classNames'
import { stylesImage } from './VoucherDetail.config'
import voucherShope from '~/assets/images/voucher-shopbee.png'
import { formatDateVNFull } from '~/utils'

type Props = {
  code: string
  title: string
  isFreeship: boolean
  expirationDate: number
  active?: boolean
  className?: string
  children?: React.ReactNode
}

const VoucherDetail = ({ active, code, expirationDate, isFreeship, title, className = '', children }: Props) => {
  const styleBackgroundFreeShip = active ? 'bg-[#00bfa5]' : 'bg-[#bdbdbd]'
  const styleBackgroundShope = active ? 'bg-orangeCustomize' : 'bg-[#bdbdbd]'

  const activeContent = React.useMemo(() => {
    if (!active || new Date(expirationDate).getTime() < new Date().getTime()) {
      return 'opacity-50'
    }
    return ''
  }, [active, expirationDate])

  const classes = classNames(
    'flex items-center overflow-hidden bg-white rounded-md gap-x-2 md:gap-x-5 shadowCustomize',
    !activeContent ? 'cursor-pointer' : 'none',
    className
  )

  const classesContent = classNames('flex flex-1 flex-col justify-center text-xs md:text-sm', activeContent)

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

  return (
    <div className={classes}>
      {renderContentFreeShip()}
      <div className={classesContent}>
        <h3 className='md:text-base'>{title}</h3>
        <span>Code: {code}</span>
        {!Number.isNaN(expirationDate) && <span>HSD: {formatDateVNFull(expirationDate)}</span>}
      </div>
      {children && children}
    </div>
  )
}

export default memo(VoucherDetail)
