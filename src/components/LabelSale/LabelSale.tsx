import React from 'react'

interface LabelSaleProps {
  children: React.ReactNode
}

const LabelSale = ({ children }: LabelSaleProps) => {
  return (
    <span className='w-11 rounded-sm border border-redCustomize bg-[#fff0f1] px-1 py-[2px] text-xs text-redCustomize'>
      {children}
    </span>
  )
}

export default LabelSale
