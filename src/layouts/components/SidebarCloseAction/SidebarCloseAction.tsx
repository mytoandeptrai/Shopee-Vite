import React from 'react'
import { IconPrev } from '~/components/Icons'

type Props = {
  onCloseSidebar?: () => void
}

const SidebarCloseAction = (props: Props) => {
  return (
    <div
      aria-hidden='true'
      onClick={props.onCloseSidebar}
      className='mb-5 flex cursor-pointer items-center gap-x-2 lg:hidden'
    >
      <IconPrev className='h-4 w-4' />
      <span className='text-base font-medium'>Trở lại</span>
    </div>
  )
}

export default SidebarCloseAction
