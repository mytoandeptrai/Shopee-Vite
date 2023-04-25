import { routeConfig } from '~/route/routeConfig'

const userWalletTabs = [
  {
    key: '',
    display: 'Tất cả',
    to: routeConfig.VoucherWalletPage
  },
  {
    key: 'used',
    display: 'Đã sử dụng',
    to: `${routeConfig.VoucherWalletPage}?status=used`
  },
  {
    key: 'expiration',
    display: 'Hết hiệu lực',
    to: `${routeConfig.VoucherWalletPage}?status=expiration`
  }
]

export { userWalletTabs }
