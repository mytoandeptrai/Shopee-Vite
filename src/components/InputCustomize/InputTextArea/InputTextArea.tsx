import React from 'react'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

// eslint-disable-next-line react/prop-types
const InputTextArea = ({ className, ...props }: Props) => {
  return (
    <textarea
      rows={5}
      className={`mt-6 w-full resize-none rounded border border-[#00000024] p-3 outline-none focus:border-[#0000008a] ${className}`}
      {...props}
    />
  )
}

export default InputTextArea
