import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '~/components/ButtonCustomize'
import { routeConfig } from '~/route/routeConfig'

const SearchClear = () => {
  const navigate = useNavigate()

  return (
    <div className='mt-6 border-t-2 border-[#0000000d] pb-3'>
      <Button primary className='mt-4 w-full rounded-sm py-[6px]' onClick={() => navigate(routeConfig.SearchPage)}>
        XÓA TẤT CẢ
      </Button>
    </div>
  )
}

export default SearchClear
