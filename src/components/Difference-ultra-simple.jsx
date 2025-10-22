import React from 'react';
import StyledImage from './StyedImage';
import { useRouter } from 'next/router';

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
          
          {/* Columna izquierda */}
          <div className='space-y-6'>
            {/* Imagen principal */}
            <div className='relative overflow-hidden rounded-[36px] border border-gray-200/60 bg-white shadow-[0_45px_120px_-70px_rgba(15,23,42,0.25)] dark:border-white/15 dark:bg-[#11121f] dark:shadow-[0_60px_140px_-80px_rgba(0,0,0,0.8)]'>
              <StyledImage
                src='/assets/images/house.png'
                alt='Propiedad administrada por CoinEstate'
                className='h-[360px] w-full rounded-[28px] md:h-[440px]'
                imgClassName='object-cover'
              />
            </div>
            
            {/* Componente de estadísticas con HTML básico y estilos inline */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                marginTop: '24px'
              }}
            >
              {/* Título principal */}
              <h3 
                style={{
                  color: '#1f2937',
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: 'Arial, sans-serif',
                  margin: '0 0 16px 0',
                  padding: '0'
                }}
              >
                Community Insights
              </h3>
              
              {/* Estadística principal */}
              <div 
                style={{
                  color: '#111827',
                  fontSize: '36px',
                  fontWeight: '700',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: '1.1',
                  margin: '0 0 8px 0',
                  padding: '0'
                }}
              >
                +6.2%
              </div>
              
              {/* Descripción de la estadística */}
              <div 
                style={{
                  color: '#374151',
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Arial, sans-serif',
                  margin: '0 0 16px 0',
                  padding: '0'
                }}
              >
                rentabilidad promedio anual
              </div>
              
              {/* Texto descriptivo */}
              <p 
                style={{
                  color: '#6b7280',
                  fontSize: '16px',
                  fontWeight: '400',
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: '1.5',
                  margin: '0 0 20px 0',
                  padding: '0'
                }}
              >
                Resultados históricos de los proyectos tokenizados en los últimos 18 meses.
              </p>
              
              {/* Indicador de verificación */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#059669',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    marginRight: '8px'
                  }}
                ></div>
                Datos verificados y auditados
              </div>
            </div>
          </div>
          
          {/* Columna derecha */}
          <div className='space-y-6'>
            <span className='inline-flex items-center gap-2 rounded-full border border-yellow/20 bg-yellow/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-yellow/80 dark:border-white/25 dark:bg-white/5 dark:text-white/70'>
              ¿Por qué somos diferentes?
            </span>
            <h2 className='text-3xl font-extrabold leading-tight lg:text-4xl'>
              Diseñamos experiencias de inversión inmobiliaria más humanas, seguras y escalables.
            </h2>
            <p className='text-base leading-7 text-gray-600 dark:text-gray-300'>
              Desde el onboarding hasta los reportes de rendimiento, construimos una plataforma que combina tecnología, mercado inmobiliario real y acompañamiento experto.
            </p>
            <div className='grid gap-4'>
              {DIFFERENTIATORS.map((item, idx) => (
                <div
                  key={`${item.id}___${idx}`}
                  className='group flex gap-4 rounded-[24px] border border-gray-200/70 bg-white p-5 text-black-100 shadow-[0_35px_90px_-70px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-[1px] dark:border-white/15 dark:bg-[#11121f] dark:text-white dark:shadow-[0_45px_110px_-80px_rgba(0,0,0,0.7)]'
                >
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow/15 text-yellow dark:bg-yellow/20'>
                    <StyledImage className='h-6 w-6' src={item.img} alt='' imgClassName='object-contain' />
                  </div>
                  <div>
                    <h3 className='text-base font-semibold text-gray-900 dark:text-white'>{item.heading}</h3>
                    <p className='mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300'>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/working')}
              className='inline-flex items-center justify-center rounded-full bg-yellow px-8 py-3 text-sm font-semibold text-black shadow-[0_25px_60px_-35px_rgba(255,200,44,0.65)] transition hover:-translate-y-[1px] hover:shadow-[0_35px_80px_-45px_rgba(255,200,44,0.75)]'
              type='button'
            >
              ¿Cómo empiezo?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Difference;
