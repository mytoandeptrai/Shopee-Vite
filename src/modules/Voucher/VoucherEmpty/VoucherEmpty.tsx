import React from 'react'
import { Link } from 'react-router-dom'
import { routeConfig } from '~/route/routeConfig'
import voucherEmpty from '~/assets/images/voucher-empty.png'

const VoucherEmpty = () => {
  return (
    <div className='mt-3 flex flex-col items-center justify-center gap-y-1 bg-white py-6'>
      <img src={voucherEmpty} alt='empty voucher' className='h-24 w-24' />
      <h3 className='-mt-3 text-base font-medium text-[#00000066]'>Không có voucher phù hợp</h3>
      <Link to={routeConfig.HomePage}>
        <button type='button' className='mt-2 rounded bg-orangeCustomize px-4 py-2 text-white'>
          Tìm thêm voucher
        </button>
      </Link>
    </div>
  )
}

export default VoucherEmpty
