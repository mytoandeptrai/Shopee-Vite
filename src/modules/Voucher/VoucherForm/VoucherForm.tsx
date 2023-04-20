import React from 'react'
import { Input } from '~/components/InputCustomize'
import classNames from '~/utils/classNames'

type Props = {
  handleSubmitForm: (voucher: string) => void
  disabledButton?: boolean
}

const VoucherForm = ({ handleSubmitForm, disabledButton = false }: Props) => {
  const [voucherCode, setVoucherCode] = React.useState('')

  const handleSaveVoucher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (voucherCode) handleSubmitForm(voucherCode)
  }

  React.useEffect(() => {
    return () => {
      setVoucherCode('')
    }
  }, [])

  return (
    <div className='bg-[#00000008] py-7 maxsm:p-0'>
      <form
        autoComplete='off'
        onSubmit={handleSaveVoucher}
        className='mx-auto flex max-w-[620px] items-center md:gap-3'
      >
        <span className='hidden md:block'>Mã Voucher</span>
        <Input
          value={voucherCode}
          className='!h-11 flex-1 maxsm:w-[160px]'
          placeholder='Nhập mã voucher tại đây'
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button
          disabled={disabledButton}
          type='submit'
          className={classNames(
            'h-11 w-16 flex-shrink-0  rounded-sm text-white sm:w-20',
            voucherCode ? 'bg-orangeCustomize' : 'bg-[#0000001a]'
          )}
        >
          Lưu
        </button>
      </form>
    </div>
  )
}

export default VoucherForm
