import React from 'react'
import { useDropdown } from '../DropdownProvider/DropdownProvider'

type Props = {
  children: React.ReactNode
}

const DropdownList = ({ children }: Props) => {
  const { show } = useDropdown()

  if (!show) return <></>

  return (
    <div className='shadowCustomize absolute left-0 top-full z-20 max-h-[300px] w-full overflow-y-auto rounded-sm bg-white'>
      {children}
    </div>
  )
}

export default DropdownList
