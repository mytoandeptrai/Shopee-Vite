import {
  IconAddProduct,
  IconAddUser,
  IconAddVoucher,
  IconCash,
  IconCategoryManage,
  IconCube,
  IconIdentification,
  IconPicture,
  IconTag,
  IconTemplate,
  IconUserGroup,
  IconVoucher
} from '~/components/Icons'
import { routeConfig } from '~/route/routeConfig'

const SIDEBAR_DASHBOARD_LINKS = [
  {
    icon: <IconTemplate />,
    display: 'Tổng quan',
    path: routeConfig.DashboardPage
  },
  {
    icon: <IconPicture />,
    display: 'Tất cả banner',
    path: routeConfig.BannerPage
  },
  {
    icon: <IconCategoryManage />,
    display: 'Tất cả danh mục',
    path: routeConfig.CategoryManagePage
  },
  {
    icon: <IconTag />,
    display: 'Thêm danh mục mới',
    path: routeConfig.CategoryAddNewPage
  },
  {
    icon: <IconCash />,
    display: 'Tất cả đơn hàng',
    path: routeConfig.OrderManagePage
  },
  {
    icon: <IconCube />,
    display: 'Tất cả sản phẩm',
    path: routeConfig.ProductManagePage
  },
  {
    icon: <IconAddProduct />,
    display: 'Thêm sản phẩm',
    path: routeConfig.ProductAddNewPage
  },
  {
    icon: <IconUserGroup />,
    display: 'Tất cả người dùng',
    path: routeConfig.UserManagePage
  },
  {
    icon: <IconAddUser />,
    display: 'Thêm người dùng mới',
    path: routeConfig.UserAddNewPage
  },
  {
    icon: <IconIdentification />,
    display: 'Thông tin shop',
    path: routeConfig.ShopPage
  },
  {
    icon: <IconVoucher />,
    display: 'Tất cả voucher',
    path: routeConfig.VoucherManagePage
  },
  {
    icon: <IconAddVoucher />,
    display: 'Thêm voucher mới',
    path: routeConfig.VoucherAddNewPage
  }
]

const stylesLink = 'flex gap-x-2 items-center p-3'
const stylesLinkActive = 'flex gap-x-2 items-center p-3 bg-orangeCustomize text-white rounded-lg'

export { SIDEBAR_DASHBOARD_LINKS, stylesLink, stylesLinkActive }
