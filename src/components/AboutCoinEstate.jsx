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
            <span className='inline-flex items-center gap-2 rounded-full bg-yellow/15 px-4 py-1 text-12 font-semibold uppercase tracking-[0.24em] text-yellow/80 dark:bg-yellow/10 backdrop-blur-sm animate-fade-in'>
              ¿Qué hacemos en CoinEstate?
            </span>
            <h2 className='text-28 font-extrabold leading-tight lg:text-36 animate-slide-up' style={{animationDelay: '0.2s'}}>
              Tokenizamos propiedades reales en EE. UU. para que inviertas con confianza desde cualquier lugar.
            </h2>
            <p className='text-16 leading-7 text-black-100/70 dark:text-white/70 animate-slide-up' style={{animationDelay: '0.4s'}}>
              Seleccionamos proyectos con plusvalía comprobada, los estructuramos legalmente y los abrimos a la comunidad de inversionistas a través de participaciones digitales. Así puedes acceder a activos premium con tickets flexibles y seguimiento total.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {FEATURE_SUMMARY.map((item, index) => (
              <div
                key={item.id}
                className='group relative overflow-hidden rounded-[24px] border border-gray-200/60 bg-white p-6 text-black-100 shadow-[0_30px_80px_-65px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_40px_100px_-60px_rgba(15,23,42,0.45)] dark:border-gray-700/60 dark:bg-black-900/60 dark:text-white animate-scale-in'
                style={{animationDelay: `${0.6 + index * 0.1}s`}}
              >
                <div className='absolute inset-0 bg-gradient-to-br from-yellow/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='relative z-10'>
                  <h3 className='text-16 font-semibold transition-colors duration-300 group-hover:text-yellow dark:group-hover:text-yellow-300'>{item.title}</h3>
                  <p className='mt-2 text-14 leading-6 opacity-80 transition-opacity duration-300 group-hover:opacity-100'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/marketplace')}
            className='group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-black-100 to-black-200 px-8 py-3 text-14 font-semibold text-white shadow-[0_25px_60px_-35px_rgba(12,22,44,0.55)] transition-all duration-300 hover:scale-105 hover:shadow-[0_35px_80px_-40px_rgba(12,22,44,0.65)] dark:from-white dark:to-gray-200 dark:text-black-100 animate-slide-up'
            style={{animationDelay: '0.8s'}}
            type='button'
          >
            <span className='relative z-10'>Ver marketplace</span>
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-yellow to-yellow-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          </button>
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          {TOKENS.map((items, idx) => (
            <div
              key={`${items.id}____${idx}`}
              className='group relative overflow-hidden rounded-[28px] border border-gray-200/60 bg-white p-6 text-black-100 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_50px_120px_-50px_rgba(15,23,42,0.45)] dark:border-gray-700/60 dark:bg-black-900/60 dark:text-white animate-slide-in-right'
              style={{animationDelay: `${1 + idx * 0.1}s`}}
            >
              <div className='absolute inset-0 bg-gradient-to-br from-yellow/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <div className='relative z-10'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow/15 to-yellow/25 text-yellow transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-yellow/25 group-hover:to-yellow/35 dark:bg-yellow/10 dark:group-hover:from-yellow/25 dark:group-hover:to-yellow/35'>
                  <StyledImage className='h-7 w-7 transition-transform duration-300 group-hover:scale-110' src={items.img} alt='' imgClassName='object-contain' />
                </div>
                <p className='mt-6 text-14 leading-6 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:text-black-100 dark:group-hover:text-white'>{items.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutCoinEstate;
