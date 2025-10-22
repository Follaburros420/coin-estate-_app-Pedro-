import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      {/* Efectos de fondo mejorados */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,#ffc82c33,transparent_55%)] opacity-80' />
        <div className='absolute left-1/3 top-[-30%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-yellow/25 blur-[140px] animate-pulse' />
        <div className='absolute bottom-[-40%] right-[-20%] h-[520px] w-[520px] rounded-full bg-white/5 blur-[160px] animate-pulse' style={{animationDelay: '1s'}} />
        <div className='absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow/10 to-transparent blur-[100px] animate-pulse' style={{animationDelay: '2s'}} />
      </div>
      
      <div className='relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 pb-24 pt-32 lg:flex-row lg:items-start lg:gap-20'>
        <div className='w-full max-w-xl text-center lg:text-left'>
          {/* Badge mejorado con Shadcn/UI */}
          <Badge 
            variant="outline" 
            className='mb-6 border-white/25 bg-white/10 text-white/70 backdrop-blur-sm animate-fade-in'
          >
            Nueva forma de invertir
          </Badge>
          
          <h1 className='mt-6 text-36 font-extrabold leading-tight text-white lg:text-52 animate-slide-up' style={{animationDelay: '0.2s'}}>
            <span className='text-yellow bg-gradient-to-r from-yellow to-yellow-300 bg-clip-text text-transparent'>Gana en dólares</span> invirtiendo en el sector inmobiliario de Estados Unidos.
          </h1>
          
          <p className='mt-6 text-16 leading-7 text-white/80 animate-slide-up' style={{animationDelay: '0.4s'}}>
            Di adiós a los altos montos de inversión para participar en el mercado inmobiliario de EE. UU. Invierte desde 100.000 COP y comienza a generar ingresos pasivos en dólares con proyectos inmobiliarios reales respaldados por expertos.
          </p>
          
          {/* Botones mejorados con Shadcn/UI */}
          <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start sm:gap-4 animate-slide-up' style={{animationDelay: '0.6s'}}>
            <Button
              onClick={() => router.push('/auth/create-account')}
              size="lg"
              className='w-full max-w-[220px] rounded-full bg-gradient-to-r from-yellow to-yellow-300 text-black-100 shadow-[0_15px_45px_-20px_rgba(255,200,44,0.7)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_20px_60px_-25px_rgba(255,200,44,0.8)] hover:scale-105 sm:w-auto'
            >
              Regístrate ahora
            </Button>
            
            <Button
              onClick={() => router.push('/working')}
              variant="outline"
              size="lg"
              className='w-full max-w-[220px] rounded-full border-white/40 text-white transition-all duration-300 hover:border-yellow hover:text-yellow hover:bg-white/5 hover:scale-105 sm:w-auto'
            >
              Conoce más
            </Button>
          </div>
          
          {/* Cards de estadísticas mejoradas con Shadcn/UI */}
          <div className='mt-10 grid w-full gap-4 sm:grid-cols-3 animate-slide-up' style={{animationDelay: '0.8s'}}>
            {HERO_STATS.map((stat, index) => (
              <Card
                key={stat.id}
                className='group relative overflow-hidden rounded-[26px] border-white/10 bg-white/5 px-4 py-5 text-left shadow-[0_25px_50px_-30px_rgba(8,8,8,0.9)] backdrop-blur transition-all duration-300 hover:scale-105 hover:border-yellow/30 hover:bg-white/10'
                style={{animationDelay: `${0.8 + index * 0.1}s`}}
              >
                <CardContent className="p-0">
                  <div className='absolute inset-0 bg-gradient-to-br from-yellow/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  <div className='relative z-10'>
                    <p className='text-24 font-bold text-yellow group-hover:text-yellow-300 transition-colors duration-300'>{stat.value}</p>
                    <p className='mt-2 text-12 font-medium uppercase tracking-wide text-white/60 group-hover:text-white/80 transition-colors duration-300'>{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Lista de características mejorada */}
          <ul className='mt-8 space-y-3 text-left animate-slide-up' style={{animationDelay: '1s'}}>
            {HIGHLIGHTS.map((item, index) => (
              <li key={item} className='group flex items-start gap-3 text-14 text-white/80 transition-all duration-300 hover:text-white' style={{animationDelay: `${1 + index * 0.1}s`}}>
                <span className='mt-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-yellow/20 text-12 text-yellow transition-all duration-300 group-hover:bg-yellow/30 group-hover:scale-110'>✓</span>
                <span className='transition-colors duration-300'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Card de propiedad mejorada */}
        <div className='relative w-full max-w-xl animate-slide-up' style={{animationDelay: '1.2s'}}>
          <div className='absolute -bottom-10 -left-10 hidden h-64 w-64 rounded-full bg-yellow/25 blur-[120px] lg:block animate-pulse' />
          <Card className='group relative overflow-hidden rounded-[32px] border-white/10 bg-white/10 shadow-[0_45px_120px_-40px_rgba(10,10,10,0.9)] backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_60px_150px_-50px_rgba(10,10,10,0.95)]'>
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
            <img src='/assets/images/plaza.png' alt='Propiedad tokenizada en CoinEstate' className='h-[380px] w-full object-cover transition-transform duration-500 group-hover:scale-110' />
            <CardContent className='space-y-4 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-6'>
              <div className='flex items-center justify-between'>
                <p className='text-16 font-semibold text-white'>Token Midtown 52</p>
                <Badge variant="secondary" className='bg-white/10 text-white/70'>
                  Disponible
                </Badge>
              </div>
              <p className='text-14 text-white/75'>
                Participa en la remodelación de un activo residencial en Miami y recibe rendimientos recurrentes respaldados por contratos inteligentes.
              </p>
              <div className='grid grid-cols-3 gap-3'>
                {CARD_METRICS.map((metric) => (
                  <Card key={metric.id} className='rounded-[20px] border-white/10 bg-black/40 p-3 text-center'>
                    <CardContent className="p-0">
                      <p className='text-18 font-bold text-yellow'>{metric.value}</p>
                      <p className='mt-1 text-11 font-medium text-white/60'>{metric.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Header;
