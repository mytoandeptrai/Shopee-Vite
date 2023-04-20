import Profile from '~/assets/images/icon-account.png'
import ProfilePassword from '~/assets/images/icon-password.png'
import ProfileOrder from '~/assets/images/icon-order.png'
import ProfileWallet from '~/assets/images/icon-voucher-wallet.png'
import ProfileHistory from '~/assets/images/icon-history.png'
import ProfileWishlist from '~/assets/images/icon-heart.png'
import ProfileNotification from '~/assets/images/icon-notification.png'
import ProfileCreditCard from '~/assets/images/icon-credit-card.png'
import { routeConfig } from '~/route/routeConfig'

const SIDEBAR_LINKS = [
  {
    icon: Profile,
    path: routeConfig.ProfilePage,
    display: 'Tài khoản của tôi'
  },
  {
    icon: ProfilePassword,
    path: routeConfig.PasswordPage,
    display: 'Đổi mật khẩu'
  },
  {
    icon: ProfileOrder,
    path: routeConfig.OrderPage,
    display: 'Đơn mua'
  },
  {
    icon: ProfileWallet,
    path: routeConfig.VoucherWalletPage,
    display: 'Ví voucher'
  },
  {
    icon: ProfileHistory,
    path: routeConfig.HistoryPage,
    display: 'Đã xem gần đây'
  },
  {
    icon: ProfileWishlist,
    path: routeConfig.WishlistPage,
    display: 'Đã thích'
  },
  {
    icon: ProfileNotification,
    path: routeConfig.NotificationPage,
    display: 'Thông báo'
  },
  {
    icon: ProfileCreditCard,
    path: routeConfig.CartPage,
    display: 'Ngân hàng'
  }
]

export { SIDEBAR_LINKS }
