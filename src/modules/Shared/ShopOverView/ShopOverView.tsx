import { ButtonOutline } from '~/components/ButtonCustomize'
import { routeConfig } from '~/route/routeConfig'
import { IShopInfo } from '~/types'
import { OVERVIEW_CONSTANTS } from './ShopOverView.config'

type Props = {
  shopInfo: IShopInfo
}

const ShopOverView = ({ shopInfo }: Props) => {
  return (
    <div className='section-white mt-4'>
      <div className='flex flex-col gap-y-4 md:gap-x-20 lg:flex-row lg:items-center'>
        <div className='flex items-center gap-x-4'>
          <img src={shopInfo?.avatar} alt='shop avatar' className='h-20 w-20 rounded-full' />
          <div>
            <h3 className='text-base font-medium'>{shopInfo?.name}</h3>
            <ButtonOutline primary to={routeConfig.SearchPage} className='mt-1 h-[34px] py-0'>
              Xem shop
            </ButtonOutline>
          </div>
        </div>
        <div className='grid gap-y-1 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-x-6'>
          {OVERVIEW_CONSTANTS.map((item) => (
            <div key={item.key}>
              <span className='mr-2 text-[#00000066]'>{item.key}</span>
              <span className='text-orangeCustomize'>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopOverView
