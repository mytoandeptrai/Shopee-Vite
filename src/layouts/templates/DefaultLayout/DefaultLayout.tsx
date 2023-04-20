import { Outlet } from 'react-router-dom'
import { Header } from '~/layouts/components'
import { Footer } from '~/layouts/components/Footer'

const DefaultLayout = () => {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <div className='mt-[50px]'>
        <Footer />
      </div>
    </div>
  )
}

export default DefaultLayout
