import React from 'react'
import classNames from '~/utils/classNames'

type Props = {
  images: string[]
  productName: string
}

const ProductImageSlider = ({ images, productName }: Props) => {
  const [indexActive, setIndexActive] = React.useState(0)
  const handleChooseActive = (index: number) => setIndexActive(index)

  return (
    <div className='flex-shrink-0 lg:w-[400px]'>
      <img src={images[indexActive]} alt='product-active' />
      <div className='relative my-1 mx-1 flex overflow-hidden'>
        {images.map((image, index) => (
          <img
            key={image}
            className={classNames(
              'inline-block aspect-square w-1/5 cursor-pointer border-2 object-cover p-1 transition-all duration-200',
              indexActive === index ? ' border-orangeCustomize' : 'border-transparent'
            )}
            src={image}
            alt={`${productName}-${index}`}
            onMouseEnter={() => handleChooseActive(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImageSlider
