import { useCallback, useState } from 'react'
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import noImageAvailable from '~/assets/images/no-image-avaliable.png'

interface ImageProps extends LazyLoadImageProps {
  to?: string
  imageError?: any
}

const Image = ({ to = '', src, imageError = noImageAvailable, ...props }: ImageProps) => {
  const [fallback, setFallback] = useState<string>('')
  const handleErrorImage = useCallback(() => setFallback(imageError), [imageError])

  if (to) {
    return (
      <Link to={to} style={{ display: 'block' }}>
        <LazyLoadImage effect='opacity' src={fallback || src} onError={handleErrorImage} {...props} />
      </Link>
    )
  }

  return <LazyLoadImage src={fallback || src} effect='opacity' onError={handleErrorImage} {...props} />
}

export default Image
