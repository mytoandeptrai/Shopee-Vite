import { Link } from 'react-router-dom'
import cartEmpty from '~/assets/images/cart-empty.png'
import { Button } from '~/components/ButtonCustomize'
import { IconCartOutline } from '~/components/Icons'
import { Popover } from '~/components/Popover'
import useCartActions from '~/hooks/useCartActions'
import usePopover from '~/hooks/usePopover'
import { ProductPriceSale } from '~/modules/Product/ProductPriceSale'
import { routeConfig } from '~/route/routeConfig'

const HeaderCart = () => {
  const { carts } = useCartActions()
  const { activePopover, hidePopover, showPopover } = usePopover()

  const renderCartItemList = () => {
    if (carts.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center gap-y-1'>
          <img src={cartEmpty} alt='cart' className='h-20 w-20' />
          <h3 className='text-[#00000066]'>Giỏ hàng của bạn còn trống</h3>
        </div>
      )
    }

    return (
      <>
        {carts.slice(0, 5).map((cart) => (
          <Link
            key={cart?._id}
            to={`${routeConfig.ProductPage}/${cart.product._id}`}
            className='flex items-start gap-x-2 p-3 transition-all duration-300 hover:bg-[#f8f8f8]'
          >
            <img alt={cart.product.name} src={cart.product.image} className='h-11 w-11 border border-black017' />
            <h3 className='product-title line-clamp-1 flex-1'>{cart.product.name}</h3>
            <ProductPriceSale className='ml-2 flex-shrink-0'>{cart.product.price}</ProductPriceSale>
          </Link>
        ))}
      </>
    )
  }

  return (
    <div className='relative flex-shrink-0 p-5 max5se:p-0' onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      <Link to={routeConfig.CartPage}>
        <IconCartOutline className='text-white' />
        <span className='absolute top-2 right-2 flex h-[18px] w-6 items-center justify-center rounded-full bg-white text-xs font-medium text-orangeCustomize max5se:-right-3'>
          99
        </span>
      </Link>
      <Popover active={activePopover} className='!right-3 w-[300px] md:w-[400px] max5se:!-right-3 max5se:top-[170%]'>
        <div className='shadow2 py-3'>
          <span className='px-3'>Sản phẩm mới thêm</span>
          <div className='mt-5'>
            {renderCartItemList()}
            <div className='mt-7 flex items-center justify-between px-3'>
              <div>{carts.length > 5 && <span>{carts.length - 5} Thêm vào giỏ hàng</span>}</div>
              <Button primary className='py-[6px]' to={routeConfig.CartPage}>
                Xem giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default HeaderCart
