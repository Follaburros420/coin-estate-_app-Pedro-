/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Investment() {
  return (
    <div  className="max-w-[1161px] mx-auto w-full pt-[44px] px-5 md:px-12">
        <div className='block lg:flex gap-6'>

            <div className='lg:max-w-[374px] w-full mx-auto p-6 border  border-grey-400 rounded-[26px]'>
                <div className='flex justify-between items-center'>
                <p className='text-20 font-semibold'>Your investments</p>
                <img src='/assets/svg2/icon.svg' alt='' />
                </div>
                <img src='/assets/images/chart1.png' alt='' className='w-fit mx-auto' />
               <div className='flex gap-3 mt-3'>
               <div className=' bg-black-600 p-2 w-full rounded-[8px]'>
                    <div className='flex justify-between items-center'>
                        <p className='text-14 font-regular text-grey-1000'>Tokens</p>
                        <p className='text-14 font-regular text-grey-1100'>+1.1%</p>
                    </div>
                    <h1 className='mt-2 text-32 font-medium'>100</h1>
                </div>
                <div className=' bg-black-600 p-2 w-full rounded-[8px]'>
                    <div className='flex justify-between items-center'>
                        <p className='text-14 font-regular text-grey-1000'>USD</p>
                        <p className='text-14 font-regular text-grey-1100'>+25%</p>
                    </div>
                    <h1 className='mt-2 text-32 font-medium'>25,000</h1>
                </div>
               </div>
            </div>

            <div className='lg:max-w-[609px] w-full mx-auto mt-6 lg:mt-0 p-6 border  border-grey-400 rounded-[26px]'>
               <div className='block md:flex justify-between'>
               <p className='text-20 font-semibold'>Comportamiento USD Vs COP</p>
               <div className='flex gap-4'>
                <img src='/assets/svg2/candle.svg' alt='' className='bg-black-800 border border-black-700 rounded-[5px] p-2.5' />
                <div className='flex gap-2.5  border border-black-700 rounded-[5px] p-2'>
                    <img src='/assets/svg2/dollar1.svg' alt='' />
                    <p className='text-grey-1100  font-semibold'>USD</p>
                    <img src='/assets/svg2/arrowDown.svg' alt='' />
                </div>
               </div>
               </div>
               <div className='mt-4 block md:flex justify-between'>
               <div className='flex  gap-1 items-center'>
                <p className='text-14 font-regular text-grey-1300'>Dollar/COP</p>
                <img src='/assets/svg2/arrowDown.svg' alt=''  />
               </div>
               <div className='flex gap-2.5 mt-4 md:mt-0'>
                <p className='text-10 font-medium border border-black-700 rounded-full px-4 text-center py-1 text-grey-1200'>1h</p>
                <p className='text-10 font-medium border border-black-700 rounded-full px-4 text-center py-1 text-grey-1200'>3h</p>
                <p className='text-10 font-medium border border-black-700 rounded-full px-4 text-center py-1 text-grey-1200'>1d</p>
                <p className='text-10 font-medium border border-black-700 rounded-full px-4 text-center py-1 text-grey-1200'>1w</p>
                <p className='text-10 font-medium text-center py-1 border border-black-700 rounded-full px-3  text-grey-1200'>1m</p>

               </div>

               </div>
               <p className='text-20 font-semibold'>Currencies</p>
               <img src='/assets/images/chart2.png' alt='' className='mt-6 w-fit mx-auto' />

            </div>
        </div>
      
    </div>
  )
}
