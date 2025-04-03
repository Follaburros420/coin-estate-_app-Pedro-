import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Keyboard, Pagination, Navigation, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import StyledImage from './StyedImage';
const SLIDER = [
  {
    id: 1,
    img: '/assets/images/team/seb.png',
    name: 'Sebastián Carvajal',
    position: 'Position',
    about:
      'CoinEstate me dio la confianza de probar algo nuevo sin complicaciones. Al invertir en propiedades ya arrendadas pude validar el modelo desde el primer mes. Me gustó ver cómo se generaban resultados rápidamente y sentir que estaba diversificando mi portafolio sin tener que arriesgar grandes sumas.',
  },
  {
    id: 2,
    img: '/assets/images/team/cla.png',
    name: 'Clara Bayona',
    position: 'Position',
    about:
      'Lo que más valoro de CoinEstate es lo fácil que fue empezar. Sin papeleos ni procesos largos, pude invertir, diversificar y ver cómo mi dinero empezaba a trabajar en poco tiempo. Saber que el inmueble ya estaba alquilado me dio mucha tranquilidad para dar el paso.',
  },
  {
    id: 3,
    img: '/assets/images/team/jul.png',
    name: 'Julián y Ana ',
    position: 'Position',
    about:
      'Nunca imaginé que invertir en bienes raíces pudiera ser tan accesible. Probé con un monto pequeño y pude comprobar en semanas que el modelo funcionaba. Tener la opción de diversificar, generar ingresos y seguir todo desde una plataforma sencilla me hace sentir en control y seguro.',
  },
  // {
  //   id: 4,
  //   img: '/assets/images/man1.png',
  //   name: 'Name',
  //   position: 'Position',
  //   about:
  //     ' CoinEstate me ha permitido acceder a negocios que antes solo pocos podian llevar a cabo desde montos muy pequeños. Es una gran oportunidad para aquellos que buscamos maximizar nuestro portafolio sin necesidad de un gran capital inicial, en especial para quienes queremos inversiones con niveles de riesgo bajos, pero sin tener que invertir cantidades muy elevadas, para mi CoinEstate es la mejor opción.',
  // },
  // {
  //   id: 5,
  //   img: '/assets/images/man2.png',
  //   name: 'Name',
  //   position: 'Position',
  //   about:
  //     'Lo que más me gusta de CoinEstate es que puedo reinvertir y aumentar mi capital de manera regular. Invertir pequeñas cantidades, incluso lo que me sobra al final del mes, ha hecho que mi inversión crezca de forma constante. Es una opción flexible y accesible para todos. Además, me hace sentir muy segura el hecho de que puedo poner a la venta mis tokens en el mercado secundario, y beneficiarme de la valorización del inmueble cuando yo quiera',
  // },
  // {
  //   id: 6,
  //   img: '/assets/images/man3.png',
  //   name: 'Name',
  //   position: 'Position',
  //   about:
  //     'CoinEstate ha sido una revelación para mí. Poder invertir en bienes raíces de USA con montos tan bajos es increíble. He visto cómo mi inversión ha crecido gracias a la valorización de los inmuebles, todo de manera transparente y sencilla. Lo que más valoro es la posibilidad de diversificar mi portafolio sin la complejidad tradicional del sector inmobiliario. Definitivamente, es la manera más práctica y accesible de participar en el mercado inmobiliario.',
  // },
];

// Import Swiper styles

export default function CardSlider() {
  const SwiperRef = useRef();
  return (
    <div className='mt-5 h-full  '>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          538: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
        }}
        ref={SwiperRef}
        slidesPerView={3}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        modules={[Virtual, Keyboard, Navigation]}
        className='mySwiper w-full h-full  '
        navigation={{
          prevEl: '.swiperButtonPrev',
          nextEl: '.swiperButtonNext',
        }}
        onSwiper={(swiper) => (SwiperRef.current = swiper)}>
        {SLIDER.map((items, idx) => {
          return (
            <SwiperSlide key={`${items.id}___${idx}`}>
              <div
                style={{ borderRadius: '0px 32px 0px 0px' }}
                className='max-w-[371px] mx-auto lg:mx-0 mt-4 lg:mt-0  bg-white border border-yellow p-4'>
                <div className='flex gap-4 items-center '>
                  <div className='rounded-full overflow-hidden'>
                    <StyledImage className={'w-20 h-20 object-cover'} src={items.img} alt='' />
                  </div>
                  <div>
                    <p className='font-inter font-semibold text-14 text-black-100'>{items.name}</p>
                    <p className='text-black-400 font-inter font-regular text-14'>{items.position}</p>
                  </div>
                </div>
                <p className='mt-6 text-14 text-grey-100 sm:text-16 font-inter font-regular'>{items.about}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

// {SLIDER.map((items, idx) => {
//   return (
//     <SwiperSlide key={`${items.id}___${idx}`} >
//       <div className='max-w-[371px] mx-auto lg:mx-0 mt-4 lg:mt-0 bg-white rounded-r-xl border border-yellow p-4'>
//         <div className="flex gap-4 items-center">
//           <img src={items.img} alt="" />
//           <div>
//             <p className="font-inter font-semibold text-14 text-black-100">
//               {items.name}
//             </p>
//             <p className="text-black-400 font-inter font-regular text-14">
//               {items.position}
//             </p>
//           </div>
//         </div>
//         <p className='mt-6 text-grey-100 text-16 font-inter font-regular'>
//           {items.about}
//         </p>
//       </div>
//     </SwiperSlide>
//   );
// })}
