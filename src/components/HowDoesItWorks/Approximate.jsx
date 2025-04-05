'use client';
import React, { useEffect, useState } from 'react';
import WorksTopBanner from '../WorksTopBanner';
import StyledImage from '../StyedImage';
import { Approximate_Page_QueryTwo_Data, Approximates_Data, Guide_Investing_Data } from '@/_mock/data';
import RegisterBottomBanner from '../RegisterBottomBanner';

export default function Approximate() {
  const [isBrowser, setIsBrowser] = useState(false);

  // Ensure the document is available only in the browser
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const scrollToSection = (id) => {
    if (isBrowser) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <WorksTopBanner
        heading='Próximamente: Mercado secundario'
        desc='Descubre qué es un mercado secundario y cómo su futura implementación traerá beneficios únicos'
      />
      <div className='my-10 sm:my-20 px-6 sm:px-10 '>
        <div className='font-inter w-full max-w-[1161px] mx-auto '>
          <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-20 '>
            <div className='w-full max-w-[456px] text-center lg:text-start '>
              <p className='text-28 md:text-36 font-bold font-inter capitalize md:leading-[50px] '>Próximamente</p>
              <p className='text-gray font-medium font-inter mt-4 '>
                Estamos trabajando en la implementación de un mercado secundario en CoinEstate. En pocas palabras, este
                mercado te permitirá vender tus tokens a otros inversores, dándote la oportunidad de beneficiarte de la
                valorización de tu inversión en cualquier momento y bajo tus propios términos, sin tener que esperar
                años para la finalización del proyecto. Continúa leyendo para conocer más sobre los beneficios que te
                ofrecerá esta nueva funcionalidad y cómo potenciará tu flexibilidad y liquidez como inversor en
                CoinEstate.
              </p>
            </div>
            <StyledImage src='/assets/images/ApproximatesMainImg.png' className='w-full max-w-[448px] min-h-[237px] ' />
          </div>

          <div className='flex flex-col lg:flex-row items-start gap-6 mt-10 lg:mt-16 '>
            <div className='w-full lg:max-w-[371px] '>
              {Approximates_Data.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(item.scrollTo)}
                    className='flex items-center justify-between focus:outline-none gap-5 bg-[#ffffff] py-2 my-4 shadow-md rounded-[4px] p-4 w-full text-start '>
                    <p className='text-12 truncate sm:text-14 font-medium text-lightGray-300 '>{item.title}</p>
                    <StyledImage src='/assets/svg/downArrow.svg' className='w-full max-w-6 h-6 ' />
                  </button>
                );
              })}
            </div>
            <div className='bg-white shadow-md p-4 sm:p-6 rounded-[8px] w-full text-center sm:text-start '>
              <p id='section1' className='font-bold  '>
                ¿Qué es un mercado secundario?{' '}
              </p>
              <div className='text-14 font-medium font-inter text-gray mt-4 '>
                <p className=''>
                  En el contexto de CoinEstate, un mercado secundario básicamente es un espacio (por ejemplo un market
                  place) en el que se pueden comprar y vender tokens que ya no hacen parte del mercado primario. En
                  palabras más sencillas, imagina haber comprado tokens que representan propiedad sobre un determinado
                  inmueble. Estos tokens con el tiempo se irán valorizando, y normalmente, en la inversión inmobiliaria
                  tradicional tendrías que esperar en promedio 5 años para que, solo hasta el momento en el que la
                  propiedad se venda, puedas obtener de manera líquida (en dinero que puedes utilizar) tu rentabilidad
                  acumulada. Con la implementación del mercado secundario en CoinEstate ya no tendrás que esperar para
                  beneficiarte de la valorización de tu activo; ya no será necesario esperar hasta que el inmueble se
                  venda por completo para beneficiarte de los altos porcentajes de valorización que experimentan los
                  inmuebles en el tiempo, y tras procesos de remodelación.  
                </p>
                <p className='mt-4'>
                  Lo que se planea lograr tras la implementación del mercado secundario es que la inversión en el sector
                  inmobiliario se flexibilice, ya no es necesario que invertir en un inmueble te represente tener tu
                  dinero “quieto” durante años, y con CoinEstate con la implementación de nuevas tecnologías, pensamos
                  hacer de esto una realidad.
                </p>
              </div>
              <div id='section2' className='mt-5 '>
                <p className='font-inter font-bold '>
                  ¿Qué beneficios para el inversor tendrá la implementación del mercado secundario?
                </p>
                <div className='mt-4'>
                  {Approximate_Page_QueryTwo_Data.map((item, idx) => {
                    return (
                      <div key={idx}>
                        <p className='text-gray mt-1 '>{item.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div id='section3' className='mt-5 '>
                <p className='font-inter font-bold '>¿Cuándo estará disponible esta función?</p>
                <div className='text-14 font-medium font-inter text-gray mt-4  '>
                  <p>
                    Estamos trabajando con incansable esfuerzo para implementar de la manera más eficiente y segura esta
                    funcionalidad lo antes posible . Como podrás imaginar, un gran cambio requiere un gran equipo detrás
                    y mucho trabajo !
                  </p>
                  <p>
                    Es solo cuestión de tiempo para que los beneficios de la innovación disruptiva en el sector
                    inmobiliario, de la que estás haciendo parte, se hagan totalmente disponibles para todos por medio
                    de CoinEstate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterBottomBanner />
    </div>
  );
}
