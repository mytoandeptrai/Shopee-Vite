import { useFormik } from 'formik'
import React from 'react'
import { Button } from '~/components/ButtonCustomize'
import { FormError } from '~/components/Form'
import { IconFilter } from '~/components/Icons'
import { InputNumber } from '~/components/InputCustomize'
import useQueryParams from '~/hooks/useQueryParams'
import { initialValuesPrice, priceValidation, removeEmptyStringValueObj } from '~/utils'

const SearchByPrice = () => {
  const { queryParams, setSearchParams } = useQueryParams()

  const formik = useFormik({
    initialValues: initialValuesPrice,
    validationSchema: priceValidation,
    onSubmit: (values: { price_min: string; price_max: string }) => {
      const params = removeEmptyStringValueObj({ ...queryParams, ...values })
      setSearchParams(params)
    }
  })

  const { values, handleChange, touched, errors, handleSubmit } = formik

  return (
    <div className='mt-5'>
      <div className='search-category'>
        <IconFilter />
        <h3>Bộ lọc tìm kiếm</h3>
      </div>
      <form autoComplete='off' onSubmit={handleSubmit} className='mt-3 flex flex-col gap-y-2'>
        <span className='text-[#000000cc]'>Khoản giá</span>
        <div className='flex items-center justify-between'>
          <InputNumber
            name='price_min'
            placeholder='Từ'
            className='!h-8 w-[120px] bg-white py-0 px-1 lg:w-[85px]'
            value={values.price_min}
            onChange={handleChange}
          />
          <span>-</span>
          <InputNumber
            name='price_max'
            placeholder='Đến'
            className='!h-8 w-[120px] bg-white py-0 px-1 lg:w-[85px]'
            value={values.price_max}
            onChange={handleChange}
          />
        </div>
        <FormError className='block'>{touched.price_max && errors?.price_max}</FormError>
        <Button
          primary
          type='submit'
          className='w-full rounded-sm py-[6px]'
          disabled={values.price_max === '' && values.price_min === ''}
        >
          ÁP DỤNG
        </Button>
      </form>
    </div>
  )
}

export default SearchByPrice
