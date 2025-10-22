import React from 'react';
import StyledImage from './StyedImage';
import { useRouter } from 'next/router';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DIFFERENTIATORS = [
  {
    id: 1,
    img: '/assets/svg/token7.svg',
    heading: 'Invierte desde poco y diversifica con criterio',
    text:
      'Participa desde 100.000 COP y distribuye tu capital en varios proyectos para reducir riesgos y multiplicar oportunidades.',
  },
  {
    id: 2,
    img: '/assets/svg/token8.svg',
    heading: 'Plusvalía respaldada por remodelación',
    text:
      'Accede a propiedades en etapas de renovación que incrementan su valor en plazos cortos, maximizando la valorización de tu inversión.',
  },
  {
    id: 3,
    img: '/assets/svg/token9.svg',
    heading: 'Resultados medibles desde el primer mes',
    text:
      'Con proyectos tenant occupied puedes validar el modelo de negocio rápidamente y recibir tus primeros retornos sin esperas eternas.',
  },
  {
    id: 4,
    img: '/assets/svg/token10.svg',
    heading: 'Transparencia y seguridad 24/7',
    text:
      'Tu inversión está protegida por contratos inteligentes sobre blockchain. Consulta cada movimiento en tiempo real, sin letra pequeña.',
  },
  {
    id: 5,
    img: '/assets/svg/token11.svg',
    heading: 'Roadmap diseñado para el futuro',
    text:
      'Mercado secundario, colateralización de tokens y más soluciones en camino para que tengas control total de tu patrimonio digital.',
  },
];

function Difference() {
  const router = useRouter();

  return (
    <section className='relative overflow-hidden px-6 py-20'>
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-[#eef3ff] via-white to-[#f9fbff] dark:from-[#0b1220] dark:via-[#0e1729] dark:to-[#111d33]' />
      <div className='relative mx-auto max-w-7xl text-black-100 dark:text-white'>
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center'>
          <div className='relative overflow-hidden rounded-[36px] border border-gray-200/60 bg-white shadow-[0_45px_120px_-70px_rgba(15,23,42,0.25)] dark:border-white/15 dark:bg-[#11121f] dark:shadow-[0_60px_140px_-80px_rgba(0,0,0,0.8)] backdrop-blur'>
            <StyledImage
              src='/assets/images/house.png'
              alt='Propiedad administrada por CoinEstate'
              className='h-[360px] w-full rounded-[28px] md:h-[440px]'
              imgClassName='object-cover'
            />
            {/* Card de estadísticas mejorada con Shadcn/UI y texto corregido */}
            <Card className='absolute inset-x-5 bottom-5 border-gray-200/60 bg-white/95 backdrop-blur-sm dark:border-white/15 dark:bg-[#11121f]/95'>
              <CardContent className="p-5">
                <Badge variant="outline" className='mb-3 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400'>
                  Community insights
                </Badge>
                <CardTitle className='text-xl font-bold text-gray-900 dark:text-white'>
                  +6.2% rentabilidad promedio anual
                </CardTitle>
                <CardDescription className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                  Resultados históricos de los proyectos tokenizados en los últimos 18 meses.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className='space-y-6'>
            <Badge 
              variant="outline" 
              className='border-yellow/20 bg-yellow/10 text-yellow/80 dark:border-white/25 dark:bg-white/5 dark:text-white/70'
            >
              ¿Por qué somos diferentes?
            </Badge>
            <h2 className='text-28 font-extrabold leading-tight lg:text-36'>
              Diseñamos experiencias de inversión inmobiliaria más humanas, seguras y escalables.
            </h2>
            <p className='text-16 leading-7 text-black-100/70 dark:text-white/75'>
              Desde el onboarding hasta los reportes de rendimiento, construimos una plataforma que combina tecnología, mercado inmobiliario real y acompañamiento experto.
            </p>
            <div className='grid gap-4'>
              {DIFFERENTIATORS.map((item, idx) => (
                <Card
                  key={`${item.id}___${idx}`}
                  className='group flex gap-4 rounded-[24px] border-gray-200/70 bg-white shadow-[0_35px_90px_-70px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-[1px] dark:border-white/15 dark:bg-[#11121f] dark:shadow-[0_45px_110px_-80px_rgba(0,0,0,0.7)]'
                >
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow/15 text-yellow dark:bg-yellow/20'>
                      <StyledImage className='h-6 w-6' src={item.img} alt='' imgClassName='object-contain' />
                    </div>
                    <div>
                      <CardTitle className='text-16 font-semibold text-black-100 dark:text-white'>{item.heading}</CardTitle>
                      <CardDescription className='mt-1 text-14 leading-6 text-black-100/70 dark:text-white/75'>{item.text}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => router.push('/working')}
              size="lg"
              className='inline-flex items-center justify-center rounded-full bg-yellow px-8 py-3 text-14 font-semibold text-black-100 shadow-[0_25px_60px_-35px_rgba(255,200,44,0.65)] transition hover:-translate-y-[1px] hover:shadow-[0_35px_80px_-45px_rgba(255,200,44,0.75)]'
            >
              ¿Cómo empiezo?
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Difference;
