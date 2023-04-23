import React from 'react'
import { Link } from 'react-router-dom'
import classNames from '~/utils/classNames'

type TabItem = {
  to: string
  key: string
  display: string
}

type Props = {
  query: string | number
  tabs: TabItem[]
  className?: string
}

const Tabs = ({ className = '', query, tabs }: Props) => {
  const classes = classNames('flex overflow-auto bg-white border-b-2 border-black017', className)
  const checkActive = React.useCallback((value: string) => value === query, [query])

  return (
    <ul className={classes}>
      {tabs.map((tab) => {
        const tabStyles = 'block w-40 py-4 text-center transition-all duration-75'
        const tabActiveStyles = 'border-b-2 border-b-[#ff424e] text-[#ff424e]'
        return (
          <li key={tab.key}>
            <Link to={tab.to} className={classNames(tabStyles, checkActive(tab.key) ? tabActiveStyles : 'text-[#555]')}>
              {tab.display}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Tabs
