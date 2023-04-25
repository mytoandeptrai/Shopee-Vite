import { routeConfig } from '~/route/routeConfig'

const userOrderTabs = [
  { key: '', display: 'Tất cả', to: routeConfig.OrderPage },
  { key: 'processing', display: 'Đã thanh toán', to: `${routeConfig.OrderPage}?status=processing` },
  { key: 'shipping', display: 'Đang giao hàng', to: `${routeConfig.OrderPage}?status=shipping` },
  { key: 'delivered', display: 'Đã giao hàng', to: `${routeConfig.OrderPage}?status=delivered` },
  { key: 'canceled', display: 'Đã hủy', to: `${routeConfig.OrderPage}?status=canceled` }
]

export { userOrderTabs }
