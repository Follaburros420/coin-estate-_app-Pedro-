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
          
          {/* Columna izquierda - Imagen y estadísticas unificadas */}
          <div className='space-y-6'>
            {/* Imagen completamente redonda */}
            <Card className='overflow-hidden border-gray-200/60 bg-white shadow-[0_45px_120px_-70px_rgba(15,23,42,0.25)] dark:border-white/15 dark:bg-[#11121f] dark:shadow-[0_60px_140px_-80px_rgba(0,0,0,0.8)]'>
              <CardContent className="p-0">
                <div className='relative'>
                  <StyledImage
                    src='/assets/images/house.png'
                    alt='Propiedad administrada por CoinEstate'
                    className='h-[360px] w-full md:h-[440px] rounded-[36px]'
                    imgClassName='object-cover rounded-[36px]'
                  />
                  {/* Overlay sutil para mejorar la integración */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-[36px] pointer-events-none' />
                </div>
              </CardContent>
            </Card>
            
            {/* Componente Community Insights unificado con Shadcn/UI */}
            <Card className='border-gray-200/60 bg-white shadow-lg dark:border-white/15 dark:bg-[#11121f]'>
              <CardContent className="p-6">
                {/* Header con Badge */}
                <div className='flex items-center justify-between mb-4'>
                  <Badge variant="outline" className='text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800'>
                    Community Insights
                  </Badge>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-xs text-green-600 dark:text-green-400 font-medium'>Live</span>
                  </div>
                </div>
                
                {/* Estadística principal destacada */}
                <div className='mb-4'>
                  <CardTitle className='text-4xl font-black text-gray-900 dark:text-white mb-2'>
                    +6.2%
                  </CardTitle>
                  <CardDescription className='text-lg font-semibold text-gray-700 dark:text-gray-200'>
                    rentabilidad promedio anual
                  </CardDescription>
                </div>
                
                {/* Descripción */}
                <CardDescription className='text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
                  Resultados históricos de los proyectos tokenizados en los últimos 18 meses.
                </CardDescription>
                
                {/* Footer con indicadores */}
                <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600'>
                  <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                    <svg className='w-4 h-4 mr-2 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                    </svg>
                    Datos verificados
                  </div>
                  <Badge variant="secondary" className='text-xs'>
                    Última actualización: Dic 2024
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Columna derecha - Componentes unificados */}
          <div className='space-y-6'>
            {/* Badge de sección */}
            <Badge variant="outline" className='border-yellow/20 bg-yellow/10 text-yellow/80 dark:border-white/25 dark:bg-white/5 dark:text-white/70'>
              ¿Por qué somos diferentes?
            </Badge>
            
            {/* Título principal */}
            <Card className='border-none bg-transparent shadow-none'>
              <CardContent className="p-0">
                <CardTitle className='text-3xl font-extrabold leading-tight lg:text-4xl text-gray-900 dark:text-white'>
                  Diseñamos experiencias de inversión inmobiliaria más humanas, seguras y escalables.
                </CardTitle>
                <CardDescription className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-300'>
                  Desde el onboarding hasta los reportes de rendimiento, construimos una plataforma que combina tecnología, mercado inmobiliario real y acompañamiento experto.
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Grid de características unificado */}
            <div className='grid gap-4'>
              {DIFFERENTIATORS.map((item, idx) => (
                <Card
                  key={`${item.id}___${idx}`}
                  className='group border-gray-200/70 bg-white shadow-[0_35px_90px_-70px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_45px_110px_-80px_rgba(15,23,42,0.45)] dark:border-white/15 dark:bg-[#11121f] dark:shadow-[0_45px_110px_-80px_rgba(0,0,0,0.7)]'
                >
                  <CardContent className="p-6">
                    <div className='flex gap-4'>
                      {/* Icono mejorado */}
                      <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow/15 text-yellow dark:bg-yellow/20 transition-colors duration-300 group-hover:bg-yellow/25 dark:group-hover:bg-yellow/30'>
                        <StyledImage 
                          className='h-6 w-6 transition-transform duration-300 group-hover:scale-110' 
                          src={item.img} 
                          alt='' 
                          imgClassName='object-contain' 
                        />
                      </div>
                      
                      {/* Contenido */}
                      <div className='flex-1'>
                        <CardTitle className='text-base font-semibold text-gray-900 dark:text-white mb-2'>
                          {item.heading}
                        </CardTitle>
                        <CardDescription className='text-sm leading-6 text-gray-600 dark:text-gray-300'>
                          {item.text}
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Botón CTA mejorado */}
            <Card className='border-none bg-transparent shadow-none'>
              <CardContent className="p-0">
                <Button
                  onClick={() => router.push('/working')}
                  size="lg"
                  className='w-full sm:w-auto bg-yellow hover:bg-yellow/90 text-black font-semibold shadow-[0_25px_60px_-35px_rgba(255,200,44,0.65)] hover:shadow-[0_35px_80px_-45px_rgba(255,200,44,0.75)] transition-all duration-300 hover:-translate-y-1'
                >
                  ¿Cómo empiezo?
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Difference;
