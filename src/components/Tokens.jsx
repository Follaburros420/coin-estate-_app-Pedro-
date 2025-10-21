import { Tokens_Cards_Data } from '@/_mock/data';
import React from 'react';
import StyledImage from './StyedImage';

function Tokens() {
  return (
    <section className='relative -mt-12 overflow-hidden px-6 pb-20'>
      <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] w-full bg-gradient-to-b from-white via-white to-transparent dark:from-[#0f1321] dark:via-[#0b111d] dark:to-transparent' />
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto max-w-2xl text-center space-y-4'>
          <span className='inline-flex items-center justify-center gap-2 rounded-full border border-yellow/40 bg-yellow/10 px-4 py-1 text-12 font-semibold uppercase tracking-[0.24em] text-yellow/80 dark:border-yellow/20 dark:bg-yellow/10'>
            Invertir es simple
          </span>
          <h2 className='text-28 font-extrabold leading-tight text-black-100 dark:text-white lg:text-36'>
            Haz crecer tu patrimonio sin complicaciones
          </h2>
          <p className='text-16 leading-7 text-black-100/70 dark:text-white/70'>
            Simplificamos el acceso a inversiones inmobiliarias tokenizadas para que puedas empezar hoy mismo, sin papeleo interminable ni montos inalcanzables.
          </p>
        </div>
        <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Tokens_Cards_Data.map((items, idx) => (
            <article
              key={`${items.id}___${idx}`}
              className='group relative overflow-hidden rounded-[28px] border border-gray-200/60 bg-white p-7 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-[#141a2e] dark:shadow-[0_45px_110px_-70px_rgba(0,0,0,0.65)]'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-yellow/0 via-yellow/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-yellow/15' />
              <div className='relative flex h-full flex-col gap-5 text-black-100 dark:text-white'>
                <span className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow/15 text-yellow dark:bg-yellow/25'>
                  <StyledImage className='h-6 w-6' src={items.img} alt='' imgClassName='object-contain' />
                </span>
                <p className='text-15 leading-7 text-black-100/80 transition-colors duration-200 group-hover:text-black-100 dark:text-white/80 dark:group-hover:text-white'>
                  {items.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tokens;
