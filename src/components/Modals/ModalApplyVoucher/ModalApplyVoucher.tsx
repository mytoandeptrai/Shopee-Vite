import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { voucherAPI } from '~/api'
import { STALE_TIME_CONSTANT } from '~/constants'
import { useStore } from '~/store/globalStore'
import { IVoucher } from '~/types'
import Modal from 'react-modal'
import { Input } from '~/components/InputCustomize'
import { Button } from '~/components/ButtonCustomize'
import { VoucherItem } from '~/modules/Voucher'
import { toast } from 'react-toastify'

type Props = {
  isShow: boolean
  appliedVoucher: IVoucher | null
  closeModal: () => void
  onChangeAppliedVoucher: (voucher: IVoucher) => void
}

const ModalApplyVoucher = ({ isShow, closeModal, appliedVoucher, onChangeAppliedVoucher }: Props) => {
  const { currentUser } = useStore((state) => state)
  const [voucherCode, setVoucherCode] = useState<string>('')

  const saveVoucherMutation = useMutation({
    mutationFn: (code: string) => voucherAPI.saveVoucher(code),
    onSuccess: ({ message }) => {
      toast.success(message)
    },
    onError(error: any) {
      toast.error(error?.message)
    }
  })

  const { data: myVouchersData } = useQuery({
    queryKey: ['myVouchers'],
    queryFn: () => voucherAPI.getMyVoucher(),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    enabled: isShow
  })

  const handleSaveVoucher = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!voucherCode) return
      if (!currentUser || !currentUser._id) {
        toast.error('Vui lòng đăng nhập để lưu voucher')
        return
      }
      saveVoucherMutation.mutate(voucherCode)
    },
    [currentUser, saveVoucherMutation, voucherCode]
  )

  const renderVoucherData = () => {
    if (!myVouchersData || myVouchersData.data.length === 0) {
      return <div>Empty Voucher</div>
    }

    return (
      <>
        {myVouchersData.data.map((voucher) => (
          <VoucherItem
            key={voucher._id}
            voucher={voucher}
            appliedVoucher={appliedVoucher}
            onChangeAppliedVoucher={onChangeAppliedVoucher}
          />
        ))}
      </>
    )
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isShow}
      onRequestClose={closeModal}
      contentLabel='Áp dụng voucher'
      className='modalCustomize'
      style={{ overlay: { backgroundColor: '#2424247f', zIndex: '1000' } }}
    >
      <h2 className='text-xl font-medium'>Chọn Voucher</h2>
      <div className='section-gray mt-4 maxsm:p-0'>
        <form autoComplete='off' onSubmit={handleSaveVoucher} className='flex items-center md:gap-2'>
          <span className='hidden md:block'>Mã Voucher</span>
          <Input
            required
            value={voucherCode}
            className='flex-1 maxsm:w-[160px]'
            placeholder='Mã Voucher...'
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <Button type='submit' className='flex-shrink-0'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='max-h-72 overflow-y-auto'>{renderVoucherData()}</div>
      <div className='mt-4 flex justify-end gap-x-2'>
        <Button className='w-[140px]' onClick={closeModal}>
          Trở lại
        </Button>
        <Button primary onClick={closeModal} className='w-[140px]'>
          OK
        </Button>
      </div>
    </Modal>
  )
}

export default ModalApplyVoucher
