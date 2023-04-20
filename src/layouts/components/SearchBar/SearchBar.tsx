import Tippy from '@tippyjs/react/headless'
import { FormEvent, useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconSearch } from '~/components/Icons'
import { routeConfig } from '~/route/routeConfig'

const mockUpListResult = [
  {
    text: 'ao'
  },
  {
    text: 'ao phao'
  },
  {
    text: 'ao mua'
  },
  {
    text: 'ao to'
  }
]

const SearchBar = () => {
  const [textSearch, setTextSearch] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const handleChangeSearch = useCallback(
    (event: any) => {
      const { type, keyCode } = event

      const searchValue = event.target.value

      if (type === 'keydown' && keyCode === 13) {
        setTextSearch(event.target.value)
      }

      if (!searchValue.startsWith(' ')) {
        setTextSearch(searchValue)
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    },
    [setTextSearch]
  )

  const handleOnBlur = useCallback(() => {
    setTimeout(() => {
      setTooltipIsOpen(false)
    }, 200)
  }, [])

  const handleClickSearchBar = useCallback(() => {
    setTooltipIsOpen(true)
  }, [])

  const handleSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (textSearch) {
        navigate(`${routeConfig.SearchPage}?name=${textSearch}`)
      }
    },
    [textSearch, navigate]
  )

  return (
    <Tippy
      interactive
      placement='bottom-start'
      visible={tooltipIsOpen}
      render={(attrs) => (
        <div
          {...attrs}
          className='shadow-[rgb(0 0 0 / 12%) 0px 2px 12px] max-h-[757px] min-h-[100px] overflow-hidden rounded-md bg-whiteCustomize'
          style={{
            width: `${inputRef.current?.clientWidth ? `${inputRef.current?.clientWidth}px` : '100%'}`
          }}
        >
          <ul>
            {mockUpListResult.map((result, index) => (
              <li className='truncate px-4 py-4 pt-4 transition-colors hover:bg-[#fafafa]' key={index}>
                <Link to={`${routeConfig.SearchPage}?name=${result.text}`} className='flex items-center font-normal'>
                  {result.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    >
      <form
        onSubmit={handleSubmitForm}
        className='flex max-w-[860px] flex-1 items-center justify-between rounded bg-white px-2 lg:px-3 max5se:flex-grow-0'
      >
        <input
          type='text'
          className='h-11 flex-1 text-base outline-none'
          placeholder='Đăng ký và nhận voucher bạn mới đến 70k!'
          value={textSearch}
          onChange={handleChangeSearch}
          onClick={handleClickSearchBar}
          onBlur={handleOnBlur}
          ref={inputRef}
        />
        <button type='submit' className='h-9 rounded bg-[#fb6445] px-3 text-white lg:px-5'>
          <IconSearch />
        </button>
      </form>
    </Tippy>
  )
}

export default SearchBar
