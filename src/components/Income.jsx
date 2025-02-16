/* eslint-disable @next/next/no-img-element */
import React from 'react';
import GoogleMapComponent from './GoogleMap';
import { useQueryGetTokenCopPrice, useQueryGetTokenPercentage } from '@/hooks/query';

const locations = [
  { Latitude: 37.7749, Longitude: -122.4194 }, // San Francisco
  { Latitude: 34.0522, Longitude: -118.2437 }, // Los Angeles
  { Latitude: 40.7128, Longitude: -74.006 }, // New York
];
export default function Income() {
  const { data: tokenPrice } = useQueryGetTokenCopPrice();
  const { data: getTokenCalculation, refetch: refetchPercentage } = useQueryGetTokenPercentage();
  console.log({ tokenPrice });
  return (
    <div className='max-w-[1161px] mx-auto w-full px-6 md:px-12'>
      <div className='  grid grid-cols-2 gap-7'>
        <div className=''>
          <div className='border border-grey-400 rounded-[26px] px-4 md:px-11 py-4 md:py-9 justify-center flex flex-col sm:flex-row items-center gap-8 md:gap-20'>
            <div>
              <p className='text-18 md:text-26 font-ubuntu font-medium'>Total Investment </p>
              <div className='mt-4 md:mt-9 bg-grey-500 flex gap-5 items-center max-w-[200px] rounded-[8px] py-3 px-2'>
                <p className='bg-Yellow-100 font-bold text-black-100 leading-6 px-[8px] rounded-[8px] py-1'>
                  {getTokenCalculation?.totalTokenBalance}
                </p>
                <p className='text-20 font-bold font-ubuntu'>USD</p>
              </div>
              <p className='mt-4 text-14 font-regular text-grayTwo '>
                ={getTokenCalculation?.totalTokenBalance * tokenPrice} COP
              </p>
            </div>
            <div>
              <p className='text-18 md:text-26 font-ubuntu font-medium'>Monthly Income </p>
              <div className='mt-4 md:mt-9 bg-grey-500 flex gap-5 items-center max-w-[200px] rounded-[8px] p-3'>
                <p className='bg-zink  px-4 rounded-[8px] py-1'>{getTokenCalculation?.totalEarnings}</p>
                <p className='text-20 font-bold font-ubuntu'>USD</p>
              </div>
              <p className='mt-4 text-14 font-regular text-grayTwo '>
                ={getTokenCalculation?.totalEarnings * tokenPrice || 0} COP
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className='border border-grey-400 rounded-[16px] px-5 mt-7 w-full lg:mt-0 overflow-hidden pt-4'>
            <div>
              <div className='flex justify-between items-center'>
                <p className='font-semibold text-20 '>Map View</p>
                <img src='/assets/svg2/menuIcon.svg' alt='' />
              </div>
            </div>
            {/* <img
              src="/assets/images/map.png"
              alt=""
              className="mt-5 w-fit mx-auto"
            /> */}
            <GoogleMapComponent coordinates={locations} />
          </div>
          <div className='max-w-[331px] w-full mx-auto flex items-center justify-between gap-5 mt-5 '>
            <div className='flex flex-col items-center lg:items-end gap-3 text-20 lg:h-[110px] xl:h-[60px] justify-between '>
              <p>You invested</p>
              <p>in</p>
            </div>
            <div className='flex flex-col items-center lg:items-end gap-3 text-20 text-darkCyan font-semibold lg:h-[110px] xl:h-[60px] justify-between '>
              <p>200</p>
              <p>4</p>
            </div>
            <div className='flex flex-col items-start gap-3 text-20 font-semibold lg:h-[110px] xl:h-[60px] justify-between '>
              <p className='text-Yellow-100 '>Tokens</p>
              <p>Proyects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
