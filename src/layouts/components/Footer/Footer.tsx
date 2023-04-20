import React from 'react'
import { IconPaymentList } from '~/components/Icons'
import classNames from '~/utils/classNames'
import { customerAbout, customerCares, customerDownloads, customerSocials } from './Footer.conts'
import QrCodeImage from '~/assets/images/download-qrcode.png'
interface FooterProps {
  className?: string
}

const customerInfoRender = [
  {
    title: 'CHĂM SÓC KHÁCH HÀNG',
    infoRenderArray: customerCares,
    iconRender: null
  },
  {
    title: 'VỀ SHOPBEE',
    infoRenderArray: customerAbout,
    iconRender: null
  },
  {
    title: 'THANH TOÁN',
    infoRenderArray: [],
    iconRender: <IconPaymentList />
  }
]

const Footer = ({ className = '' }: FooterProps) => {
  return (
    <footer className={classNames('border-t-4 border-orangeCustomize bg-[#fbfbfb] py-10 text-[#000000a6]', className)}>
      <div className='layout-container'>
        <div className='grid grid-cols-2 gap-x-2 gap-y-6 text-xs lg:grid-cols-5'>
          {customerInfoRender.map((customerInfo, index) => (
            <div key={index}>
              <h3 className='font-semibold text-[#000000de]'>{customerInfo.title}</h3>
              {customerInfo.iconRender ? customerInfo.iconRender : null}
              <ul className='mt-5 flex flex-col gap-y-3'>
                {customerInfo.infoRenderArray.map((info, num) => (
                  <li key={info} className='cursor-pointer'>
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className='font-semibold text-[#000000de]'>THEO DÕI CHÚNG TÔI TRÊN</h3>
            <ul className='mt-5 flex flex-col gap-y-3'>
              {customerSocials.map((social) => (
                <li className='flex items-center gap-x-2' key={social.display}>
                  <img
                    key={social.display}
                    alt={social.display}
                    src={social.image}
                    className='h-[18px] w-[18px] cursor-pointer'
                  />
                  <span className='cursor-pointer'>{social.display}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='hidden lg:block'>
            <h3 className='font-semibold text-[#000000de]'>TẢI ỨNG DỤNG SHOPBEE NGAY THÔI</h3>
            <div className='mt-5 flex gap-3'>
              <img src={QrCodeImage} alt='download-qrcode' className='h-20 w-20 cursor-pointer' />
              <div className='flex flex-col justify-between'>
                {customerDownloads.map((download) => (
                  <img
                    key={download.key}
                    alt={download.key}
                    src={download.image}
                    className='h-[22px] w-fit cursor-pointer'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
