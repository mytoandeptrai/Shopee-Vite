import { useFormik } from 'formik'
import React from 'react'
import { Button } from '~/components/ButtonCustomize'
import { FormError, FormGroup } from '~/components/Form'
import { InputPassword } from '~/components/InputCustomize'
import { Label } from '~/components/Label'
import { initialValuesPasswords, updatePasswordValidation } from '~/utils'

interface IPayloadChangePassword {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type Props = {
  handleChangePassword: (password: IPayloadChangePassword) => void
  errorResponse?: any
}

const UserChangePasswordForm = ({ handleChangePassword, errorResponse }: Props) => {
  const formik = useFormik({
    initialValues: initialValuesPasswords,
    validationSchema: updatePasswordValidation,
    onSubmit: (values: IPayloadChangePassword) => {
      handleChangePassword(values)
    }
  })

  const { values, touched, errors, handleSubmit, handleChange, setErrors } = formik

  const formInputs = React.useMemo(() => {
    return [
      {
        label: 'Mật khẩu hiện tại',
        name: 'currentPassword',
        value: values.currentPassword,
        error: touched.currentPassword && errors?.currentPassword,
        className: ''
      },
      {
        label: 'Mật Khẩu Mới',
        name: 'newPassword',
        value: values.newPassword,
        error: touched.newPassword && errors?.newPassword,
        className: ''
      },
      {
        label: 'Xác Nhận Mật Khẩu',
        name: 'confirmPassword',
        value: values.confirmPassword,
        error: touched.confirmPassword && errors?.confirmPassword,
        className: ''
      }
    ]
  }, [
    errors?.confirmPassword,
    errors?.currentPassword,
    errors?.newPassword,
    touched.confirmPassword,
    touched.currentPassword,
    touched.newPassword,
    values.confirmPassword,
    values.currentPassword,
    values.newPassword
  ])

  React.useEffect(() => {
    if (errorResponse) {
      setErrors(errorResponse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorResponse])

  return (
    <form autoComplete='off' className='mt-4 max-w-[470px] md:w-full' onSubmit={handleSubmit}>
      {formInputs.map((form) => {
        const formName = form.name
        const formLabel = form.label
        const formClassName = form.className
        const formError = form.error
        const formValue = form.value
        return (
          <FormGroup key={formName} className={formClassName}>
            <Label htmlFor={formName}>{formLabel}</Label>
            <InputPassword name={formName} value={formValue} onChange={handleChange} />
            <FormError>{formError}</FormError>
          </FormGroup>
        )
      })}
      <Button type='submit' primary className='h-10 w-full'>
        Lưu
      </Button>
    </form>
  )
}

export default UserChangePasswordForm
