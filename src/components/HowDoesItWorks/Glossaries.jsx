import React from 'react';
import RegisterBottomBanner from '../RegisterBottomBanner';
import WorksTopBanner from '../WorksTopBanner';
import { Glossary_Content_Data } from '@/_mock/data';
import clsxm from '@/utils/clsxm';

export default function Glossaries() {
  return (
    <div>
      <WorksTopBanner
        heading='Entendiendo el Proceso de  inversión Inmobiliaria en '
        coinEstateTitle='CoinEstate'
        desc='Para comenzar tu viaje de inversión, queremos asegurarnos de que entiendas cada paso del proceso. A continuación, te presentamos un glosario con los términos clave que te ayudarán a tomar decisiones informadas y seguras.'
      />
      <div className=' mt-10 md:mt-20 mb-10 px-6 md:px-10 '>
        <div className='w-full max-w-[1161px] mx-auto'>
          <div className='font-inter text-center sm:text-start '>
            <p className='text-28 sm:text-36 font-bold '>Glosario</p>
            <p className='text-gray font-medium mt-6 '>
              Al invertir en proyectos de alto nivel, como lo hacen los grandes inversionistas, tú también te conviertes
              en un gran inversionista. Por eso, es fundamental dominar ciertos conceptos clave. Hemos preparado este
              glosario que esperamos te proporcione las herramientas necesarias para tomar decisiones informadas y
              estratégicas en cada paso del camino.
            </p>
          </div>
          <div className='bg-white shadow-md rounded-[8px] p-6 mt-16 '>
            {Glossary_Content_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    'font-medium font-inter mt-4 ',
                    idx === 11 && 'flex flex-col md:flex-row md:text-nowrap gap-1',
                    idx === 12 && 'flex flex-col md:flex-row md:text-nowrap items-start gap-1',
                  )}>
                  <p className={clsxm('h-fit ', idx === 11 && 'text-red-700', idx === 12 && 'text-red-700')}>
                    {item.title}
                  </p>
                  <p className='text-gray text-14 text-wrap w-full '>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <RegisterBottomBanner />
    </div>
  );
}
