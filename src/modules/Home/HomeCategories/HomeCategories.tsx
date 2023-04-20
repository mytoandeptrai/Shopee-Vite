import React from 'react'
import { useQuery } from 'react-query'
import { categoryAPI } from '~/api'
import { QUERIES_KEY, STALE_TIME_CONSTANT } from '~/constants'
import logoGray from '~/assets/images/logo-gray.png'
import { Link } from 'react-router-dom'
import { routeConfig } from '~/route/routeConfig'
const HomeCategories = () => {
  const { isLoading, data: categoriesData } = useQuery({
    queryKey: [QUERIES_KEY.CATEGORIES],
    queryFn: () => categoryAPI.getAllCategory(),
    keepPreviousData: true,
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const renderCategoriesContent = () => {
    if (isLoading || !categoriesData) {
      return (
        <>
          {Array(10)
            .fill(0)
            .map((_item, index) => (
              <div key={index} className='flex h-[130px] w-[120px] items-center justify-center p-1'>
                <img src={logoGray} alt='Categories-Logo' className='h-10 w-10' />
              </div>
            ))}
        </>
      )
    }

    return (
      <>
        {categoriesData?.data?.map(({ _id, image, name, slug }) => (
          <Link
            key={_id}
            to={`${routeConfig.SearchPage}?category=${_id}`}
            className='flex flex-col items-center bg-white p-1 transition-all duration-300 hover:text-orangeCustomize hover:opacity-80'
          >
            <img src={image} alt={slug} className='h-[88px] w-[88px]' />
            <span className='text-center'>{name}</span>
          </Link>
        ))}
      </>
    )
  }

  return (
    <div className='layout-container mt-7'>
      <div className='my-4 bg-white py-3'>
        <h2 className='px-5 text-base text-[#0000008a]'>DANH MỤC</h2>
        <div className='home-categories mt-3'>{renderCategoriesContent()}</div>
      </div>
    </div>
  )
}

export default HomeCategories
