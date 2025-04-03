import React from 'react';
import StyledImage from './StyedImage';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/router';
const TOKENS = [
  {
    id: 1,
    img: '/assets/svg/token7.svg',
    heading: 'Invierte  desde poco y Diversifica eficientemente',
    text: (
      <span>
        Invierte desde solo 100.000 COP y mitiga riesgos con una cartera diversificada. Empieza a hacer crecer tu
        capital de manera inteligente con CoinEstate
      </span>
    ),
  },
  {
    id: 2,
    img: '/assets/svg/token8.svg',
    heading: 'Plusvalía De La Remodelación',
    text: 'Aprovecha proyectos de remodelación que multiplican el valor de las propiedades. Maximiza rendimientos rápidamente con inversiones estratégicas y plusvalía acelerada.',
  },
  {
    id: 3,
    img: '/assets/svg/token9.svg',
    heading: ' Rápido testeo',
    text: (
      <span>
        Al invertir en proyectos “Tenant Occupied” (inmuebles ya alquilados), tienes la oportunidad de evaluar el modelo
        desde el primer mes y acceder a ganancias sin largas esperas.
      </span>
    ),
  },
  {
    id: 4,
    img: '/assets/svg/token10.svg',
    heading: 'Transparencia y seguridad',
    text: 'Tu inversión está protegida mediante Contratos Inteligentes. Gracias a la tecnología Blockchain, puedes consultar en todo momento transacciones y registros de propiedad, seguros, accesibles y verificables.',
  },
  {
    id: 5,
    img: '/assets/svg/token11.svg',
    heading: 'Dirección Hacia El Futuro',
    text: (
      <span>
        En <span className='text-Yellow-200 '>CoinEstate</span> trabajamos para brindarte una experiencia excepcional.
        Un mercado secundario para liquidar tus activos y un sistema de colateralización de tokens para obtener
        intereses más favorables son solo parte de las innovaciones que vienen.
      </span>
    ),
  },
];

function Difference() {
  const router = useRouter();
  return (
    <div className='px-6 '>
      <div className='max-w-[1161px] mx-auto w-full mt-16 '>
        <p className='text-center mt-7 font-inter text-28 lg:text-36 text-black-100 font-bold'>
          ¿Por qué somos diferentes?
        </p>
        <div className='mt-8 sm:mt-16 grid grid-cols-1 xl:grid-cols-2 gap-6'>
          <StyledImage
            src='/assets/images/house.png'
            alt=''
            className='rounded-[16px] overflow-hidden xl:overflow-visible min-h-[500px] md:min-h-[800px] xl:h-full xl:min-h-0 w-full xl:w-[568px] xl:rounded-[16px 0px 16px 0px] '
          />
          <div className='grid sm:grid-cols-2 xl:grid-cols-1 gap-5 '>
            {TOKENS.map((items, idx) => {
              return (
                <div
                  key={`${items.id}___${idx}`}
                  className=' max-w-[580px] mx-auto lg:mx-0 bg-white p-4 flex gap-4 md:gap-8 items-start rounded-[8px]'>
                  <StyledImage className='w-full max-w-12 h-12 ' src={items.img} alt='' />
                  <div>
                    <p className='text-17 font-inter font-[800] text-black-100 leading-none  '>{items.heading}</p>
                    <p className='mt-2 text-14 font-inter font-regular text-gray'>{items.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex justify-center items-center mt-8'>
          <button
            onClick={() => router.push('/working')}
            className='text-12 font-inter font-semibold text-white bg-yellow rounded-full py-3 px-8 mx-auto  '>
            ¿Cómo empiezo?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Difference;
