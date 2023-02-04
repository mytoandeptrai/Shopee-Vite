import { Route, Routes } from 'react-router-dom'
import publicRoutes from '~/routes/routes'

const RootLayout = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const PageComponent = route.component
          const renderElement = () => {
            if (route.layout) {
              return (
                <route.layout>
                  <PageComponent />
                </route.layout>
              )
            }

            return <PageComponent />
          }

          return <Route key={index} path={route.path} element={renderElement()} />
        })}
      </Routes>
    </>
  )
}

export default RootLayout
