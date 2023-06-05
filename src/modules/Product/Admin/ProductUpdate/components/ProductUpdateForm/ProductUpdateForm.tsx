import { useFormik } from 'formik'
import React from 'react'
import { useQuery } from 'react-query'
import ReactQuill from 'react-quill'
import { categoryAPI } from '~/api'
import { Button } from '~/components/ButtonCustomize'
import ButtonDelete from '~/components/ButtonCustomize/ButtonDelete/ButtonDelete'
import { FormError, FormGroup } from '~/components/Form'
import { Input } from '~/components/InputCustomize'
import { Label } from '~/components/Label'
import { Loading } from '~/components/Loading'
import { Option, Select } from '~/components/SelectCustomize'
import { ImageUpload } from '~/components/Upload'
import { QUERIES_KEY, STALE_TIME_CONSTANT } from '~/constants'
import { ICreateProductPayload, IProduct } from '~/types'
import { addNewProductValidation } from '~/utils'

type Props = {
  initialProductInfo: IProduct
  handleUpdateProduct: (newProduct: ICreateProductPayload) => void
  isDisableFieldAndButton?: boolean
}

const ProductUpdateForm = ({ initialProductInfo, handleUpdateProduct, isDisableFieldAndButton = false }: Props) => {
  const [images, setImages] = React.useState<any[]>(initialProductInfo.images)

  const { isLoading, data: categoriesData } = useQuery({
    queryKey: [QUERIES_KEY.CATEGORIES],
    queryFn: () => categoryAPI.getAllCategory(),
    keepPreviousData: true,
    staleTime: STALE_TIME_CONSTANT.STALE_TIME
  })

  const formik = useFormik({
    initialValues: initialProductInfo,
    validationSchema: addNewProductValidation,
    onSubmit: async (values: any) => {
      const bodyPayload = {
        ...values,
        images
      }
      handleUpdateProduct(bodyPayload)
    }
  })

  const { values, touched, errors, setFieldValue, handleSubmit, handleChange } = formik

  const handleImageChange = (image: File, index: number) => {
    setImages((previousImages) => {
      const newValue = [...previousImages]
      newValue[index] = image
      return newValue
    })
  }

  const handleDeleteImage = (index: number) => {
    const currentImages = [...images]
    currentImages.splice(index, 1, null)
    setImages(currentImages)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <div className='mt-6 flex flex-col-reverse gap-8 lg:flex-row'>
        <div className='max-w-[600px]'>
          <FormGroup>
            <Label htmlFor='name'>Tên sản phẩm</Label>
            <Input name='name' value={values.name} onChange={handleChange} disabled={isDisableFieldAndButton} />
            <FormError>{touched.name && errors?.name}</FormError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='category'>Chọn danh mục</Label>
            <Select name='category' value={values.category} onChange={handleChange} disabled={isDisableFieldAndButton}>
              <Option disabled>Chọn danh mục</Option>
              {categoriesData?.data.map((category) => (
                <Option value={category._id} key={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
            <FormError>{touched.category && errors?.category}</FormError>
          </FormGroup>
          <div className='grid gap-x-2 md:grid-cols-3'>
            <FormGroup>
              <Label htmlFor='stock'>Số lượng hiện có</Label>
              <Input
                name='stock'
                type='number'
                value={values.stock}
                onChange={handleChange}
                disabled={isDisableFieldAndButton}
              />
              <FormError>{touched.stock && errors?.stock}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='oldPrice'>Giá gốc</Label>
              <Input
                type='number'
                name='oldPrice'
                value={values.oldPrice}
                onChange={handleChange}
                disabled={isDisableFieldAndButton}
              />
              <FormError>{touched.oldPrice && errors?.oldPrice}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='price'>Giá đã giảm</Label>
              <Input
                name='price'
                type='number'
                value={values.price}
                onChange={handleChange}
                disabled={isDisableFieldAndButton}
              />
              <FormError>{touched.price && errors?.price}</FormError>
            </FormGroup>
          </div>
        </div>
        <FormGroup>
          <Label htmlFor='image'>Chọn ảnh sản phẩm</Label>
          <div className='flex flex-wrap gap-3'>
            {[0, 1, 2, 3, 4].map((index) => (
              <div className='relative' key={index}>
                <ImageUpload
                  className='!w-24'
                  onChange={(image: File) => handleImageChange(image, index)}
                  previewImage={images[index]}
                />
                {images[index] && <ButtonDelete className='!h-5 !w-5' onClick={() => handleDeleteImage(index)} />}
              </div>
            ))}
          </div>
        </FormGroup>
      </div>
      <FormGroup className=''>
        <Label htmlFor='description'>Mô tả sản phẩm</Label>
        <ReactQuill
          theme='snow'
          className='mt-1 h-[150px] lg:h-[300px]'
          value={values.description}
          onChange={(e) => setFieldValue('description', e)}
        />
        <FormError>{touched.description && errors?.description}</FormError>
      </FormGroup>
      <Button type='submit' primary className='mt-11 h-10 w-full' disabled={isDisableFieldAndButton}>
        Cập nhật sản phẩm
      </Button>
    </form>
  )
}

export default ProductUpdateForm
