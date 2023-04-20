import { useQuery } from 'react-query'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { bannerAPI } from '~/api'
import logoGray from '~/assets/images/logo-gray.png'
import { QUERIES_KEY, STALE_TIME_CONSTANT } from '~/constants'

// Import Swiper styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './HomeBanner.scss'

const HomeBanner = () => {
  const { isLoading, data: bannerData } = useQuery({
    queryKey: [QUERIES_KEY.BANNER],
    queryFn: () => bannerAPI.getAllBanner(),
    keepPreviousData: true,
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const paginationCustomize = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + '' + '</span>'
    }
  }

  const renderHomeBanner = () => {
    if (isLoading && !bannerData) {
      return (
        <div className='layout-container mt-7'>
          <div className='flex h-[360px] items-center justify-center bg-[#fafafa]'>
            <img src={logoGray} alt='banner' className='h-16 w-16' />
          </div>
        </div>
      )
    }

    return (
      <div className='layout-container mt-7 flex gap-x-1'>
        <div className='homeBanner-slides w-2/3 cursor-pointer'>
          <Swiper
            loop={true}
            navigation={true}
            pagination={paginationCustomize}
            modules={[Navigation, Pagination, Autoplay]}
            className='overflow-hidden rounded-md'
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
          >
            {bannerData?.data?.map((banner) => (
              <SwiperSlide key={banner._id}>
                <img src={banner.bannerUrl} alt={banner._id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='flex w-1/3 flex-col gap-y-1'>
          <img
            className='cursor-pointer'
            loading='lazy'
            src={bannerData?.data[1]?.bannerUrl}
            alt={bannerData?.data[1]?.bannerUrl}
          />
          <img
            className='cursor-pointer'
            loading='lazy'
            src={bannerData?.data[0]?.bannerUrl}
            alt={bannerData?.data[0]?.bannerUrl}
          />
        </div>
      </div>
    )
  }

  return <>{renderHomeBanner()}</>
}

export default HomeBanner
