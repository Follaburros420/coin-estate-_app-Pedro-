import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Keyboard, Navigation, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import StyledImage from './StyedImage';

const TESTIMONIALS = [
  {
    id: 1,
    img: '/assets/images/team/seb.png',
    name: 'Sebastián Carvajal',
    role: 'Inversionista',
    quote:
      'CoinEstate me dio la confianza de probar algo nuevo sin complicaciones. Al invertir en propiedades ya arrendadas pude validar el modelo desde el primer mes y diversificar sin arriesgar grandes sumas.',
  },
  {
    id: 2,
    img: '/assets/images/team/cla.png',
    name: 'Clara Bayona',
    role: 'Inversionista',
    quote:
      'Lo que más valoro de CoinEstate es lo fácil que fue empezar. Sin papeleo ni procesos largos, pude invertir, diversificar y ver cómo mi dinero empezaba a trabajar desde el primer día.',
  },
  {
    id: 3,
    img: '/assets/images/team/jul.png',
    name: 'Julián y Ana',
    role: 'Inversionistas',
    quote:
      'Nunca imaginé que invertir en bienes raíces fuera tan accesible. Hoy puedo generar ingresos en dólares y seguir el rendimiento desde una plataforma sencilla.',
  },
  {
    id: 4,
    img: '/assets/images/team/seb.png',
    name: 'Laura Méndez',
    role: 'Consultora',
    quote:
      'El equipo me acompaña en cada paso y la transparencia de los proyectos me permite invertir con tranquilidad. La tokenización es la mejor forma de diversificar mi portafolio.',
  },
];

export default function CardSlider() {
  const swiperRef = useRef(null);

  return (
    <div className='mt-4 h-full'>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={28}
        modules={[Virtual, Keyboard, Navigation]}
        keyboard={{ enabled: true }}
        navigation={{ prevEl: '.swiperButtonPrev', nextEl: '.swiperButtonNext' }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className='h-full w-full'
      >
        {TESTIMONIALS.map((item, idx) => (
          <SwiperSlide key={`${item.id}-${idx}`} virtualIndex={idx}>
            <article className='flex h-full flex-col rounded-[28px] border border-neutral-200/80 bg-white p-6 text-slate-900 shadow-[0_30px_90px_-70px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 dark:border-yellow/20 dark:bg-[#121726] dark:text-slate-100 dark:shadow-[0_40px_110px_-80px_rgba(0,0,0,0.65)]'>
              <div className='flex items-center gap-4'>
                <StyledImage className='h-14 w-14 rounded-full' imgClassName='rounded-full object-cover' src={item.img} alt={item.name} />
                <div>
                  <p className='text-sm font-semibold text-yellow dark:text-yellow-300'>{item.name}</p>
                  <p className='text-xs font-medium text-slate-500 dark:text-slate-400'>{item.role}</p>
                </div>
              </div>
              <p className='mt-5 text-sm leading-6 text-slate-600 dark:text-slate-200'>{item.quote}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
