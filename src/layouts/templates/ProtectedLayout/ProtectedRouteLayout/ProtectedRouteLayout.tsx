import { Navigate, Outlet } from 'react-router-dom'
import { routeConfig } from '~/route/routeConfig'
import { useStore } from '~/store/globalStore'

const ProtectedRouteLayout = () => {
  const { currentUser } = useStore()
  const accessToken = currentUser?.accessToken
  const refreshToken = currentUser?.refreshToken
  if (!currentUser || !accessToken || !refreshToken) {
    return <Navigate to={routeConfig.SignIn} />
  }
  return <Outlet />
}

export default ProtectedRouteLayout
