import { useMemo, useState } from 'react'
import FreeShip from '~/assets/images/icon-freeship.png'
import { Dropdown } from '~/components/DropdownCustomize'
import { IconShipping } from '~/components/Icons'
import useFetchAdministrative from '~/hooks/useFetchAdministrative'
import { useStore } from '~/store/globalStore'
import { ICity } from '~/types'
import { calcShippingFee, formatMoney } from '~/utils'

type Props = {
  shopCityId: string
}

const ProductShipping = ({ shopCityId }: Props) => {
  const { cities } = useFetchAdministrative()
  const { currentUser } = useStore((state) => state)
  const [selectedCity, setSelectedCity] = useState({
    id: currentUser?.city?.id || '33',
    name: currentUser?.city?.name || 'TP. Đà Nẵng'
  })

  const shippingFee = useMemo((): number => {
    if (shopCityId) {
      return calcShippingFee(shopCityId, selectedCity.id)
    }
    return 0
  }, [shopCityId, selectedCity])

  return (
    <div className='my-6'>
      <div>
        <div className='flex items-center gap-2 text-sm'>
          <img src={FreeShip} alt='freeShip' className='h-4 w-6' />
          <span>Miễn phí vận chuyển</span>
        </div>
        <p className='ml-8 mt-1 text-[#0000008a] maxsm:text-[13px]'>Miễn phí vận chuyển cho đơn hàng trên ₫50.000</p>
      </div>
      <div className='flex flex-wrap items-center maxsm:mt-2'>
        <div className='flex items-center gap-x-1'>
          <IconShipping className='h-5 w-6' />
          <span>Vận chuyển tới:</span>
        </div>
        <Dropdown className='dropdown-outline w-[205px] maxsm:ml-[12px] maxsm:-mb-1 maxsm:-mt-2'>
          <Dropdown.Select placeholder={selectedCity?.name || 'Vận chuyển tới'} />
          <Dropdown.List>
            {cities.length > 0 &&
              cities.map((city: ICity) => (
                <Dropdown.Option
                  key={city.cityId}
                  onClick={() => setSelectedCity({ id: city.cityId, name: city.name })}
                >
                  {city.name}
                </Dropdown.Option>
              ))}
          </Dropdown.List>
        </Dropdown>
      </div>
      <p className='-mt-1 pl-7 text-sm maxsm:text-[13px]'>Phí vận chuyển: {formatMoney(shippingFee)}</p>
    </div>
  )
}

export default ProductShipping
