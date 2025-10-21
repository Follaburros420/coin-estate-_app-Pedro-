import React from 'react';
import StyledImage from './StyedImage';
import RegisterBottomBanner from './RegisterBottomBanner';

const LEARN = [
  {
    id: 1,
    img: '/assets/images/learn1.png',
    tag: 'Sector inmobiliario',
    heading: 'Predicciones inmobiliarias en EE. UU. para 2025',
    abstract:
      'Las tasas hipotecarias seguirán marcando el ritmo del mercado durante 2025. Analizamos los escenarios que favorecen a los inversionistas internacionales.',
    authorImg: '/assets/images/man4.png',
    author: 'Omar Lemke',
    time: '5 Ago 2024',
  },
  {
    id: 2,
    img: '/assets/images/learn2.png',
    tag: 'Sector inmobiliario',
    heading: '¿Por qué invertir en el mercado inmobiliario estadounidense?',
    abstract:
      'Invertir en bienes raíces en EE. UU. permite acceder a una moneda fuerte, diversificación geográfica y contratos robustos que respaldan cada operación.',
    authorImg: '/assets/images/man4.png',
    author: 'Omar Lemke',
    time: '12 Jul 2024',
  },
  {
    id: 3,
    img: '/assets/images/learn3.png',
    tag: 'Blockchain',
    heading: '¿Cómo la tokenización está transformando el sector inmobiliario?',
    abstract:
      'Los contratos inteligentes permiten dividir activos, automatizar distribuciones y ofrecer liquidez programada. Te contamos cómo aprovecharlo.',
    authorImg: '/assets/images/man4.png',
    author: 'Omar Lemke',
    time: '28 Jun 2024',
  },
];

export default function Learn() {
  return (
    <section className='px-6 py-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='inline-flex items-center justify-center gap-2 rounded-full bg-yellow/15 px-4 py-1 text-12 font-semibold uppercase tracking-[0.24em] text-yellow/80 dark:bg-yellow/10'>
            Aprende
          </span>
          <h2 className='mt-4 text-28 font-extrabold leading-tight text-black-100 dark:text-white lg:text-36'>
            Conocimiento curado para decisiones inteligentes
          </h2>
          <p className='mt-4 text-16 leading-7 text-black-100/70 dark:text-white/70'>
            Artículos, guías y análisis elaborados por nuestro equipo para que inviertas con claridad y confianza.
          </p>
        </div>
        <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {LEARN.map((item) => (
            <article
              key={item.id}
              className='group flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-200/60 bg-white/95 shadow-[0_40px_110px_-70px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:-translate-y-1 dark:border-gray-700/60 dark:bg-black-900/60 dark:shadow-[0_45px_130px_-80px_rgba(0,0,0,0.6)]'
            >
              <div className='relative h-[220px] w-full overflow-hidden'>
                <StyledImage src={item.img} alt='' className='h-full w-full' />
                <span className='absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-12 font-semibold uppercase tracking-wide text-white/80'>
                  {item.tag}
                </span>
              </div>
              <div className='flex flex-1 flex-col gap-4 p-6'>
                <div>
                  <h3 className='text-18 font-semibold text-black-100 dark:text-white'>{item.heading}</h3>
                  <p className='mt-2 text-14 leading-6 text-black-100/70 dark:text-white/70'>{item.abstract}</p>
                </div>
                <div className='mt-auto flex items-center justify-between text-12 text-black-100/60 dark:text-white/60'>
                  <div className='flex items-center gap-2'>
                    <StyledImage src={item.authorImg} className='h-8 w-8 rounded-full' alt='' />
                    <span className='text-13 font-medium text-black-100/80 dark:text-white/80'>{item.author}</span>
                  </div>
                  <span>{item.time}</span>
                </div>
                <button
                  type='button'
                  className='inline-flex items-center gap-2 text-13 font-semibold text-yellow transition group-hover:gap-3'
                >
                  Leer artículo
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M5 12h14M13 6l6 6-6 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <RegisterBottomBanner />
    </section>
  );
}
