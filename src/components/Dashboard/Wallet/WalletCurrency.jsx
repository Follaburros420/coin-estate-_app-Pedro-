import InfoTooltip from '@/components/InfoIcon';
import StyledImage from '@/components/StyedImage';
import { formatNumberIndianStyle } from '@/utils/wagmiConfig';
import React from 'react';

export default function WalletCurrency({ total, available }) {
  return (
    <div className='w-full glass-enhanced-dark border border-white/10 p-6 rounded-[26px] mt-6 lg:mt-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)]'>
      <p className='text-20 sm:text-29 font-bold text-center sm:text-start bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>Currency</p>
      <div className='grid sm:grid-cols-3 gap-6 place-items-center w-full max-w-[90%] mx-auto my-8'>
        <div className='group flex flex-col justify-between h-full transition-all duration-300 hover:scale-105'>
          <p className='text-20 sm:text-26 leading-none transition-colors duration-300 group-hover:text-yellow-300'>Investor´s Currency</p>
          <div className='flex items-center justify-center sm:justify-start gap-5 sm:gap-14 mt-3 sm:mt-5'>
            <StyledImage src='/assets/svg/AmericaFlag.svg' className='w-10 h-8 transition-all duration-300 group-hover:scale-110' />
            <p className='text-16 font-medium transition-colors duration-300 group-hover:text-yellow-300'>Dollar</p>
          </div>
        </div>
        <div className='group flex flex-col justify-between h-full transition-all duration-300 hover:scale-105'>
          <p className='text-20 sm:text-26 transition-colors duration-300 group-hover:text-yellow-300'>Total Amount</p>
          <p className='text-16 font-medium ml-6 mt-3 sm:mt-5 transition-colors duration-300 group-hover:text-yellow-300'>{total}</p>
        </div>
        <div className='w-fit group flex flex-col justify-between h-full transition-all duration-300 hover:scale-105'>
          <p className='text-20 sm:text-26 transition-colors duration-300 group-hover:text-yellow-300'>Liquid amount</p>
          <div className='flex items-center gap-3 sm:gap-6 mt-3 sm:mt-5 justify-end'>
            <p className='text-16 font-medium transition-colors duration-300 group-hover:text-yellow-300'>{formatNumberIndianStyle(available?.toFixed(2))}</p>
            <InfoTooltip
              message={
                'Dinero líquido, No incluye el valor de tus tokens.'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
