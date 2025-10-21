/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function About() {
  const router = useRouter();

  return (
    <section className='px-6 py-16'>
      <div className='mx-auto max-w-7xl rounded-[32px] border border-gray-200/60 bg-white/95 p-8 shadow-[0_45px_120px_-70px_rgba(15,23,42,0.35)] dark:border-gray-700/60 dark:bg-black-900/60 dark:shadow-[0_50px_140px_-80px_rgba(0,0,0,0.6)]'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
          <div className='max-w-lg space-y-4 text-black-100 dark:text-white'>
            <h3 className='text-20 font-extrabold'>Conectamos finanzas digitales con activos reales</h3>
            <p className='text-14 leading-6 text-black-100/70 dark:text-white/70'>
              CoinEstate es una plataforma que permite invertir en proyectos inmobiliarios tokenizados con tickets accesibles, seguridad legal y soporte personalizado en cada etapa.
            </p>
            <button
              type='button'
              onClick={() => router.push('/auth/create-account')}
              className='inline-flex items-center justify-center rounded-full bg-yellow px-6 py-2 text-13 font-semibold text-black-100 shadow-[0_20px_55px_-35px_rgba(173,122,4,0.7)]'
            >
              Comienza hoy
            </button>
          </div>
          <div className='grid flex-1 gap-8 sm:grid-cols-2'>
            <div>
              <h4 className='text-15 font-semibold text-black-100 uppercase tracking-wide dark:text-white'>Explora</h4>
              <ul className='mt-4 space-y-2 text-14 text-black-100/80 dark:text-white/70'>
                <li><Link href='/'>Inicio</Link></li>
                <li><Link href='/working'>¿Cómo funciona?</Link></li>
                <li><Link href='/services'>Servicios</Link></li>
                <li><Link href='/marketplace'>Marketplace</Link></li>
                <li><Link href='/learn'>Aprende</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='text-15 font-semibold text-black-100 uppercase tracking-wide dark:text-white'>Recursos</h4>
              <ul className='mt-4 space-y-2 text-14 text-black-100/80 dark:text-white/70'>
                <li>Política de privacidad</li>
                <li>Términos y condiciones</li>
              </ul>
            </div>
            <div className='sm:col-span-2'>
              <h4 className='text-15 font-semibold text-black-100 uppercase tracking-wide dark:text-white'>Contáctanos</h4>
              <ul className='mt-4 space-y-3 text-14 text-black-100/80 dark:text-white/70'>
                <li className='flex items-center gap-2'>
                  <img src='/assets/svg/phone.svg' alt='' className='h-4 w-4' />
                  <a href='https://wa.me/573118867074' target='_blank' rel='noreferrer'>+57 311 886 7074</a>
                </li>
                <li className='flex items-center gap-2'>
                  <img src='/assets/svg/email.svg' alt='' className='h-4 w-4' />
                  <a href='mailto:ayuda@coinestate.com.co'>ayuda@coinestate.com.co</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
