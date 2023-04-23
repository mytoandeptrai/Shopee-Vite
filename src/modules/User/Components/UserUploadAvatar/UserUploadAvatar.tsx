import React from 'react'
import { Button } from '~/components/ButtonCustomize'

type Props = {
  avatar: string | File
  onChangeAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UserUploadAvatar = ({ avatar, onChangeAvatar }: Props) => {
  const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE
  const [mediaPrepare, setMediaPrepare] = React.useState('')

  React.useLayoutEffect(() => {
    if (avatar) {
      const mediaAvatar = typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)
      setMediaPrepare(mediaAvatar)
    }
  }, [avatar])

  React.useEffect(() => {
    return () => {
      if (mediaPrepare) URL.revokeObjectURL(mediaPrepare)
    }
  }, [mediaPrepare, setMediaPrepare])

  return (
    <div className='flex flex-col items-center gap-y-4 lg:w-1/3'>
      <img alt='avatar' src={mediaPrepare || defaultImage} className='h-[100px] w-[100px] rounded-full' />
      <div className='relative mx-auto h-10 w-[100px]'>
        <Button className='absolute'>Chọn ảnh</Button>
        <input
          type='file'
          accept='image/*'
          className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'
          onChange={onChangeAvatar}
        />
      </div>
    </div>
  )
}

export default UserUploadAvatar
