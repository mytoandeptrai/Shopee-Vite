import { useFormik } from 'formik'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authAPI } from '~/api'
import { Button } from '~/components/ButtonCustomize'
import { FormError, FormGroup } from '~/components/Form'
import { Input, InputPassword } from '~/components/InputCustomize'
import { Label } from '~/components/Label'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'
import { IPayloadAuth } from '~/types'
import { initialValuesSignInAuth, setCurrentUserLocalStorage, signInValidation } from '~/utils'

const LoginPage = () => {
  const navigate = useNavigate()
  const { setCurrentUser } = useStore((state) => state)

  const signInMutation = useMutation({
    mutationFn: (payload: IPayloadAuth) => authAPI.signIn(payload)
  })

  const formik = useFormik({
    initialValues: initialValuesSignInAuth,
    validationSchema: signInValidation,
    onSubmit: async (values, { setErrors }) => {
      signInMutation.mutate(values, {
        onSuccess({ message, data }) {
          setCurrentUser(data)
          setCurrentUserLocalStorage(data)
          toast.success(message)
          navigate(routeConfig.HomePage)
        },
        onError(error: any) {
          toast.error(error?.message)
          setErrors(error.error)
        }
      })
    }
  })

  const { values, handleChange, touched, errors, handleSubmit } = formik

  return (
    <div className='layout-container'>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className='mx-auto w-full max-w-[500px] rounded bg-white px-4 py-8 lg:p-10'>
        <h1 className='text-[22px]'>Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup className='mt-4'>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' placeholder='Email' value={values.email} onChange={handleChange} />
            <FormError>{touched.email && errors?.email}</FormError>
          </FormGroup>
          <FormGroup className='mt-4'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <InputPassword name='password' placeholder='Mật khẩu' onChange={handleChange} value={values.password} />
            <FormError>{touched.password && errors?.password}</FormError>
          </FormGroup>
          <Button type='submit' primary className='mt-3 w-full'>
            Đăng nhập
          </Button>
        </form>
        <div className='mt-6 text-center'>
          <span className='text-[#00000042]'>Bạn chưa có tài khoản ? </span>
          <Link to={routeConfig.SignUp} className='text-orangeCustomize'>
            Đăng kí
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
