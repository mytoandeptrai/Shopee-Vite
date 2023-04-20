import * as Yup from 'yup'

export const signInValidation = Yup.object({
  email: Yup.string()
    .required('Vui lòng nhập email!')
    .email('Email không đúng định dạng!')
    .min(5, 'Độ dài từ 5 - 160 ký tự!')
    .max(160, 'Độ dài từ 5 - 160 ký tự!'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu!')
    .min(6, 'Độ dài từ 6 - 160 ký tự!')
    .max(160, 'Độ dài từ 6 - 160 ký tự!')
})

export const signUpRules = Yup.object({
  email: Yup.string()
    .required('Vui lòng nhập email!')
    .email('Email không đúng định dạng!')
    .min(5, 'Độ dài từ 5 - 160 ký tự!')
    .max(160, 'Độ dài từ 5 - 160 ký tự!'),
  password: Yup.string()
    .required('Vui lòng nhập mật khẩu!')
    .min(6, 'Độ dài từ 6 - 160 ký tự!')
    .max(160, 'Độ dài từ 6 - 160 ký tự!'),
  confirm_password: Yup.string()
    .required('Vui lòng nhập xác nhận mật khẩu!')
    .min(6, 'Độ dài từ 6 - 160 ký tự!')
    .max(160, 'Độ dài từ 6 - 160 ký tự!')
    .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không khớp!')
})

export const priceValidation = Yup.object({
  price_min: Yup.number().min(0).default(0),
  price_max: Yup.number().min(Yup.ref('price_min'), 'Vui lòng điền khoảng giá phù hợp')
})

export const userValidation = Yup.object({
  email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email của bạn!'),
  fullname: Yup.string().required('Vui lòng nhập họ và tên!'),
  phone: Yup.string().required('Vui lòng nhập số điện thoại!').max(160, 'Số điện thoại tối đa là 160 kí tự!'),
  password: Yup.string().required('Vui lòng nhập mật khẩu!').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không khớp!')
    .required('Vui lòng nhập xác nhận mật khẩu!'),
  street: Yup.string().required('Vui lòng nhập địa chỉ cụ thể!'),
  city: Yup.object().shape({
    id: Yup.string().required('Vui lòng chọn Tỉnh/Thành phố!'),
    name: Yup.string().required('Vui lòng chọn Tỉnh/Thành phố!')
  }),
  district: Yup.object().shape({
    id: Yup.string().required('Vui lòng chọn Quận/Huyện!'),
    name: Yup.string().required('Vui lòng chọn Quận/Huyện!')
  }),
  ward: Yup.object().shape({
    id: Yup.string().required('Vui lòng chọn Phường/Xã!'),
    name: Yup.string().required('Vui lòng chọn Phường/Xã!')
  })
})

export const userUpdateValidation = userValidation.pick(['fullname', 'phone', 'street', 'city', 'district', 'ward'])
