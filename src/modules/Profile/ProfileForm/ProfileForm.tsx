import { useFormik } from 'formik'
import React from 'react'
import { Button } from '~/components/ButtonCustomize'
import { FormError, FormGroup } from '~/components/Form'
import { Input } from '~/components/InputCustomize'
import { Label } from '~/components/Label'
import { ICurrentUser, IPayloadUpdateMe } from '~/types'
import { generateAddress, initialValuesUpdateUser, userUpdateValidation } from '~/utils'
import { ProfileAdministrative } from '../ProfileAdministrative'

type Props = {
  initialValue: ICurrentUser
  handleUpdateUserInfo: (value: IPayloadUpdateMe) => void
  errorResponse?: any
}

const ProfileForm = ({ initialValue, handleUpdateUserInfo, errorResponse = null }: Props) => {
  const formik = useFormik({
    initialValues: initialValuesUpdateUser,
    validationSchema: userUpdateValidation,
    onSubmit: (values) => {
      const address = generateAddress(values)
      const payload = { ...values, address, email: initialValue?.email }
      handleUpdateUserInfo(payload)
    }
  })

  const { values, touched, errors, handleSubmit, handleChange, setErrors } = formik

  const formInputs = React.useMemo(() => {
    return [
      {
        label: 'Họ và tên',
        name: 'fullname',
        value: values.fullname,
        error: touched.fullname && errors?.fullname,
        className: ''
      },
      {
        label: 'Số điện thoại',
        name: 'phone',
        value: values.phone,
        error: touched.phone && errors?.phone,
        className: ''
      },
      {
        label: 'Địa chỉ:',
        name: 'address',
        error: touched.address && errors?.address,
        className: '-mb-[10px]'
      },
      {
        label: 'Địa chỉ nhận hàng cụ thể',
        name: 'street',
        value: values.street,
        error: touched.street && errors?.street,
        className: ''
      }
    ]
  }, [
    errors?.address,
    errors?.fullname,
    errors?.phone,
    errors?.street,
    touched.address,
    touched.fullname,
    touched.phone,
    touched.street,
    values.fullname,
    values.phone,
    values.street
  ])

  React.useEffect(() => {
    if (initialValue) {
      formik.resetForm({ values: initialValue })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  React.useEffect(() => {
    if (errorResponse) {
      setErrors(errorResponse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorResponse])

  return (
    <form className='w-full max-w-[650px]' onSubmit={handleSubmit} autoComplete='off'>
      <FormGroup>
        <Label htmlFor='email'>Email</Label>
        <span>{initialValue?.email}</span>
      </FormGroup>
      {formInputs.map((form) => {
        const formName = form.name
        const formLabel = form.label
        const formClassName = form.className
        const formError = form.error
        const formValue = form.value
        return (
          <FormGroup key={formName} className={formClassName}>
            <Label htmlFor={formName}>{formLabel}</Label>
            {formValue !== undefined ? (
              <Input name={formName} value={formValue} onChange={handleChange} />
            ) : (
              <ProfileAdministrative formik={formik} />
            )}
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

export default React.memo(ProfileForm)
