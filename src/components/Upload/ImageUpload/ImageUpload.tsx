import React from 'react'
import classNames from '~/utils/classNames'
import uploadImagePic from '~/assets/images/upload-image.png'

interface ImageUploadProps {
  onChange: (image: File) => void
  previewImage: string | File | null
  className?: string
}

const ImageUpload = ({ onChange, previewImage, className = '' }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return
    }
    const files = e.target.files[0]
    onChange && onChange(files)
  }

  const imageSrc = React.useMemo(() => {
    if (previewImage) {
      const image = typeof previewImage === 'string' ? previewImage : URL.createObjectURL(previewImage)
      return image
    }
    return null
  }, [previewImage])

  return (
    <div
      className={classNames(
        'relative aspect-square w-[202px] overflow-hidden rounded-lg border border-dotted border-[#00000024] object-cover p-4',
        className
      )}
    >
      {imageSrc && <img src={imageSrc} alt='preview' className='absolute inset-0 bg-white' />}
      <input
        name='image'
        type='file'
        onChange={handleImageChange}
        className='absolute z-10 h-full w-full cursor-pointer opacity-0'
      />
      <div className='flex h-full flex-col items-center justify-center gap-y-2'>
        <img alt='upload' src={uploadImagePic} className='mx-auto aspect-square w-3/5 max-w-[80px]' />
        <span className='whitespace-pre font-medium'>Chọn ảnh</span>
      </div>
    </div>
  )
}

export default ImageUpload
