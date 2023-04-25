import { OrderStatusCode } from '~/types'

const renderStatusOrderWithColor = (statusCode: number) => {
  switch (statusCode) {
    case OrderStatusCode.processing:
      return <span className='text-yellow-400'>ĐANG XỬ LÍ</span>
    case OrderStatusCode.shipping:
      return <span className='text-blue-500'>ĐANG GIAO HÀNG</span>
    case OrderStatusCode.delivered:
      return <span className='text-[#2dc258]'>ĐÃ GIAO HÀNG</span>
    case OrderStatusCode.canceled:
      return <span className='text-redff4'>ĐÃ HỦY</span>
    default:
      return <span className='text-orangeee4'>ĐANG CHỜ XỬ LÍ</span>
  }
}

export { renderStatusOrderWithColor }
