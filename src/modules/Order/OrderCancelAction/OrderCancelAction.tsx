import React, { useRef } from 'react'
import Modal from 'react-modal'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { orderAPI } from '~/api'
import { Button } from '~/components/ButtonCustomize'
import { InputTextArea } from '~/components/InputCustomize'
import useModal from '~/hooks/useModal'
import { EnumOrderStatus, IPayloadCancelOrder } from '~/types'

type Props = {
  status: EnumOrderStatus
  refetch: () => void
}

type IPayloadCancelMutation = {
  id: string
  payload: IPayloadCancelOrder
}

const OrderCancelAction = ({ status, refetch }: Props) => {
  const { id = '' } = useParams()
  const { isShow, toggleModal } = useModal()
  const [reasonCancel, setReasonCancel] = React.useState('')

  const cancelOrderMutation = useMutation({
    mutationFn: ({ id, payload }: IPayloadCancelMutation) => orderAPI.cancelOrder(id, payload),
    onSuccess({ message }) {
      setReasonCancel('')
      toast.success(message)
      toggleModal()
      refetch()
    },
    onError(error: any) {
      toast.error(error?.message)
    }
  })
  const handleCancelOrder = () => {
    if (reasonCancel === '') {
      toast.error('Vui lòng nhập lí do hủy đơn hàng')
      return
    }
    const payload = {
      id,
      payload: { reasonCancel }
    }
    cancelOrderMutation.mutate(payload)
  }

  const renderCancelButton = () => {
    if (status !== EnumOrderStatus.delivered && status !== EnumOrderStatus.canceled) {
      return (
        <Button primary onClick={toggleModal}>
          Hủy đơn hàng
        </Button>
      )
    }

    return null
  }

  return (
    <div className='shadowCustomize_deeper -mx-[1px] flex flex-col gap-y-3 border border-dotted border-black017 bg-[#fafdff] p-4 md:flex-row md:justify-between'>
      <span className='text-xs leading-10 text-[#0000008a] md:text-base'>Cảm ơn bạn đã mua sắm tại Shope!</span>
      {renderCancelButton()}
      <Modal
        isOpen={isShow}
        onRequestClose={toggleModal}
        contentLabel='Hủy đơn hàng'
        className='modalCustomize'
        style={{ overlay: { backgroundColor: '#2424247f', zIndex: '1000' } }}
      >
        <div>
          <h2 className='mt-4 text-center text-lg font-semibold'>Vui lòng cho Shopbee biết lý do bạn hủy đơn</h2>
          <InputTextArea
            value={reasonCancel}
            onChange={(e) => setReasonCancel(e.target.value)}
            placeholder='Hãy chia sẻ lý do bạn muốn hủy đơn hàng này nhé.'
          />
        </div>
        <div className='mt-4 flex gap-x-2'>
          <Button
            className='w-full'
            onClick={() => {
              toggleModal()
            }}
          >
            Trở về
          </Button>
          <Button primary className='w-full' onClick={handleCancelOrder} disabled={reasonCancel === ''}>
            Hủy đơn hàng
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default OrderCancelAction
