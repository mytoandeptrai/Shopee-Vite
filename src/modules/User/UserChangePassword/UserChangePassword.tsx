import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { userAPI } from '~/api'
import { CommonLayout } from '~/layouts/templates'
import { UserChangePasswordForm } from '../Components'

interface IPayloadChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const UserChangePassword = () => {
  const [errorResponse, setErrorResponse] = React.useState(null)
  const updatePasswordMutation = useMutation({
    mutationFn: (payload: IPayloadChangePassword) => userAPI.changePasswordMe(payload)
  })

  const handleChangePassword = React.useCallback(
    (payload: IPayloadChangePassword) => {
      updatePasswordMutation.mutate(payload, {
        onSuccess: ({ message }) => {
          toast.success(message)
        },
        onError(error: any) {
          setErrorResponse(error.error)
          toast.error(error?.message)
        }
      })
    },
    [updatePasswordMutation]
  )

  return (
    <CommonLayout title='Đổi Mật Khẩu' desc='Để bảo vệ tài khoản, vui lòng không chia sẻ mật khẩu cho người khác'>
      <Helmet>
        <title>Đổi mật khẩu</title>
      </Helmet>
      <UserChangePasswordForm handleChangePassword={handleChangePassword} errorResponse={errorResponse} />
    </CommonLayout>
  )
}

export default UserChangePassword
