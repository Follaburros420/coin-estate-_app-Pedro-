import { TOKENS } from '@/_mock/data';
import React from 'react';
import StyledImage from './StyedImage';
import { useRouter } from 'next/router';

const FEATURE_SUMMARY = [
  {
    id: 1,
    title: 'Rendimientos en dólares',
    description:
      'Recibe ingresos periódicos en USD provenientes del arrendamiento y la valorización de los inmuebles que tokenizamos.',
  },
  {
    id: 2,
    title: 'Custodia legal segura',
    description:
      'Cada proyecto cuenta con respaldo jurídico en Colombia y Estados Unidos para proteger tu inversión desde el primer día.',
  },
];

function AboutCoinEstate() {
  const router = useRouter();

  return (
    <section className='relative px-6 py-20'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#f6f9ff] via-white to-white dark:from-[#0f1729] dark:via-[#0b1220] dark:to-[#080d18]' />
      <div className='mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:items-start text-black-100 dark:text-white'>
        <div className='space-y-8'>
          <div className='space-y-4'>
            <span className='inline-flex items-center gap-2 rounded-full bg-yellow/15 px-4 py-1 text-12 font-semibold uppercase tracking-[0.24em] text-yellow/80 dark:bg-yellow/10'>
              ¿Qué hacemos en CoinEstate?
            </span>
            <h2 className='text-28 font-extrabold leading-tight lg:text-36'>
              Tokenizamos propiedades reales en EE. UU. para que inviertas con confianza desde cualquier lugar.
            </h2>
            <p className='text-16 leading-7 text-black-100/70 dark:text-white/70'>
              Seleccionamos proyectos con plusvalía comprobada, los estructuramos legalmente y los abrimos a la comunidad de inversionistas a través de participaciones digitales. Así puedes acceder a activos premium con tickets flexibles y seguimiento total.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {FEATURE_SUMMARY.map((item) => (
              <div
                key={item.id}
                className='rounded-[24px] border border-gray-200/60 bg-white p-6 text-black-100 shadow-[0_30px_80px_-65px_rgba(15,23,42,0.35)] dark:border-gray-700/60 dark:bg-black-900/60 dark:text-white'
              >
                <h3 className='text-16 font-semibold'>{item.title}</h3>
                <p className='mt-2 text-14 leading-6 opacity-80'>{item.description}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/marketplace')}
            className='inline-flex items-center justify-center rounded-full bg-black-100 px-8 py-3 text-14 font-semibold text-white shadow-[0_25px_60px_-35px_rgba(12,22,44,0.55)] transition hover:bg-black-200 dark:bg-white dark:text-black-100'
            type='button'
          >
            Ver marketplace
          </button>
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          {TOKENS.map((items, idx) => (
            <div
              key={`${items.id}____${idx}`}
              className='relative overflow-hidden rounded-[28px] border border-gray-200/60 bg-white p-6 text-black-100 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_45px_110px_-60px_rgba(15,23,42,0.45)] dark:border-gray-700/60 dark:bg-black-900/60 dark:text-white'
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-yellow/15 text-yellow dark:bg-yellow/10'>
                <StyledImage className='h-7 w-7' src={items.img} alt='' imgClassName='object-contain' />
              </div>
              <p className='mt-6 text-14 leading-6 opacity-80'>{items.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutCoinEstate;
