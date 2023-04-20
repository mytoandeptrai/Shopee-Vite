import React from 'react'
import { Sidebar } from '~/layouts/components'
import { SearchByCategory } from '../SearchByCategory'
import { SearchByPrice } from '../SearchByPrice'
import { SearchByRating } from '../SearchByRating'
import { SearchClear } from '../SearchClear'

const SearchAside = () => {
  return (
    <Sidebar content='Bộ lọc'>
      <SearchByCategory />
      <SearchByPrice />
      <SearchByRating />
      <SearchClear />
    </Sidebar>
  )
}

export default SearchAside
