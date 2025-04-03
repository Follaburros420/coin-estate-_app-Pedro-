import React, { useState } from 'react';
import StyledImage from './StyedImage';

const Faq = [
  {
    id: 1,
    question: '¿De dónde vienen mis rendimientos y cuando empiezo a ganar?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      'Tus rendimientos provienen de los ingresos netos generados por el alquiler del inmueble. Sin embargo, el inicio de los beneficios depende del tipo de proyecto (Remodelación o ya rentando), además de la estabilización de la propiedad, es decir, de cuánto tiempo tome alcanzar un nivel de ocupación y flujo de caja que permita distribuir rendimientos. Esto puede implicar que, en los primeros meses, se dediquen recursos a cubrir gastos operativos y de puesta en marcha antes de generar beneficios significativos.',
  },
  {
    id: 2,
    question: '¿Qué derechos tengo sobre el inmueble como inversionista?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      'Al participar mediante un contrato de cuentas en participación, adquieres derechos económicos, es decir, el derecho a recibir una parte de los beneficios derivados del arrendamiento. No obtienes, en cambio, derechos de propiedad directa sobre el inmueble.',
  },
  {
    id: 3,
    question: '¿Esto es legal?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      '¡Por supuesto que sí!, este tipo de inversión es completamente legal, Pues cumplimos con toda la normativa tanto en Colombia como en los Estados Unidos para asegurar una inversión sólida a nuestros usuarios, puedes obtener más información en www/Legal/',
  },
  {
    id: 4,
    question: '¿Es posible vender o ceder mi participación?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      'La posibilidad de vender tu participación estará sujeta a las condiciones estipuladas en el contrato de cada proyecto, si deseas vender tu participación debes comunicárnoslo para que nosotros podamos ofrecer a otros inversionistas, así mismo si deseas cederla a otra persona, esto debe hacerse dentro de la plataforma y la otra persona debe cumplir con nuestros filtros de seguridad y verificación KYC. Si la posibilidad de vender rápidamente tu inversión es un factor decisivo para ti, podría ser prudente evaluar alternativas que ofrezcan mayor liquidez.',
  },
  {
    id: 5,
    question: '¿Existe un tiempo mínimo de estadía?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      'Sí, normalmente se establece un plazo mínimo de permanencia en el contrato. Este periodo se define para asegurar la viabilidad y estabilidad de la operación, permitiendo que el inmueble se estabilice y se generen los rendimientos proyectados. La duración exacta dependerá de lo acordado en el contrato, por lo que es crucial revisarlo antes de comprometer tu inversión.',
  },
  {
    id: 6,
    question: '¿Quién es el responsable de la administración y operación de la propiedad?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      'La responsabilidad de la administración y operación recae en la entidad designada por CoinEstate, que puede ser un equipo interno o una empresa externa especializada en la gestión de inmuebles. Este equipo se encarga de todas las tareas operativas, desde la gestión de arrendatarios hasta el mantenimiento y la comercialización de la propiedad, siguiendo lo establecido contractualmente.',
  },
  {
    id: 7,
    question: '¿Quién determina en qué estoy invirtiendo mi dinero?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      'Tú eres el único que puede hacer la selección de los inmuebles en los que inviertes. Nosotros nos comprometemos a realizar un riguroso análisis de mercado y evaluar oportunidades de inversión para determinar cuáles ofrecen la mejor rentabilidad y estabilidad. Como inversionista, participas en el proyecto a partir de las opciones que la CoinEstate ya ha analizado y seleccionado.',
  },
  {
    id: 8,
    question: '¿Qué sucede si la propiedad queda vacante?',
    icon: '/assets/svg/arrow1.svg',
    answer:
      'La vacancia de la propiedad afectará directamente los ingresos por arrendamiento, lo que podría retrasar o reducir la distribución de rendimientos. Para mitigar este riesgo, hemos desarrollado estrategias estrategias de marketing y gestión activa, orientadas a minimizar los periodos de vacancia. Adicionalmente, el contrato puede incluir mecanismos para gestionar este tipo de contingencias, como reservas para cubrir períodos sin inquilinos.',
  },
];

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(1);

  const toggle = (items) => {
    setIsOpen(items.id);
  };
  return (
    <div className='px-6 '>
      <div className='max-w-[1161px] mx-auto w-full mt-16  '>
        <h1 className='text-black-100 text-center font-inter text-28 sm:text-36 font-semibold'>Preguntas Frecuentes</h1>
        <div className='mt-8 sm:mt-16 grid grid-cols-1'>
          {Faq.map((items, idx) => {
            return (
              <div key={`${items.id}___${idx}`} className='cursor-pointer'>
                <div
                  onClick={() => {
                    if (isOpen === items.id) {
                      setIsOpen(null);
                    } else {
                      toggle(items);
                    }
                  }}
                  className=' border border-gray-200 shadow-md py-2 px-4  mt-2 rounded-[16px]  mx-auto lg:mx-0 bg-white pb-4'>
                  <div className='flex justify-between items-center'>
                    <p className='text-black-100 text-14 font-bold'>{items.question}</p>
                    <div className='px-4 py-5 '>
                      <StyledImage src={items.icon} alt='' className=' w-4 h-2  ' />
                    </div>
                  </div>
                  {isOpen === items.id && (
                    <p className='text-grey-100 text-14'>{items.answer}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
