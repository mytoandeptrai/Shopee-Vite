export const initialValuesSignInAuth = {
  email: '',
  password: ''
}

export const initialValuesPrice = {
  price_min: '',
  price_max: ''
}

export const initialValuesUpdateUser = {
  fullname: '',
  phone: '',
  email: '',
  avatar: '',
  street: '',
  city: { id: '', name: '' },
  district: { id: '', name: '' },
  ward: { id: '', name: '' },
  address: '',
  role: 'User'
}

export const initialValuesPasswords = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

export const initialValuesProduct = {
  name: '',
  image: '',
  images: [],
  description: '',
  category: '',
  oldPrice: 0,
  price: 0,
  rating: 0,
  stock: 0,
  sold: 0,
  view: Math.floor(Math.random() * (10000 - 0 + 1)) + 0
}
