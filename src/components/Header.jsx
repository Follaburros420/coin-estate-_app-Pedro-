/* eslint-disable @next/next/no-img-element */
import { Router, useRouter } from 'next/router';
import React from 'react';

function Header() {
  const router = useRouter();
  return (
    <div className=' bg-gradient-to-r from-black-200 to-black-300 min-h-[628px] px-6 '>
      <div className='max-w-[1161px] mx-auto w-full block lg:flex gap-8 pt-28 md:pt-14 py-10 lg:py-20'>
        <div className='mx-auto lg:mx-0 max-w-[608px] flex lg:hidden'>
          {' '}
          <img src='/assets/images/plaza.png' alt='' />
        </div>
        <div className='py-10'>
          <p className='max-w-[543px] leading-[35px] lg:leading-[48px] mx-auto lg:mx-0 text-center lg:text-start text-white text-28 lg:text-40 font-inter font-extrabold '>
            <span className='text-yellow'>Gana En Dólares</span> Invirtiendo En El Sector Inmobiliario De Los Estados
            Unidos.
          </p>
          <p className='mt-10 text-14 font-inter text-center leading-[23px] lg:text-start text-white font-medium max-w-[510px] mx-auto lg:mx-0'>
            ¡Di adiós a los altos montos de inversión para entrar al mercado inmobiliario de EE.UU.!
            <span className='font-bold '>
              {' '}
              Invierte<span className='text-yellow '> desde 100.000 COP</span>
            </span>{' '}
            y comienza a generar <span className='text-yellow '> ingresos pasivos en dólares.</span> Aprovecha esta{' '}
            <span className='font-bold '>oportunidad única</span> de <span className='font-bold '>invertir</span> como{' '}
            <span className='font-bold '>pocos en un sector que todos conocen.</span>
          </p>
          <div className='mt-6 flex gap-4 justify-center lg:justify-start'>
            <button
              onClick={() => router.push('/auth/create-account')}
              className='text-white text-12 bg-yellow rounded-full py-3 px-8 font-inter font-semibold'>
              Regístrate
            </button>
            <button
              onClick={() => router.push('/working')}
              className='text-yellow text-12 border border-yellow rounded-full py-3 px-8 font-inter font-semibold'>
              Conoce Más
            </button>
          </div>
        </div>
        <div className='mx-auto lg:mx-0 max-w-[608px] hidden lg:flex'>
          {' '}
          <img src='/assets/images/plaza.png' alt='' />
        </div>
      </div>
    </div>
  );
}

export default Header;
