import React from 'react';
import StyledImage from './StyedImage';
import { useRouter } from 'next/router';

const STEPS = [
  {
    id: 1,
    icon: '/assets/svg/selection1.svg',
    title: 'Regístrate',
    description:
      'Crear tu cuenta en CoinEstate te toma menos de cinco minutos. Verificamos tu identidad para cuidar de toda la comunidad.',
    cta: {
      label: 'Crear cuenta',
      href: '/auth/create-account',
    },
  },
  {
    id: 2,
    icon: '/assets/svg/selection2.svg',
    title: 'Selecciona proyectos',
    description:
      'Explora el marketplace, revisa los análisis y elige los activos que mejor se adapten a tu estrategia. Puedes diversificar desde montos muy accesibles.',
  },
  {
    id: 3,
    icon: '/assets/svg/selection3.svg',
    title: 'Invierte de forma flexible',
    description:
      'Compra tokens con tu medio de pago preferido y accede a contratos inteligentes que respaldan legalmente tu participación.',
  },
  {
    id: 4,
    icon: '/assets/svg/selection3.svg',
    title: 'Recibe y crece',
    description:
      'Gana con la valorización y los flujos del activo. Puedes reinvertir, vender en el mercado secundario pronto disponible o mantener a largo plazo.',
  },
];

export default function Selection() {
  const router = useRouter();

  return (
    <section className='px-6 py-20'>
      <div className='mx-auto max-w-7xl rounded-[36px] border border-yellow/20 bg-yellow/5 p-8 shadow-[0_40px_120px_-70px_rgba(173,122,4,0.55)] dark:border-yellow/30 dark:bg-black-800/60 dark:shadow-[0_45px_140px_-80px_rgba(0,0,0,0.7)]'>
        <h2 className='text-center text-28 font-extrabold text-black-100 dark:text-white lg:text-36'>
          ¿Cómo invertir con CoinEstate?
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-center text-16 leading-7 text-black-100/70 dark:text-white/75'>
          Sigue estos pasos y accede a rendimientos en dólares apoyado por nuestro equipo legal, financiero y tecnológico.
        </p>
        <div className='mt-12 grid gap-8 lg:grid-cols-4'>
          {STEPS.map((step) => (
            <article
              key={step.id}
              className='relative flex h-full flex-col gap-4 rounded-[28px] border border-yellow/20 bg-white/90 p-6 shadow-[0_35px_90px_-60px_rgba(173,122,4,0.55)] transition-transform duration-200 hover:-translate-y-1 dark:border-gray-700/60 dark:bg-black-900/60 dark:shadow-[0_35px_100px_-70px_rgba(0,0,0,0.6)]'
            >
              <div className='flex items-center justify-between'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-yellow/20 text-yellow dark:bg-yellow/15'>
                  <StyledImage className='h-7 w-7' src={step.icon} alt='' imgClassName='object-contain' />
                </div>
                <span className='rounded-full bg-yellow/20 px-3 py-1 text-12 font-semibold text-yellow dark:bg-yellow/15'>Paso {step.id}</span>
              </div>
              <h3 className='text-18 font-semibold text-black-100 dark:text-white'>{step.title}</h3>
              <p className='text-14 leading-6 text-black-100/70 dark:text-white/70'>{step.description}</p>
              {step.cta && (
                <button
                  onClick={() => router.push(step.cta.href)}
                  className='mt-auto inline-flex items-center justify-center rounded-full bg-yellow px-4 py-2 text-12 font-semibold text-black-100 shadow-[0_20px_50px_-35px_rgba(173,122,4,0.7)] dark:shadow-[0_25px_60px_-45px_rgba(255,200,44,0.6)]'
                  type='button'
                >
                  {step.cta.label}
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
