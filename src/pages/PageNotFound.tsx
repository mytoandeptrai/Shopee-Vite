import { Helmet } from 'react-helmet-async'
import { Button } from '~/components/ButtonCustomize'
import { routeConfig } from '~/route/routeConfig'
import pageNotFound from '~/assets/images/page-404.jpg'

const PageNotFound = () => {
  return (
    <div className='layout-container'>
      <Helmet>
        <title>Không tìm thấy trang</title>
      </Helmet>
      <div className='shadow-rgba-customize mx-auto mt-8 max-w-[767px] rounded-lg bg-white px-7 pb-10 pt-0 text-center'>
        <img src={pageNotFound} alt='404' className='mx-auto w-full max-w-[400px]' />
        <h1 className='mb-4 -mt-4 font-semibold text-[#566278] md:text-lg'>
          Trang bạn tìm không tồn tại. Vui lòng quay trở lại trang chủ.
        </h1>
        <Button primary to={routeConfig.HomePage}>
          Quay về trang chủ
        </Button>
      </div>
    </div>
  )
}

export default PageNotFound
