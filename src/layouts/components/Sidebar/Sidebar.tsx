import React, { useCallback, useRef } from 'react'
import { Button } from '~/components/ButtonCustomize'
import { IconMenu } from '~/components/Icons'
import useOnClickOutside from '~/hooks/useOnClickOutSide'
import classNames from '~/utils/classNames'
import { SidebarCloseAction } from '../SidebarCloseAction'

type Props = {
  content?: string
  className?: string
  children: React.ReactNode
}

const Sidebar = ({ content = 'Mở sidebar', children, className = 'lg:w-48' }: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const toggleSearchSidebar = useCallback(() => {
    if (sidebarRef.current) sidebarRef.current.classList.toggle('!translate-x-0')
    if (overlayRef.current) overlayRef.current.classList.toggle('fixed')
  }, [])

  const closeSearchSidebar = useCallback(() => {
    if (sidebarRef.current) sidebarRef.current.classList.remove('!translate-x-0')
    if (overlayRef.current) overlayRef.current.classList.remove('fixed')
  }, [])

  useOnClickOutside(sidebarRef, () => closeSearchSidebar())

  return (
    <>
      <Button primary onClick={() => toggleSearchSidebar()} className='flex max-w-fit items-center gap-x-2 lg:hidden'>
        <IconMenu />
        <span>{content}</span>
      </Button>
      <aside className={classNames('layout-sidebar', className)} ref={sidebarRef}>
        <SidebarCloseAction onCloseSidebar={toggleSearchSidebar} />
        <div>{children}</div>
      </aside>
      <div
        aria-hidden
        ref={overlayRef}
        onClick={closeSearchSidebar}
        className='overlay inset-0 z-[200] -m-3 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]'
      />
    </>
  )
}

export default Sidebar
