import { Helmet } from 'react-helmet-async'
import { HomeBanner, HomeCategories, HomeProducts } from '~/modules/Home'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Shopbee Việt Nam | Mua và Bán trên ứng dụng di động hoặc website</title>
      </Helmet>
      <HomeBanner />
      <HomeCategories />
      <HomeProducts />
    </>
  )
}

export default HomePage
