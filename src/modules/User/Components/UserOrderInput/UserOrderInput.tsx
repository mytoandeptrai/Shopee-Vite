import React from 'react'

type Props = {
  handleSubmitOrder?: (order: string) => void
}

const UserOrderInput = ({
  handleSubmitOrder = () => {
    return
  }
}: Props) => {
  const [inputValue, setInputValue] = React.useState<string>('')

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmitOrder && handleSubmitOrder(inputValue)
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmitForm}>
      <input
        className='mt-3 w-full bg-[#eaeaea] px-4 py-3 outline-none'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Tìm kiếm theo đơn hàng theo mã đơn hàng'
      />
    </form>
  )
}

export default UserOrderInput
