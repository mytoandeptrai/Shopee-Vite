import React from 'react'
import { IVoucher } from '~/types'
import { VoucherDetail } from '../VoucherDetail'
import { Button } from '~/components/ButtonCustomize'

type Props = {
  voucherList: IVoucher[]
  active?: boolean
  isDiscoverVoucherPage?: boolean
  handleSubmitVoucher?: (code: string) => void
  currentUserId?: string
}

const VoucherList = ({
  voucherList,
  active = true,
  isDiscoverVoucherPage = false,
  handleSubmitVoucher = () => {
    return
  },
  currentUserId = ''
}: Props) => {
  const handleSaveVoucher = React.useCallback(
    (code: string) => {
      if (code && handleSubmitVoucher) {
        handleSubmitVoucher(code)
      }
    },
    [handleSubmitVoucher]
  )

  const renderButtonOnDiscoverPage = (voucher: IVoucher) => {
    if (!isDiscoverVoucherPage) return null

    if (voucher.usersSave?.includes(currentUserId as string)) {
      return (
        <Button
          primary
          disabled
          className='mr-2 bg-black017 hover:bg-black017'
          onClick={() => handleSaveVoucher(voucher.code)}
        >
          Đã lưu
        </Button>
      )
    }

    return (
      <Button primary className='mr-2' onClick={() => handleSaveVoucher(voucher.code)}>
        Lưu
      </Button>
    )
  }

  return (
    <div className='mt-5 grid gap-4 md:grid-cols-2'>
      {voucherList?.map((voucher) => {
        const { _id, code, title, isFreeship, expirationDate } = voucher
        return (
          <VoucherDetail
            key={_id}
            code={code}
            title={title}
            isFreeship={isFreeship}
            expirationDate={expirationDate}
            active={active}
          >
            {renderButtonOnDiscoverPage(voucher)}
          </VoucherDetail>
        )
      })}
    </div>
  )
}

export default VoucherList
