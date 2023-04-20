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
const VoucherWalletPage = lazy(() => import('~/pages/VoucherWalletPage'))

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
  VoucherWalletPage
}

export { publicRoutes, privateLoggedInRoutes, privateRoutes }
