import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { categoryAPI } from '~/api'
import { IconMenu } from '~/components/Icons'
import { STALE_TIME_CONSTANT } from '~/constants'
import useQueryParams from '~/hooks/useQueryParams'
import { routeConfig } from '~/route/routeConfig'

const SearchByCategory = () => {
  const { queryParams } = useQueryParams()
  const { category = '' } = queryParams

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryAPI.getAllCategory(),
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const renderCategories = () => {
    if (categoriesData?.data?.length === 0) {
      return null
    }

    return (
      <ul className='mt-2'>
        {categoriesData?.data?.map((el) => {
          const styles = category === (el?._id as string) ? 'text-orangeCustomize' : 'text-[#000000cc]'
          return (
            <li className='line-clamp-1 px-3 py-[6px]' key={el._id}>
              <Link to={`${routeConfig.SearchPage}?category=${el._id}`} className={styles}>
                {el.name}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <div className='search-category'>
        <IconMenu />
        <h3>Tất cả danh mục</h3>
      </div>
      {renderCategories()}
    </>
  )
}

export default SearchByCategory
