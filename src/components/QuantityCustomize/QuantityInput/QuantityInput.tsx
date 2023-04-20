import { InputNumber } from '~/components/InputCustomize'

interface QuantityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (quantity: number) => void
}

const QuantityInput = ({ handleChange, ...props }: QuantityInputProps) => {
  return (
    <InputNumber
      onChange={(e) => handleChange(Number(e.target.value))}
      className='!h-8 w-12 border border-black017 px-0 text-center outline-none'
      {...props}
    />
  )
}

export default QuantityInput
