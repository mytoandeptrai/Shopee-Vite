import React from 'react'
import Modal from 'react-modal'
import { Button } from '~/components/ButtonCustomize'
import { InputTextArea } from '~/components/InputCustomize'
import { SelectStar } from '~/modules/Shared'
import { IProduct } from '~/types'
type Props = {
  isOpenModal: boolean
  onRequestClose: () => void
  onSubmitAddHandler: (comment: string, rating: number, productId: string) => void
  productReview: IProduct
}

const ModalAddNewReview = ({ isOpenModal, onRequestClose, onSubmitAddHandler, productReview }: Props) => {
  const { name, image, _id: productId } = productReview
  const [commentValue, setCommentValue] = React.useState<string>('')
  const [rating, setRating] = React.useState(1)

  const handleCancelModal = React.useCallback(() => {
    onRequestClose()
    setCommentValue('')
  }, [onRequestClose])

  const handleConfirmModal = React.useCallback(() => {
    onSubmitAddHandler(commentValue, rating, productId)
  }, [commentValue, onSubmitAddHandler, productId, rating])

  const disabledButton = React.useMemo(() => {
    if (commentValue === '') {
      return true
    }

    if (rating === 1) {
      return true
    }

    return false
  }, [commentValue, rating])

  React.useEffect(() => {
    if (!isOpenModal) {
      setCommentValue('')
      setRating(1)
    }
  }, [isOpenModal])

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onRequestClose}
      contentLabel='Thêm bình luận mới'
      className='modalCustomize'
      style={{ overlay: { backgroundColor: '#2424247f', zIndex: '1000' } }}
      ariaHideApp={false}
    >
      <div className='flex gap-x-2'>
        <img alt={name} src={image} className='h-10 w-10' />
        <h3 className='product-title font-medium'>{name}</h3>
      </div>
      <div className='my-3'>
        <h2 className='text-center text-lg font-semibold'>Vui lòng đánh giá</h2>
        <SelectStar rating={rating} setRating={setRating} />
        <InputTextArea
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          placeholder='Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé.'
        />
      </div>
      <div className='flex gap-x-2'>
        <Button className='w-full' onClick={handleCancelModal}>
          Hủy
        </Button>
        <Button primary className='w-full' onClick={handleConfirmModal} disabled={disabledButton}>
          Gửi đánh giá
        </Button>
      </div>
    </Modal>
  )
}

export default ModalAddNewReview
