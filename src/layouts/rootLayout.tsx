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

const RootLayout = () => {
  const { currentUser, setCarts } = useStore((state) => state)

  const isAcTive = useMemo(() => {
    return currentUser ? true : false
  }, [currentUser])

  useQuery({
    queryKey: ['carts/user'],
    queryFn: () => cartAPI.getCartOfUser(),
    staleTime: 5 * 60 * 1000,
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
        </Route>
      </Route>
    </Routes>
  )
}

export default RootLayout
