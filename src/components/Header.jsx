import { useRouter } from 'next/router';
import React from 'react';

const HERO_STATS = [
  { id: 1, value: '100K COP', label: 'Inversión mínima' },
  { id: 2, value: '11% ~', label: 'Rendimiento anual objetivo' },
  { id: 3, value: '3 - 5 años', label: 'Horizonte estimado' },
];

const CARD_METRICS = [
  { id: 1, value: '11%', label: 'Rendimiento proyectado' },
  { id: 2, value: '870', label: 'Tokens disponibles' },
  { id: 3, value: 'Mensual', label: 'Pagos de dividendos' },
];

const HIGHLIGHTS = [
  'Contratos inteligentes auditados y transparentes',
  'Propiedades con plusvalía comprobada en EE. UU.',
  'Soporte experto durante todo el proceso de inversión',
];

function Header() {
  const router = useRouter();

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-black-500 via-black-600 to-black-800 text-white dark:from-black-900 dark:via-black-800 dark:to-black-900'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,#ffc82c33,transparent_55%)] opacity-80' />
        <div className='absolute left-1/3 top-[-30%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-yellow/25 blur-[140px]' />
        <div className='absolute bottom-[-40%] right-[-20%] h-[520px] w-[520px] rounded-full bg-white/5 blur-[160px]' />
      </div>
      <div className='relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 pb-24 pt-32 lg:flex-row lg:items-start lg:gap-20'>
        <div className='w-full max-w-xl text-center lg:text-left'>
          <span className='inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-11 font-semibold uppercase tracking-[0.25em] text-white/70'>
            Nueva forma de invertir
          </span>
          <h1 className='mt-6 text-36 font-extrabold leading-tight text-white lg:text-52'>
            <span className='text-yellow'>Gana en dólares</span> invirtiendo en el sector inmobiliario de Estados Unidos.
          </h1>
          <p className='mt-6 text-16 leading-7 text-white/80'>
            Di adiós a los altos montos de inversión para participar en el mercado inmobiliario de EE. UU. Invierte desde 100.000 COP y comienza a generar ingresos pasivos en dólares con proyectos inmobiliarios reales respaldados por expertos.
          </p>
          <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start sm:gap-4'>
            <button
              onClick={() => router.push('/auth/create-account')}
              className='w-full max-w-[220px] rounded-full bg-yellow px-8 py-3 text-14 font-semibold text-black-100 shadow-[0_15px_45px_-20px_rgba(255,200,44,0.7)] transition hover:translate-y-[-2px] hover:shadow-[0_20px_60px_-25px_rgba(255,200,44,0.8)] sm:w-auto'
            >
              Regístrate ahora
            </button>
            <button
              onClick={() => router.push('/working')}
              className='w-full max-w-[220px] rounded-full border border-white/40 px-8 py-3 text-14 font-semibold text-white transition hover:border-yellow hover:text-yellow sm:w-auto'
            >
              Conoce más
            </button>
          </div>
          <div className='mt-10 grid w-full gap-4 sm:grid-cols-3'>
            {HERO_STATS.map((stat) => (
              <div
                key={stat.id}
                className='rounded-[26px] border border-white/10 bg-white/5 px-4 py-5 text-left shadow-[0_25px_50px_-30px_rgba(8,8,8,0.9)] backdrop-blur'
              >
                <p className='text-24 font-bold text-yellow'>{stat.value}</p>
                <p className='mt-2 text-12 font-medium uppercase tracking-wide text-white/60'>{stat.label}</p>
              </div>
            ))}
          </div>
          <ul className='mt-8 space-y-3 text-left'>
            {HIGHLIGHTS.map((item) => (
              <li key={item} className='flex items-start gap-3 text-14 text-white/80'>
                <span className='mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-yellow/20 text-12 text-yellow'>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='relative w-full max-w-xl'>
          <div className='absolute -bottom-10 -left-10 hidden h-64 w-64 rounded-full bg-yellow/25 blur-[120px] lg:block' />
          <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 shadow-[0_45px_120px_-40px_rgba(10,10,10,0.9)] backdrop-blur-xl'>
            <img src='/assets/images/plaza.png' alt='Propiedad tokenizada en CoinEstate' className='h-[380px] w-full object-cover' />
            <div className='space-y-4 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-6'>
              <div className='flex items-center justify-between'>
                <p className='text-16 font-semibold text-white'>Token Midtown 52</p>
                <span className='rounded-full bg-white/10 px-3 py-1 text-11 font-semibold uppercase tracking-wide text-white/70'>Disponible</span>
              </div>
              <p className='text-14 text-white/75'>
                Participa en la remodelación de un activo residencial en Miami y recibe rendimientos recurrentes respaldados por contratos inteligentes.
              </p>
              <div className='grid grid-cols-3 gap-3'>
                {CARD_METRICS.map((metric) => (
                  <div key={metric.id} className='rounded-[20px] border border-white/10 bg-black/40 p-3 text-center'>
                    <p className='text-18 font-bold text-yellow'>{metric.value}</p>
                    <p className='mt-1 text-11 font-medium text-white/60'>{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
