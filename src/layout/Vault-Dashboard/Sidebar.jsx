'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StyledImage from '@/components/StyedImage';
import clsxm from '@/utils/clsxm';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Sidebar_Data, Sidebar_Data_Vault } from '@/_mock/data';

export default function Sidebar({ isOpen }) {
  const [isActive, setIsActive] = useState();
  const [isDark, setIsDark] = useState(true);
  const location = usePathname();
  const searchParams = useSearchParams();

  const paramsId = searchParams.get('id');
  const amount = searchParams.get('amount');
  const tokenAddress = searchParams.get('tokenAddress');
  const tab = searchParams.get('tab');
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial='closed'
      animate={isOpen ? 'open' : 'closed'}
      transition={{ type: 'tween', duration: 0.3 }}
      className={clsxm(
        'w-full shadow-lg max-w-[292px] block fixed left-0 top-[75px] lg:top-[80px] bottom-0 z-50 glass xl:translate-x-0'
      )}
    >
      <div className='w-full px-4 py-9 h-full flex flex-col justify-between '>
        <div className='flex flex-col  '>
          {Sidebar_Data_Vault.map((item, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  setIsActive(item.id);
                }}
                className={clsxm('pl-5 py-4  w-full ', location === item.routes && 'bg-black-800 rounded-[9px] ')}>
                <Link
                  href={
                    item.routes + `&id=${paramsId}&amount=${amount}&tokenAddress=${tokenAddress}`
                  }>
                  <div
                    className={clsxm(
                      'flex gap-3 items-center w-full h-[40px] ',
                      location === item.routes &&
                        'bg-[url(/assets/svg/RightBorder.svg)] bg-contain bg-right bg-no-repeat ',
                    )}>
                    <StyledImage src={location === item.routes ? item.activeImg : item.nonActiveImg} className='w-6 ' />
                    <p
                      className={clsxm(
                        'text-18 font-ubuntu',
                        location === item.routes ? 'text-Yellow-100 ' : 'text-grey-1500 ',
                      )}>
                      {item.title}
                    </p>
                  </div>
                </Link>
              </button>
            );
          })}
        </div>
        <div className='lg:hidden flex flex-col items-start gap-4 w-full justify-end  '>
          <div className='bg-black-600 py-[14px] px-4 rounded-[6px] w-full flex items-center justify-between '>
            <div className='flex items-center gap-3 w-full '>
              <div className='bg-black-700 w-full max-w-9 h-9 flex items-center justify-center rounded-[8px] p-1 '>
                <StyledImage src='/assets/svg/Token.svg' className='w-9 h-9 ' />
              </div>
              <p>$0</p>
            </div>
            <StyledImage src='/assets/svg/Exclamation.svg' className='w-8 h-8 ' />
          </div>
          <div className='bg-black-600 py-[14px] px-4 rounded-[6px] w-full flex items-center justify-between '>
            <div className='flex items-center gap-3 w-full '>
              <div className='bg-black-700 w-full max-w-9 h-9 flex items-center justify-center rounded-[8px] p-1 '>
                <StyledImage src='/assets/svg/Dollar.svg' className='w-9 h-9 ' />
              </div>
              <p>0,00</p>
            </div>
            <StyledImage src='/assets/svg/Exclamation.svg' className='w-8 h-8 ' />
          </div>
          <div className='bg-black-600 px-5 py-[14px] w-full max-w-[76px] flex items-center justify-start rounded-[8px] '>
            <StyledImage src='/assets/svg/Notification.svg' className='w-[38px] h-[38px] ' />
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
            className='flex items-center justify-center mt-12 rounded-[8px] gap-5 bg-red-400 w-full p-2 '>
            <StyledImage src='/assets/svg/Logout.svg' className='w-6 h-6 ' />
            <p className='text-red-300 text-18 font-ubuntu'>Logout</p>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
