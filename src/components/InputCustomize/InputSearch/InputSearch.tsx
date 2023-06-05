import React, { FormEvent, useState } from 'react'
import { Input } from '../Input'
import { Button } from '~/components/ButtonCustomize'

type Props = {
  onChangeInputValue?: (value: string) => void
}

const InputSearch = ({ onChangeInputValue }: Props) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toString()
    setInputValue(value)
  }

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onChangeInputValue && onChangeInputValue(inputValue)
  }

  return (
    <form
      autoComplete='off'
      className='my-4 flex flex-wrap items-center gap-x-2 gap-y-1 sm:flex-nowrap'
      onSubmit={handleSubmitForm}
    >
      <Input
        name='name'
        className='w-full lg:!h-12'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Tìm kiếm sản phẩm theo tên'
      />
      <Button primary className='flex-shrink-0 lg:h-12'>
        Tìm kiếm
      </Button>
    </form>
  )
}

export default InputSearch
