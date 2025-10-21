'use client';
import React, { useEffect, useState } from 'react';
import StyledImage from '@/components/StyedImage';
import clsxm from '@/utils/clsxm';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar_Data } from '@/_mock/data';

export default function Sidebar({ isOpen }) {
  const [isActive, setIsActive] = useState();
  const [isDark, setIsDark] = useState(true);
  const location = usePathname();
  console.log({location})

  return (
    <div
      className={clsxm(
        'transform transition-all duration-500 ease-in-out w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] max-w-[292px] block fixed left-0 top-[75px] lg:top-[80px] bottom-0 z-50 glass-enhanced-dark border-r border-white/10 backdrop-blur-xl',
        isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0',
      )}>
      <div className='w-full px-4 py-9 h-full flex flex-col justify-between'>
        <div className='flex flex-col'>
          {Sidebar_Data.map((item, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsActive(item.id);
                }}
                className={clsxm(
                  'group relative pl-5 py-4 w-full transition-all duration-300 hover:scale-105',
                  location === item.routes && 'bg-gradient-to-r from-yellow/20 to-yellow/10 rounded-[12px] border border-yellow/30'
                )}>
                <Link href={item.routes}>
                  <div
                    className={clsxm(
                      'flex gap-3 items-center w-full h-[40px] transition-all duration-300',
                      location === item.routes &&
                        'bg-[url(/assets/svg/RightBorder.svg)] bg-contain bg-right bg-no-repeat',
                    )}>
                    <div className={clsxm(
                      'transition-all duration-300 group-hover:scale-110',
                      location === item.routes && 'animate-pulse'
                    )}>
                      <StyledImage src={location === item.routes ? item.activeImg : item.nonActiveImg} className='w-6' />
                    </div>
                    <p
                      className={clsxm(
                        'text-18 font-ubuntu transition-all duration-300 group-hover:text-yellow-300',
                        location === item.routes ? 'text-Yellow-100 font-semibold' : 'text-grey-1500',
                      )}>
                      {item.title}
                    </p>
                  </div>
                </Link>
              </button>
            );
          })}
        </div>
        <div className='lg:hidden flex flex-col items-start gap-4 w-full justify-end'>
          <div className='group bg-gradient-to-r from-black-600 to-black-700 py-[14px] px-4 rounded-[12px] w-full flex items-center justify-between border border-white/10 transition-all duration-300 hover:border-yellow/30'>
            <div className='flex items-center gap-3 w-full'>
              <div className='bg-gradient-to-br from-yellow/20 to-yellow/30 w-full max-w-9 h-9 flex items-center justify-center rounded-[8px] p-1 transition-all duration-300 group-hover:scale-110'>
                <StyledImage src='/assets/svg/Token.svg' className='w-9 h-9 transition-all duration-300' />
              </div>
              <p className="font-semibold transition-colors duration-300 group-hover:text-yellow-300">$0</p>
            </div>
            <StyledImage src='/assets/svg/Exclamation.svg' className='w-8 h-8 transition-all duration-300' />
          </div>
          <div className='group bg-gradient-to-r from-black-600 to-black-700 py-[14px] px-4 rounded-[12px] w-full flex items-center justify-between border border-white/10 transition-all duration-300 hover:border-green/30'>
            <div className='flex items-center gap-3 w-full'>
              <div className='bg-gradient-to-br from-green/20 to-green/30 w-full max-w-9 h-9 flex items-center justify-center rounded-[8px] p-1 transition-all duration-300 group-hover:scale-110'>
                <StyledImage src='/assets/svg/Dollar.svg' className='w-9 h-9 transition-all duration-300' />
              </div>
              <p className="font-semibold transition-colors duration-300 group-hover:text-green-300">0,00</p>
            </div>
            <StyledImage src='/assets/svg/Exclamation.svg' className='w-8 h-8 transition-all duration-300' />
          </div>
          <div className='group bg-gradient-to-r from-black-600 to-black-700 px-5 py-[14px] w-full max-w-[76px] flex items-center justify-start rounded-[12px] border border-white/10 transition-all duration-300 hover:border-blue/30'>
            <StyledImage src='/assets/svg/Notification.svg' className='w-[38px] h-[38px] transition-all duration-300 group-hover:scale-110' />
          </div>
        </div>
        <div>
          {/* <div className="flex items-center justify-between px-5  ">
            <button
              className={clsxm(
                "w-[72px] rounded-full p-[1px] flex bg-grey-500 "
                // isDark ? "float-right" : "float-left"
              )}
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <StyledImage
                  src="/assets/svg/DarkMode.svg"
                  className={clsxm("w-8 h-8 ", isDark && "ml-auto")}
                />
              ) : (
                <StyledImage
                  src="/assets/svg/LightMode.svg"
                  className={clsxm("w-8 h-8 ", isDark && " mr-auto")}
                />
              )}
            </button>
            <button className="flex items-center gap-4 ">
              <StyledImage
                src="/assets/svg/Language.svg"
                className="w-6 h-6 "
              />
              <StyledImage
                src="/assets/svg/downArrow.svg"
                className="w-6 h-6 "
              />
            </button>
          </div> */}
          <button
            onClick={() => {
              mutateLogout();
              refetch();
              setTimeout(() => refetch(), 500);
              router.push('/');
            }}
            className='group flex items-center justify-center mt-12 rounded-[12px] gap-5 bg-gradient-to-r from-red-400 to-red-500 w-full p-3 border border-red-400/30 transition-all duration-300 hover:border-red-300 hover:scale-105 hover:shadow-[0_8px_25px_-5px_rgba(239,68,68,0.3)]'>
            <StyledImage src='/assets/svg/Logout.svg' className='w-6 h-6 transition-all duration-300 group-hover:scale-110' />
            <p className='text-red-300 text-18 font-ubuntu transition-colors duration-300 group-hover:text-red-200'>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}
