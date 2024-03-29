import React from 'react'
import { Dropdown } from '~/components/DropdownCustomize'
import { FormError, FormGroup } from '~/components/Form'
import useFetchAdministrative from '~/hooks/useFetchAdministrative'
import { ICity, IDistrict, IWard } from '~/types'

type Props = {
  formik: any
}

const ProfileAdministrative = ({ formik }: Props) => {
  const { city, district, ward } = formik.values
  const { cities, districts, wards } = useFetchAdministrative(city.id, district.id)

  const handleChangeCity = (city: ICity) => {
    formik.setFieldValue('ward', { id: '', name: '' })
    formik.setFieldValue('district', { id: '', name: '' })
    formik.setFieldValue('city', { id: city.cityId, name: city.name })
  }
  const handleChangeDistrict = (district: IDistrict) => {
    formik.setFieldValue('ward', { id: '', name: '' })
    formik.setFieldValue('district', { id: district.districtId, name: district.name })
  }
  const handleChangeWard = (ward: IWard) => {
    formik.setFieldValue('ward', { id: ward.wardId, name: ward.name })
  }

  return (
    <div className='grid gap-2 md:grid-cols-3'>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={city.name || 'Chọn Tỉnh/Thành Phố'} />
          <Dropdown.List>
            {cities.length > 0 &&
              cities.map((city: ICity) => (
                <Dropdown.Option key={city.cityId} onClick={() => handleChangeCity(city)}>
                  {city.name}
                </Dropdown.Option>
              ))}
          </Dropdown.List>
        </Dropdown>
        <FormError>{formik.touched.city?.name && formik.errors?.city?.name}</FormError>
      </FormGroup>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={district.name || 'Chọn Quận/Huyện'} />
          <Dropdown.List>
            {districts.length > 0 ? (
              districts.map((district: IDistrict) => (
                <Dropdown.Option key={district.districtId} onClick={() => handleChangeDistrict(district)}>
                  {district.name}
                </Dropdown.Option>
              ))
            ) : (
              <span className='line-clamp-1 inline-block p-2 text-sm'>Chưa chọn Quận/Huyện</span>
            )}
          </Dropdown.List>
        </Dropdown>
        <FormError>{formik.touched.district?.name && formik.errors?.district?.name}</FormError>
      </FormGroup>
      <FormGroup>
        <Dropdown>
          <Dropdown.Select placeholder={ward.name || 'Chọn Phường/Xã'} />
          <Dropdown.List>
            {wards.length > 0 ? (
              wards.map((ward: IWard) => (
                <Dropdown.Option key={ward.wardId} onClick={() => handleChangeWard(ward)}>
                  {ward.name}
                </Dropdown.Option>
              ))
            ) : (
              <span className='line-clamp-1 inline-block p-2 text-sm'>Chưa chọn Phường/Xã</span>
            )}
          </Dropdown.List>
        </Dropdown>
        <FormError>{formik.touched.ward?.name && formik.errors?.ward?.name}</FormError>
      </FormGroup>
    </div>
  )
}

export default React.memo(ProfileAdministrative)
