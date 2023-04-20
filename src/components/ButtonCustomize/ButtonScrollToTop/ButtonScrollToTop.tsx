import React, { useCallback, useEffect, useState } from 'react'
import { IconArrowUp } from '~/components/Icons'
import { scrollToDestination } from '~/utils'
import classNames from '~/utils/classNames'

const ButtonScrollToTop = () => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        setIsShow(true)
      } else {
        setIsShow(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTopHandler = () => scrollToDestination()

  return (
    <button
      type='button'
      onClick={scrollToTopHandler}
      className={classNames(
        `fixed bottom-10 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-orangeCustomize text-white`,
        !isShow && 'hidden'
      )}
    >
      <IconArrowUp />
    </button>
  )
}

export default ButtonScrollToTop
