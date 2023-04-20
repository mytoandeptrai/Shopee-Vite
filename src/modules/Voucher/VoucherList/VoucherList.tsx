import React from 'react'
import { IVoucher } from '~/types'
import { VoucherDetail } from '../VoucherDetail'

type Props = {
  voucherList: IVoucher[]
  active?: boolean
}

const VoucherList = ({ voucherList, active = true }: Props) => {
  return (
    <div className='mt-5 grid gap-4 md:grid-cols-2'>
      {voucherList.map(({ _id, code, title, isFreeship, expirationDate }) => (
        <VoucherDetail
          key={_id}
          code={code}
          title={title}
          isFreeship={isFreeship}
          expirationDate={expirationDate}
          active={active}
        />
      ))}
    </div>
  )
}

export default VoucherList
