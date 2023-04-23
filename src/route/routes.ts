import { lazy } from 'react'

/** Pages */
const HomePage = lazy(() => import('~/pages/HomePage'))
const ProductDetailPage = lazy(() => import('~/pages/ProductDetailPage'))
const SearchPage = lazy(() => import('~/pages/SearchPage'))
const LoginPage = lazy(() => import('~/pages/LoginPage'))
const RegisterPage = lazy(() => import('~/pages/RegisterPage'))
const CartPage = lazy(() => import('~/pages/CartPage'))
const CheckOutPage = lazy(() => import('~/pages/CheckOutPage'))
const ProfilePage = lazy(() => import('~/pages/ProfilePage'))
const VoucherDiscoverPage = lazy(() => import('~/pages/VoucherDiscoverPage'))

/** Modules */
const UserChangePassword = lazy(() => import('~/modules/User/UserChangePassword'))
const UserWallet = lazy(() => import('~/modules/User/UserWallet'))
const UserOrder = lazy(() => import('~/modules/User/UserOrder'))

const publicRoutes = {
  HomePage,
  ProductDetailPage,
  SearchPage,
  CartPage,
  VoucherDiscoverPage
}

const privateLoggedInRoutes = {
  LoginPage,
  RegisterPage
}

const privateRoutes = {
  CheckOutPage,
  ProfilePage,
  UserChangePassword,
  UserWallet,
  UserOrder
}

export { publicRoutes, privateLoggedInRoutes, privateRoutes }
