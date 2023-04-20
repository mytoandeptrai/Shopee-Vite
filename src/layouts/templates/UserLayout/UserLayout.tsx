import { Outlet } from 'react-router-dom'
import { Header, SidebarUser } from '~/layouts/components'
import { Footer } from '~/layouts/components/Footer'

const UserLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>
        <div className='layout-container'>
          <div className='mt-8 flex flex-col gap-6 lg:flex-row'>
            <SidebarUser />
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <Footer className='mt-[50px]' />
    </div>
  )
}

export default UserLayout
