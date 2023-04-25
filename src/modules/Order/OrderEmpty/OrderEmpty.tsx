import orderEmpty from '~/assets/images/order-empty.png'

const OrderEmpty = () => {
  return (
    <div className='mt-3 flex h-[400px] flex-col items-center justify-center gap-2 bg-white'>
      <img src={orderEmpty} alt='order-empty' className='h-28 w-28' />
      <h3>Chưa có đơn hàng</h3>
    </div>
  )
}

export default OrderEmpty
