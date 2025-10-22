import React from 'react';
import StyledImage from './StyedImage';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  Eye, 
  Rocket,
  DollarSign,
  Building2,
  Target,
  Lock,
  Zap
} from 'lucide-react';

const DIFFERENTIATORS = [
  {
    id: 1,
    icon: DollarSign,
    heading: 'Invierte desde poco y diversifica con criterio',
    description: 'Participa desde 100.000 COP y distribuye tu capital en varios proyectos para reducir riesgos y multiplicar oportunidades.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 2,
    icon: TrendingUp,
    heading: 'Plusvalía respaldada por remodelación',
    description: 'Accede a propiedades en etapas de renovación que incrementan su valor en plazos cortos, maximizando la valorización de tu inversión.',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 3,
    icon: Clock,
    heading: 'Resultados medibles desde el primer mes',
    description: 'Con proyectos tenant occupied puedes validar el modelo de negocio rápidamente y recibir tus primeros retornos sin esperas eternas.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 4,
    icon: Shield,
    heading: 'Transparencia y seguridad 24/7',
    description: 'Tu inversión está protegida por contratos inteligentes sobre blockchain. Consulta cada movimiento en tiempo real, sin letra pequeña.',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 5,
    icon: Rocket,
    heading: 'Roadmap diseñado para el futuro',
    description: 'Mercado secundario, colateralización de tokens y más soluciones en camino para que tengas control total de tu patrimonio digital.',
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
];

function Difference() {
  const router = useRouter();

  return (
    <section className='relative overflow-hidden px-6 py-20'>
      {/* Fondo mejorado con gradientes más sutiles */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]' />
      
      <div className='relative mx-auto max-w-7xl text-black-100 dark:text-white'>
        <div className='grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center'>
          
          {/* Imagen mejorada */}
          <div className='relative overflow-hidden rounded-[36px] border border-gray-200/60 bg-white shadow-[0_45px_120px_-70px_rgba(15,23,42,0.25)] dark:border-white/15 dark:bg-[#1e293b] dark:shadow-[0_60px_140px_-80px_rgba(0,0,0,0.8)] backdrop-blur'>
            <StyledImage
              src='/assets/images/house.png'
              alt='Propiedad administrada por CoinEstate'
              className='h-[360px] w-full rounded-[28px] md:h-[440px]'
              imgClassName='object-cover'
            />
            {/* Card de estadísticas mejorada */}
            <Card className='absolute inset-x-5 bottom-5 border-gray-200/60 bg-white/95 backdrop-blur-sm dark:border-white/15 dark:bg-[#1e293b]/95'>
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
          
          {/* Contenido principal mejorado */}
          <div className='space-y-8'>
            {/* Header mejorado */}
            <div className='space-y-6'>
              <Badge 
                variant="outline" 
                className='border-yellow/20 bg-yellow/10 text-yellow/80 dark:border-white/25 dark:bg-white/5 dark:text-white/70'
              >
                ¿Por qué somos diferentes?
              </Badge>
              
              <h2 className='text-3xl font-extrabold leading-tight lg:text-4xl text-gray-900 dark:text-white'>
                Diseñamos experiencias de inversión inmobiliaria más humanas, seguras y escalables.
              </h2>
              
              <p className='text-lg leading-7 text-gray-600 dark:text-gray-300'>
                Desde el onboarding hasta los reportes de rendimiento, construimos una plataforma que combina tecnología, mercado inmobiliario real y acompañamiento experto.
              </p>
            </div>
            
            {/* Cards mejoradas con Shadcn/UI */}
            <div className='grid gap-6'>
              {DIFFERENTIATORS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <Card
                    key={item.id}
                    className={`group relative overflow-hidden border-gray-200/70 bg-white shadow-[0_35px_90px_-70px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_50px_120px_-60px_rgba(15,23,42,0.45)] dark:border-white/15 dark:bg-[#1e293b] dark:shadow-[0_45px_110px_-80px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_60px_140px_-70px_rgba(0,0,0,0.8)]`}
                    style={{animationDelay: `${idx * 0.1}s`}}
                  >
                    <CardContent className="p-6">
                      <div className='flex items-start gap-4'>
                        {/* Icono mejorado */}
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bgColor} transition-all duration-300 group-hover:scale-110`}>
                          <IconComponent className={`h-7 w-7 ${item.iconColor} transition-colors duration-300`} />
                        </div>
                        
                        {/* Contenido mejorado */}
                        <div className='flex-1 space-y-2'>
                          <CardTitle className='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300'>
                            {item.heading}
                          </CardTitle>
                          <CardDescription className='text-base leading-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300'>
                            {item.description}
                          </CardDescription>
                        </div>
                      </div>
                      
                      {/* Efecto de gradiente sutil */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5 pointer-events-none`} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Botón CTA mejorado */}
            <Button
              onClick={() => router.push('/working')}
              size="lg"
              className='group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-yellow to-yellow-300 px-8 py-4 text-base font-semibold text-black shadow-[0_25px_60px_-35px_rgba(255,200,44,0.65)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_80px_-45px_rgba(255,200,44,0.75)] hover:scale-105'
            >
              <span className='relative z-10'>¿Cómo empiezo?</span>
              <Zap className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Difference;
