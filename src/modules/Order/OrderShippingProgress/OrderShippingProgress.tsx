import { v4 as uuidv4 } from 'uuid'
import { IconCheck, IconClipboard, IconMoney, IconShipping } from '~/components/Icons'
import { EnumOrderStatus, IOrderDetails, IStatusOrder, OrderStatusCode, OrderStatusVietnamese } from '~/types'
import { formatDateVNFull } from '~/utils'
import classNames from '~/utils/classNames'
import { calcWidthActiveStatusBar } from './OrderShippingProgress.config'

type Props = {
  orderDetails: IOrderDetails
}

const OrderShippingProgress = ({ orderDetails }: Props) => {
  const statusList: IStatusOrder[] = [
    {
      icon: <IconClipboard />,
      active: orderDetails.statusCode >= OrderStatusCode.waiting,
      status: OrderStatusVietnamese.waiting,
      date: formatDateVNFull(orderDetails?.created_at)
    },
    {
      icon: <IconMoney />,
      active: orderDetails.statusCode >= OrderStatusCode.processing,
      status: OrderStatusVietnamese.processing,
      date: formatDateVNFull(orderDetails?.created_at)
    },
    {
      icon: <IconShipping />,
      active: orderDetails.statusCode >= OrderStatusCode.shipping,
      status: OrderStatusVietnamese.shipping,
      date: orderDetails?.shippingAt ? formatDateVNFull(orderDetails?.shippingAt) : 'Đang chờ'
    },
    {
      icon: <IconCheck />,
      active: orderDetails.statusCode >= OrderStatusCode.delivered,
      status: OrderStatusVietnamese.delivered,
      date: orderDetails?.deliveredAt ? formatDateVNFull(orderDetails?.deliveredAt) : 'Đang chờ'
    }
  ]

  if (orderDetails.status === EnumOrderStatus.canceled) {
    return (
      <div className='mt-10 grid gap-x-6 gap-y-4 md:grid-cols-2'>
        <div className='flex items-center gap-3 md:flex-col'>
          <div className={classNames('order-status', 'border-redCustomize text-redCustomize')}>
            <IconCheck />
          </div>
          <div className='md:text-center'>
            <h3>{OrderStatusVietnamese.canceled}</h3>
            <span className='mt-1 block text-xs text-[#00000042]'>{formatDateVNFull(orderDetails?.canceledAt)}</span>
          </div>
        </div>
        <div>
          <h3 className='mb-1 text-lg'>Lý do hủy đơn hàng</h3>
          <p className='text-xs md:text-sm'>{orderDetails.reasonCancel}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='relative mx-auto mt-10 max-w-[800px] gap-4 md:text-center'>
      <div
        className={classNames(
          'absolute top-[28px] left-1/2 hidden h-1 w-3/4 -translate-x-1/2 bg-[#dbdbdb] after:absolute after:left-0 after:z-10 after:h-1 after:bg-[#2dc258] md:block',
          calcWidthActiveStatusBar(orderDetails.statusCode)
        )}
      />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-4'>
        {statusList.map((statusItem) => (
          <div className='flex items-center gap-3 md:flex-col' key={uuidv4()}>
            <div
              className={classNames(
                'order-status',
                statusItem.active ? 'border-[#2dc258] text-[#2dc258]' : ' border-[#dbdbdb] text-[#dbdbdb]'
              )}
            >
              {statusItem.icon}
            </div>
            <div>
              <h3>{statusItem.status}</h3>
              <span className='mt-1 block text-xs text-[#00000042]'>{statusItem.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderShippingProgress
