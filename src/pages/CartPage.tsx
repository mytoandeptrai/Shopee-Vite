import React, { useCallback, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Button } from '~/components/ButtonCustomize'
import { QuantityController } from '~/components/QuantityCustomize'
import useCartActions from '~/hooks/useCartActions'
import { ProductNotFound, ProductPriceOld } from '~/modules/Product'
import { ProductPriceSale } from '~/modules/Product/ProductPriceSale'
import { routeConfig } from '~/route/routeConfig'
import { calcTotalPrice } from '~/utils'

const CartPage = () => {
  const { addToCartMutation, carts, removeAllCartMutation, removeCartMutation } = useCartActions()
  const totalProductsPrice = useMemo(() => calcTotalPrice(carts, 'price'), [carts])
  const totalProductsOldPrice = useMemo(() => calcTotalPrice(carts, 'oldPrice'), [carts])

  const onChangeQuantityMutation = useCallback(
    (productId: string, quantity: number) => {
      addToCartMutation.mutate({ productId, quantity })
    },
    [addToCartMutation]
  )

  const renderCarts = () => {
    if (carts.length === 0) {
      return <ProductNotFound />
    }

    return (
      <div className='mt-4 bg-white lg:p-5'>
        {carts.map(({ _id, product, quantity }) => (
          <div key={_id} className='my-3 flex items-center gap-3 border border-black017 p-4'>
            <img alt={product.name} className='w-24 lg:w-20' src={product.image} />
            <div className='flex flex-1 flex-col md:flex-row'>
              <Link className='md:w-[40%]' to={`${routeConfig.ProductPage}/${product._id}`}>
                <h3>{product.name}</h3>
              </Link>
              <div className='flex flex-1 flex-col justify-between gap-y-2 md:flex-row'>
                <div className='flex flex-1 flex-wrap items-center gap-x-2 text-sm md:justify-center md:gap-x-4'>
                  <ProductPriceOld>{product.oldPrice}</ProductPriceOld>
                  <ProductPriceSale>{product.price}</ProductPriceSale>
                </div>
                <div className='flex flex-1 flex-wrap items-center gap-x-2 text-sm md:justify-center md:gap-x-7'>
                  {product.stock ? (
                    <QuantityController
                      className='quantity-controller'
                      defaultQuantity={quantity}
                      onChangeValue={(value) => onChangeQuantityMutation(product._id, value)}
                    />
                  ) : (
                    <span className='text-base text-redCustomize'>Hết hàng</span>
                  )}
                  <button type='button' onClick={() => removeCartMutation.mutate(_id)}>
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='layout-container'>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <div className='mt-8 hidden bg-white py-3 px-9 lg:block'>
        <div className='flex text-center'>
          <span className='w-20'>Hình ảnh</span>
          <span className='w-[40%]'>Sản phẩm</span>
          <span className='w-[25%]'>Đơn giá</span>
          <span className='w-[25%]'>Thao tác</span>
        </div>
      </div>
      {renderCarts()}
      <div className='mt-6 flex flex-col justify-between gap-y-4 bg-white px-5 py-6 lg:flex-row lg:items-center'>
        <div>
          <div>
            Tổng ({carts?.length} sản phẩm):
            <ProductPriceSale className='ml-1 text-xl font-medium'>{totalProductsPrice}</ProductPriceSale>
          </div>
          <div>
            Tiết kiệm:
            <ProductPriceSale className='ml-1'>{totalProductsOldPrice - totalProductsPrice}</ProductPriceSale>
          </div>
        </div>
        <div className='flex gap-3'>
          <Button onClick={() => removeAllCartMutation.mutate()}>Xóa tất cả</Button>
          <Button primary to={routeConfig.CheckoutPage}>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
