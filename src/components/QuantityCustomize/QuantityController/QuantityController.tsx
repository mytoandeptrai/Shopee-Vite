import React, { useState } from 'react'
import { IconMinus, IconPlus } from '~/components/Icons'
import classNames from '~/utils/classNames'
import { QuantityButton } from '../QuantityButton'
import { QuantityInput } from '../QuantityInput'

type Props = {
  defaultQuantity?: number
  onChangeValue?: (value: number) => void
  className?: string
}

const QuantityController = ({
  className = '',
  defaultQuantity = 1,
  onChangeValue = () => {
    return
  }
}: Props) => {
  const [quantity, setQuantity] = useState<number>(defaultQuantity)
  const handleIncreaseQuantity = () => {
    setQuantity((prevState) => prevState + 1)
    if (onChangeValue) onChangeValue(quantity + 1)
  }
  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return
    setQuantity((prevState) => prevState - 1)
    if (onChangeValue) onChangeValue(quantity - 1)
  }
  const handleChangeQuantity = (countQuantity: number) => {
    setQuantity(() => countQuantity)
    if (onChangeValue) onChangeValue(countQuantity)
  }

  return (
    <div className={classNames('flex', className)}>
      <QuantityButton onClick={handleDecreaseQuantity}>
        <IconMinus />
      </QuantityButton>
      <QuantityInput value={quantity} handleChange={handleChangeQuantity} />
      <QuantityButton onClick={handleIncreaseQuantity}>
        <IconPlus />
      </QuantityButton>
    </div>
  )
}

export default QuantityController
