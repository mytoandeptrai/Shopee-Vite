import React from 'react'
import { Logo } from '~/components/Logo'

const CheckoutHeader = () => {
  return (
    <header className='bg-white'>
      <div className='layout-container'>
        <div className='flex h-20 items-center gap-x-4'>
          <Logo primary>Shopbee</Logo>
          <h2 className='text-xl'>Thanh toán</h2>
        </div>
      </div>
    </header>
  )
}

export default CheckoutHeader
