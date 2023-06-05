import jwtDecode from 'jwt-decode'
import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '~/store/globalStore'
import { IDecodedToken } from '~/types'

const AdminLayout = () => {
  const { currentUser } = useStore()
  const accessToken = currentUser?.accessToken as string
  const decodedJwt: IDecodedToken = jwtDecode(accessToken)
  if (currentUser && decodedJwt.role !== 'Admin') {
    return <Navigate to='/404' />
  }
  return <Outlet />
}

export default AdminLayout
