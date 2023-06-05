import React from 'react'
import { Button } from '~/components/ButtonCustomize'
import ButtonDelete from '~/components/ButtonCustomize/ButtonDelete/ButtonDelete'
import { FormError, FormGroup } from '~/components/Form'
import { Label } from '~/components/Label'
import { ImageUpload } from '~/components/Upload'

type Props = {
  handleUploadForm: (value: any) => void
  onEdit?: boolean
  initialImages?: string[]
}

const initialFormImages = [null, null, null, null, null]

const ProductUploadImages = ({ handleUploadForm, onEdit = false, initialImages = [] }: Props) => {
  const [images, setImages] = React.useState<any[]>(initialFormImages)

  React.useEffect(() => {
    if (onEdit) {
      setImages(initialImages)
    }
  }, [initialImages, onEdit])

  const handleImageChange = (image: File, index: number) => {
    setImages((previousImages) => {
      const newValue = [...previousImages]
      newValue[index] = image
      return newValue
    })
  }

  const handleDeleteImage = (index: number) => {
    const currentImages = [...images]
    currentImages.splice(index, 1, null)
    setImages(currentImages)
  }

  return (
    <FormGroup>
      <Label htmlFor='image'>Chọn ảnh sản phẩm</Label>
      <div className='flex flex-wrap gap-3'>
        {[0, 1, 2, 3, 4].map((index) => (
          <div className='relative' key={index}>
            <ImageUpload
              className='!w-24'
              onChange={(image: File) => handleImageChange(image, index)}
              previewImage={images[index]}
            />
            {images[index] && <ButtonDelete className='!h-5 !w-5' onClick={() => handleDeleteImage(index)} />}
          </div>
        ))}
      </div>
      <FormError></FormError>
    </FormGroup>
  )
}

export default React.memo(ProductUploadImages)
