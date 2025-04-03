/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function Footer() {
  return (
    <div className='bg-black-100 py-8  px-4'>
      <div className='max-w-[1161px] mx-auto w-full pt-10 mt-0 md:mt-0 '>
        <div className='block md:flex justify-between items-center '>
          <img src='/assets/svg/logo.svg' alt='' className=' max-w-[180px] mx-auto md:mx-0' />
          <div className='flex gap-4 justify-center md:justify-start mt-8'>
            <a href='https://www.facebook.com/share/15wZLWvwiL/?mibextid=wwXIfr'>
              {' '}
              <img src='/assets/svg/fb.svg' alt='' />
            </a>
            <a href='https://www.linkedin.com/company/coinestate'>
              <img src='/assets/svg/linkedin.svg' alt='' />
            </a>
            <a href='https://www.instagram.com/thecoinestate/'>
              {' '}
              <img src='/assets/svg/insta.svg' alt='' />
            </a>
            <a href='https://www.tiktok.com/@thecoinestate?_t=ZS-8vBhkXMGyl3&_r=1'>
              {' '}
              <img src='/assets/svg/tiktok.svg' alt='' />
            </a>
            <a href='https://youtube.com/@coinestate-i1b?si=C0id929nzkYISapt'>
              <img src='/assets/svg/youTube.svg' alt='' />
            </a>
          </div>
        </div>
        <hr className='text-white mt-6 ' />
        <p className='text-14 font-regular pb-8  text-center md:text-start font-inter text-white mt-6'>
          Copyright © 2024 CoinEstate. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
