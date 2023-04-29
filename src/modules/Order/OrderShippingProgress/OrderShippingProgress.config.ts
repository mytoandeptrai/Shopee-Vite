import { OrderStatusCode } from '~/types'
const calcWidthActiveStatusBar = (statusCode: number) => {
  const { delivered, shipping, processing } = OrderStatusCode

  if (statusCode >= delivered) {
    return 'after:w-[100%]'
  }

  if (statusCode >= shipping) {
    return 'after:w-[66%]'
  }

  if (statusCode >= processing) {
    return 'after:w-[33%]'
  }

  return 'after:w-0'
}

export { calcWidthActiveStatusBar }
