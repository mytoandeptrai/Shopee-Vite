import { Suspense, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Route, Routes } from 'react-router-dom'
import { cartAPI } from '~/api'
import { ErrorBoundary } from '~/components/ErrorBoundary'
import { Fallback } from '~/components/Fallback'
import { privateLoggedInRoutes, privateRoutes, publicRoutes } from '~/route'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'
import { AuthLayout, CheckLoggedInLayout, DefaultLayout, ProtectedRouteLayout } from './templates'
import UserLayout from './templates/UserLayout/UserLayout'
import { STALE_TIME_CONSTANT } from '~/constants'

const RootLayout = () => {
  const { currentUser, setCarts } = useStore((state) => state)

  const isAcTive = useMemo(() => {
    return currentUser && currentUser?._id ? true : false
  }, [currentUser])

  useQuery({
    queryKey: ['carts/user'],
    queryFn: () => cartAPI.getCartOfUser(),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME,
    onSuccess({ data }) {
      setCarts(data.carts)
    },
    enabled: isAcTive
  })

  const renderElementRoute = (Component: any) => {
    return (
      <Suspense fallback={<Fallback />}>
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      </Suspense>
    )
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <ErrorBoundary>
            <DefaultLayout />
          </ErrorBoundary>
        }
      >
        <Route index element={renderElementRoute(publicRoutes.HomePage)} />
        <Route path={`${routeConfig.ProductPage}/:id`} element={renderElementRoute(publicRoutes.ProductDetailPage)} />
        <Route path={routeConfig.SearchPage} element={renderElementRoute(publicRoutes.SearchPage)} />
        <Route path={routeConfig.CartPage} element={renderElementRoute(publicRoutes.CartPage)} />
        <Route path={routeConfig.VoucherDiscoverPage} element={renderElementRoute(publicRoutes.VoucherDiscoverPage)} />
      </Route>

      <Route
        element={
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <CheckLoggedInLayout />
            </ErrorBoundary>
          </Suspense>
        }
      >
        <Route
          path='/'
          element={
            <Suspense fallback={<Fallback />}>
              <ErrorBoundary>
                <AuthLayout title='Đăng nhập' />
              </ErrorBoundary>
            </Suspense>
          }
        >
          <Route path={routeConfig.SignIn} element={renderElementRoute(privateLoggedInRoutes.LoginPage)} />
        </Route>
        <Route
          path='/'
          element={
            <Suspense fallback={<Fallback />}>
              <ErrorBoundary>
                <AuthLayout title='Đăng ký' />
              </ErrorBoundary>
            </Suspense>
          }
        >
          <Route path={routeConfig.SignUp} element={renderElementRoute(privateLoggedInRoutes.RegisterPage)} />
        </Route>
      </Route>

      <Route
        element={
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <ProtectedRouteLayout />
            </ErrorBoundary>
          </Suspense>
        }
      >
        <Route
          path='/'
          element={
            <Suspense fallback={<Fallback />}>
              <ErrorBoundary>
                <UserLayout />
              </ErrorBoundary>
            </Suspense>
          }
        >
          {/* User Routes */}
          <Route path={routeConfig.CheckoutPage} element={renderElementRoute(privateRoutes.CheckOutPage)} />
          <Route path={routeConfig.ProfilePage} element={renderElementRoute(privateRoutes.ProfilePage)} />
          <Route path={routeConfig.VoucherWalletPage} element={renderElementRoute(privateRoutes.UserWallet)} />
          <Route path={routeConfig.PasswordPage} element={renderElementRoute(privateRoutes.UserChangePassword)} />
          <Route path={routeConfig.OrderPage} element={renderElementRoute(privateRoutes.UserOrder)} />
          <Route path={`${routeConfig.OrderPage}/:id`} element={renderElementRoute(privateRoutes.UserOrderDetail)} />
          <Route path={routeConfig.HistoryPage} element={renderElementRoute(privateRoutes.UserHistory)} />
          <Route path={routeConfig.WishlistPage} element={renderElementRoute(privateRoutes.UserWishList)} />
        </Route>
      </Route>
    </Routes>
  )
}

export default RootLayout
