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
const DashboardPage = lazy(() => import('~/pages/DashboardPage'))

/** Modules */
const UserChangePassword = lazy(() => import('~/modules/User/UserChangePassword'))
const UserWallet = lazy(() => import('~/modules/User/UserWallet'))
const UserOrder = lazy(() => import('~/modules/User/UserOrder'))
const UserOrderDetail = lazy(() => import('~/modules/User/UserOrderDetail'))
const UserHistory = lazy(() => import('~/modules/User/UserHistory'))
const UserWishList = lazy(() => import('~/modules/User/UserWishList'))
const ProductManage = lazy(() => import('~/modules/Product/Admin/ProductManage'))
const ProductAddNew = lazy(() => import('~/modules/Product/Admin/ProductAddNew'))
const ProductUpdate = lazy(() => import('~/modules/Product/Admin/ProductUpdate'))

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
  UserOrder,
  UserOrderDetail,
  UserHistory,
  UserWishList,
  DashboardPage,
  ProductManage,
  ProductAddNew,
  ProductUpdate
}

export { publicRoutes, privateLoggedInRoutes, privateRoutes }
