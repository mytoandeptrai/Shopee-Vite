import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userAPI } from '~/api'
import { SIZE_CONSTANT } from '~/constants'
import { CommonLayout } from '~/layouts/templates'
import { ProfileForm } from '~/modules/Profile'
import { UserUploadAvatar } from '~/modules/User'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'
import { IPayloadUpdateMe } from '~/types'

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useStore((state) => state)
  const [errorResponse, setErrorResponse] = React.useState(null)
  const [avatarUser, setAvatarUser] = React.useState<any>(() => currentUser?.avatar)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!currentUser) {
      navigate(`/${routeConfig.HomePage}`)
    }
  }, [currentUser, navigate])

  const updateMeMutation = useMutation({
    mutationFn: (payload: Omit<IPayloadUpdateMe, 'password'>) => userAPI.updateMe(payload)
  })

  const updateAvatarMutation = useMutation({
    mutationFn: (payload: any) => userAPI.updateAvatar(payload)
  })

  const handleUpdateUserInfo = React.useCallback(
    (userInfo: IPayloadUpdateMe) => {
      updateMeMutation.mutate(userInfo, {
        onSuccess: ({ message, data }) => {
          toast.success(message)
          setCurrentUser({ ...currentUser, ...data })
        },
        onError(error: any) {
          toast.error(error?.message)
          setErrorResponse(error.error)
        }
      })
    },
    [currentUser, setCurrentUser, updateMeMutation]
  )

  const handleChangeAvatar = React.useCallback(
    (selectorFiles: React.ChangeEvent<HTMLInputElement>) => {
      const files = selectorFiles.target.files
      if (files && files[0]) {
        if (files[0]?.size > SIZE_CONSTANT.SIZE_IMAGE_5MB) {
          toast.error('Vui long chon size nho hon 5MB')
          return
        }

        const formData = new FormData()
        formData.append('avatar', files[0])

        updateAvatarMutation.mutate(formData, {
          onSuccess: () => {
            setAvatarUser(files[0])
            // console.log('file success')
          },
          onError: () => {
            // console.log('file error')
          }
        })
      }
    },
    [updateAvatarMutation]
  )

  if (!currentUser) {
    return null
  }

  return (
    <CommonLayout title='Hồ sơ của tôi' desc='Quản lý thông tin hồ sơ để bảo mật tài khoản'>
      <Helmet>
        <title>Hồ sơ của tôi</title>
      </Helmet>
      <div className='mt-6 flex flex-col-reverse gap-8 lg:flex-row'>
        <ProfileForm
          handleUpdateUserInfo={handleUpdateUserInfo}
          initialValue={currentUser}
          errorResponse={errorResponse}
        />
        <UserUploadAvatar avatar={avatarUser} onChangeAvatar={handleChangeAvatar} />
      </div>
    </CommonLayout>
  )
}

export default ProfilePage
