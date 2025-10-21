import React from 'react';
import CardSlider from './CardSlider';

export default function Slider() {
  return (
    <section className='relative overflow-hidden px-6 py-20'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,200,44,0.12),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,200,44,0.08),_transparent_55%)]' />
      <div className='relative mx-auto flex max-w-7xl flex-col gap-12'>
        <header className='mx-auto max-w-3xl text-center space-y-4'>
          <span className='inline-flex items-center justify-center gap-2 rounded-full border border-yellow/40 bg-yellow/10 px-4 py-1 text-12 font-semibold uppercase tracking-[0.24em] text-yellow/80 dark:border-yellow/20 dark:bg-yellow/5'>
            Testimonios
          </span>
          <h2 className='text-28 font-extrabold leading-tight text-black-100 dark:text-white md:text-36'>
            ¿Qué piensan nuestros inversionistas?
          </h2>
          <p className='text-16 leading-7 text-black-100/70 dark:text-white/70'>
            Historias reales de personas que ya generan rendimientos con proyectos tokenizados respaldados por CoinEstate.
          </p>
        </header>

        <div className='rounded-[32px] border border-gray-200/60 bg-white/95 p-6 shadow-[0_35px_120px_-60px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_45px_140px_-80px_rgba(0,0,0,0.6)]'>
          <CardSlider />
        </div>

        <div className='flex items-center justify-center gap-4'>
          <button
            className='swiperButtonPrev flex h-12 w-12 items-center justify-center rounded-full border border-gray-200/60 bg-white text-black-100 transition hover:bg-gray-100 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
            type='button'
            aria-label='Ver testimonio anterior'
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M15 18L9 12L15 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
          <button
            className='swiperButtonNext flex h-12 w-12 items-center justify-center rounded-full border border-yellow/40 bg-yellow text-black-100 transition hover:bg-yellow/80 dark:border-yellow/30'
            type='button'
            aria-label='Ver siguiente testimonio'
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M9 6L15 12L9 18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
