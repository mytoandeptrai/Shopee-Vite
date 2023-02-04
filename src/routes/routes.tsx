import HomePage from '~/pages/HomePage'
import { routeConfig } from './routeConfig'
import { PublicRoutes } from './types'

const publicRoutes: PublicRoutes[] = [
  {
    path: routeConfig.HomePage,
    component: HomePage
  }
]

export default publicRoutes
