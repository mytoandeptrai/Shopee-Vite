import React from 'react'

type Props = {
  title: string
  desc: string
  subtitle?: React.ReactNode
  children: React.ReactNode
}

const CommonLayout = ({ title, desc, subtitle = '', children }: Props) => {
  return (
    <div className='rounded bg-white p-5 pb-10'>
      <div className='flex flex-wrap justify-between'>
        <div className='border-b-[1px] border-[#efefef] pb-5'>
          <h2 className='text-lg font-medium'>{title}</h2>
          <span>{desc}</span>
        </div>
        {subtitle && subtitle}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default CommonLayout
