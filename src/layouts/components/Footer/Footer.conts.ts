import facebookImage from '~/assets/images/icon-facebook.png'
import instagramImage from '~/assets/images/icon-instagram.png'
import linkedImage from '~/assets/images/icon-linked.png'
import playStoreImage from '~/assets/images/download-playstore.png'
import appStoreImage from '~/assets/images/download-appstore.png'
import appGalleryImage from '~/assets/images/download-appgallery.png'

const customerCares = ['Trung Tâm Trợ Giúp', 'Shopbee Mall', 'Hướng Dẫn Mua Hàng', 'Chăm Sóc Khách Hàng']
const customerAbout = ['Giới Thiệu Về Shopbee Việt Nam', 'Tuyển Dụng', 'Điều Khoản Shopbee', 'Chính Sách Bảo Mật']

const customerSocials = [
  { display: 'Facebook', image: facebookImage },
  { display: 'Instagram', image: instagramImage },
  { display: 'Linked', image: linkedImage }
]
const customerDownloads = [
  { key: 'download-playstore', image: playStoreImage },
  { key: 'download-appstore', image: appStoreImage },
  { key: 'download-appgallery', image: appGalleryImage }
]

export { customerCares, customerAbout, customerSocials, customerDownloads }
