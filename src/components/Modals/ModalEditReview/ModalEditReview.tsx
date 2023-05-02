import React from 'react'
import Modal from 'react-modal'
import { Button } from '~/components/ButtonCustomize'
import { Image } from '~/components/Image'
import { InputTextArea } from '~/components/InputCustomize'
import { SelectStar } from '~/modules/Shared'
import { IReview } from '~/types'
type Props = {
  isOpenModal: boolean
  onRequestClose: () => void
  onSubmitEditHandler: (comment: string, rating: number, reviewId: string) => void
  dataReview: IReview
}

const ModalEditReview = ({ isOpenModal, dataReview, onRequestClose, onSubmitEditHandler }: Props) => {
  const { name, image } = dataReview.productId
  const { comment, rating: dataRating, _id: reviewId } = dataReview
  const [commentValue, setCommentValue] = React.useState<string>(comment)
  const [rating, setRating] = React.useState(dataRating)

  const handleCancelModal = React.useCallback(() => {
    onRequestClose()
    setCommentValue(comment)
    setRating(dataRating)
  }, [comment, dataRating, onRequestClose])

  const handleConfirmModal = React.useCallback(() => {
    onSubmitEditHandler(commentValue, rating, reviewId)
  }, [commentValue, onSubmitEditHandler, rating, reviewId])

  const disabledButton = React.useMemo(() => {
    if (commentValue === '') {
      return true
    }

    if (rating === 1 || rating === 0) {
      return true
    }

    return false
  }, [commentValue, rating])

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onRequestClose}
      contentLabel='Chỉnh sửa nhận xét'
      className='modalCustomize'
      style={{ overlay: { backgroundColor: '#2424247f', zIndex: '1000' } }}
      ariaHideApp={false}
    >
      <div className='flex gap-x-2'>
        <Image alt={name} src={image} className='h-10 w-10' />
        <div>
          <h3 className='product-title line-clamp-1'>{name}</h3>
          <span>Shopbee</span>
        </div>
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

export default ModalEditReview
