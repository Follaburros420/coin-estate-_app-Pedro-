'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

export default function Simulator() {
  const [value, setValue] = useState(0);
  const [yearValue, setYearValue] = useState(1);

  // Update the value as the user swipes
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleYearChange = (e) => {
    setYearValue(e.target.value);
  };

  return (
    <div className='w-full mt-6  '>
      <div className='border border-base-800 glass rounded-[8px] p-5 w-full '>
        <p className='text-20 sm:text-24 font-bold text-center '>Simulator</p>
        <div>
          <p className='text-14 sm:text-16 font-medium font-ubuntu '>Exchange Rate= </p>
          <p className='text-14 sm:text-16 font-ubuntu text-center mb-5 '>“1$= X currency(4000 Copan's)”</p>
          <p className=' font-medium font-ubuntu '>How many tokens would you buy.</p>
        </div>
        <div className='w-full mt-7 '>
          <input
            type='range'
            min='0'
            max='100'
            value={value}
            onChange={handleChange}
            className='w-full h-1 bg-Yellow-300 rounded-lg appearance-none cursor-pointer accent-indigo-500 range-slider'
          />
          <div className='flex items-center justify-between  '>
            <div
              style={{ backgroundImage: `url(/assets/svg/RangeBg.svg)` }}
              className='font-medium bg-contain bg-no-repeat w-12 h-10 flex items-center  justify-center '>
              <p className='font-ubuntu font-medium mt-2 '>{value}</p>
            </div>
            <p className='font-ubuntu font-medium '>100</p>
          </div>
        </div>
        <div className='flex items-center justify-between mt-7 '>
          <div>
            <p className='font-medium font-ubuntu '>Cop,4000</p>
            <p className='font-medium font-ubuntu '>USD,1</p>
          </div>
          <div>
            <p className='font-medium font-ubuntu '>Cop,400000</p>
            <p className='font-medium font-ubuntu '>USD,100</p>
          </div>
        </div>
        <div className='mt-10 '>
          <p className=' font-medium font-ubuntu  '>How many years you want to invest.</p>
          <div className='w-full mt-5 '>
            <input
              type='range'
              min='0'
              max='5'
              value={yearValue}
              onChange={handleYearChange}
              className='w-full h-1 bg-Yellow-300 rounded-lg appearance-none cursor-pointer accent-indigo-500 YearRange-slider'
            />
            <div className='flex items-center justify-between  '>
              <div
                style={{ backgroundImage: `url(/assets/svg/RangeBg.svg)` }}
                className='font-medium bg-contain bg-no-repeat w-12 h-10 flex items-center  justify-center '>
                <p className='font-ubuntu font-medium mt-2 '>{yearValue}</p>
              </div>
              <p className='font-ubuntu font-medium '>5</p>
            </div>
          </div>
        </div>
        <div className='sm:text-20 font-medium font-ubuntu text-center mt-5 '>
          <div>
            <p className=' '>Accumulated rent</p>
            <p>$1000</p>
          </div>
          <div className='mt-7 '>
            <p className=' '>Token valuation</p>
            <p>15%</p>
          </div>
        </div>
      </div>
      {/* <button className="text-Yellow-300 font-ubuntu flex justify-center md:justify-end w-full mt-2 ">
        Read More
      </button> */}
    </div>
  );
}
