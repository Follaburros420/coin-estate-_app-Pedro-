/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import RegisterBottomBanner from '../RegisterBottomBanner';
import StyledImage from '../StyedImage';
import { Guide_Investing_Data, Tokenization_Data } from '@/_mock/data';
import WorksTopBanner from '../WorksTopBanner';

export default function Tokenizations() {
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
    <div className=' '>
      <WorksTopBanner
        heading={'El futuro del sector inmobiliario, la “tokenización”'}
        desc={
          'Descubre los Pasos Detallados y Mecanismos Detrás de la Conversión de Activos Inmobiliarios en Tokens Negociables, Asegurando una Experiencia Transparente y Sin Interrupciones para los Inversores'
        }
      />
      <div className='my-10 md:my-20 p-6 md:p-10 '>
        <div className='w-full max-w-[1161px] mx-auto  text-center sm:text-start '>
          <div className='flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-20 '>
            <img src='/assets/images/team/ent.png' className='w-full max-w-[491px]' />
            <div className='w-full max-w-[456px] text-center lg:text-start '>
              <p className='text-28 md:text-36 font-bold font-inter capitalize md:leading-[50px] '>
                Entendiendo la tokenización de inmuebles
              </p>
              <p className='text-gray font-medium font-inter mt-6 '>
                Descubre cómo la tokenización está transformando la forma de invertir en inmuebles, haciendo accesible
                la propiedad fraccionada para todos
              </p>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-start gap-6 mt-10 lg:mt-16 '>
            <div className='w-full lg:max-w-[371px]'>
              {Tokenization_Data.map((item, idx) => {
                return (
                  <button
                    onClick={() => scrollToSection(item.scrollTo)}
                    key={idx}
                    className='flex items-center justify-between focus:outline-none gap-5 bg-[#ffffff] py-2 my-4 shadow-md rounded-[4px] p-4 w-full text-start '>
                    <p className='text-12 sm:text-14 font-medium text-lightGray-300 '>{item.title}</p>
                    <StyledImage src='/assets/svg/downArrow.svg' className='w-full max-w-6 h-6 ' />
                  </button>
                );
              })}
            </div>
            <div className='bg-white shadow-md p-6 rounded-[8px] w-full  '>
              <div id='section1'>
                <p className='font-inter font-bold '> Qué es la Tokenización?</p>
                <p className='text-14 font-medium font-inter text-gray mt-4  '>
                  En el contexto de la inversión inmobiliaria, la tokenización es el proceso de representar
                  digitalmente, a través de un conjunto de tokens digitales (Concepto explicado en glosario), el derecho
                  de propiedad que se tiene sobre un activo inmobiliario. Al el derecho estar representado en tokens, se
                  hace posible poder comprar solo fracciones de la totalidad del derecho de propiedad sobre el activo;
                  Prácticamente se hace posible comprar fracciones de un inmueble, de manera que ya no es necesario
                  comprar la totalidad de un activo inmobiliario para beneficiarse de las rentabilidades que este pueda
                  generar.
                </p>
                <p className='text-14 font-medium font-inter text-gray  '>
                  Cada inmueble o proyecto inmobiliario tiene su propio conjunto de tokens, donde cada token representa
                  una fracción de su respectivo activo inmobiliario, estos tokens se pueden comprar, vender o
                  intercambiar, y están sujetos al derecho sobre la rentabilidad y beneficios obtenidos por el inmueble,
                  así como a sus pérdidas.
                </p>
              </div>
              <div id='section2' className='mt-5 '>
                <p className='font-inter font-bold '>¿Cómo funciona?</p>
                <p className='text-14 font-medium font-inter text-gray mt-4  '>
                  El proceso de tokenización empieza cuando un proyecto inmobiliario se divide en pequeñas partes
                  representadas por tokens.{' '}
                  <span className='text-Yellow-200 '>Cada token equivale a una participación en el negocio.</span>
                  Tú, como inversor, puedes comprar estos tokens fácilmente a través de nuestra plataforma. Si en algún
                  momento decides negociar con tus tokens, puedes hacerlo en el mercado secundario, donde otros
                  inversores podrán comprar tus tokens. Todo esto ocurre de manera rápida y segura gracias a la
                  tecnología blockchain, que se encarga de verificar y registrar todas las transacciones.
                </p>
              </div>

              <div id='section3' className='mt-5 '>
                <div>
                  <p className='text-18 font-bold font-inter mt-6 '>¿Qué beneficios trae la Tokenización?</p>
                  <div className='flex items-start gap-2 mt-4 '>
                    <div className='text-gray text-14 '>1.</div>
                    <p className='text-14 font-medium font-inter text-gray  '>
                      Accesibilidad y democratización de la inversión: Antes, para invertir en bienes raíces,
                      necesitabas una gran cantidad de dinero, pero la tokenización ha cambiado eso. Ahora, puedes
                      empezar con montos bajos y acceder a uno de los mercados más rentables del mundo: el inmobiliario
                      estadounidense. Imagina que puedes formar parte de un proyecto inmobiliario con la misma facilidad
                      que compras cualquier otro activo digital. Esto no solo democratiza la inversión, sino que también
                      te permite ganar en dólares y aprovechar un mercado históricamente seguro.
                    </p>
                  </div>
                  <div className='flex items-start gap-2 mt-4 '>
                    <div className='text-gray text-14 '>2.</div>
                    <p className='text-14 font-medium font-inter text-gray  '>
                      Mejor liquidez: En el mundo tradicional, vender una propiedad puede tomar meses. Con la
                      tokenización, puedes vender tus fracciones de propiedad (tokens) rápidamente en el mercado
                      secundario (cuando sea implementado), en el momento que decidas liquidar tu inversión. Como más
                      personas pueden participar en este tipo de inversiones, hay más compradores y vendedores
                      disponibles, lo que mejora enormemente la liquidez. Esto teóricamente te facilita salir de una
                      inversión cuando lo necesites, aprovechando las ganancias de la valorización de una manera mucho
                      más rápida y eficiente que en el mercado inmobiliario tradicional.
                    </p>
                  </div>
                  <div className='flex items-start gap-2 mt-4 '>
                    <div className='text-gray text-14 '>3.</div>
                    <p className='text-14 font-medium font-inter text-gray  '>
                      Facilidad para diversificar tu portafolio: Diversificar significa distribuir tu dinero en
                      diferentes inversiones para reducir riesgos. Con la tokenización, puedes invertir en fracciones de
                      múltiples propiedades sin necesidad de grandes sumas de dinero. Esto te permite tener una
                      participación en varios inmuebles, haciendo tu inversión más segura. Así, si uno de tus activos no
                      rinde como esperabas, los otros pueden compensar esa pérdida.
                    </p>
                  </div>
                  <div className='flex items-start gap-2 mt-4 '>
                    <div className='text-gray text-14 '>4.</div>
                    <p className='text-14 font-medium font-inter text-gray  '>
                      Reducción de costos: Con la tokenización, se eliminan muchos de los intermediarios que normalmente
                      encarecen las transacciones inmobiliarias: no hay que pagar comisiones a agentes, abogados o
                      notarios. Los contratos inteligentes y la tecnología blockchain hacen todo el proceso más
                      eficiente, lo que significa que una mayor parte de tu dinero va directamente a la inversión y no a
                      cubrir tarifas. Esto se traduce en un mayor retorno para ti como inversor.
                    </p>
                  </div>
                  <div className='flex items-start gap-2 mt-4 '>
                    <div className='text-gray text-14 '>5.</div>
                    <p className='text-14 font-medium font-inter text-gray  '>
                      Mayor seguridad y transparencia: La tecnología blockchain garantiza que todas las transacciones y
                      registros sean inmutables y accesibles. Imagina un libro de contabilidad que nadie puede alterar:
                      cada movimiento está registrado de manera permanente, lo que te protege de fraudes y errores.
                      Además, como toda la información es pública y visible para todos, puedes confiar en que las
                      inversiones se manejan con total transparencia. Esto genera un entorno seguro en el que puedes
                      invertir con total tranquilidad, sabiendo que tu capital está protegido.
                    </p>
                  </div>
                </div>
              </div>
              <div id='section4'>
                <p className='text-18 font-bold font-inter mt-6 '>¿Qué papel juega CoinEstate?</p>
                <div className='text-gray text-14 font-inter mt-4 '>
                  <p>
                    Somos pioneros en la tokenización de inmuebles en Colombia y nuestro compromiso es traer todas las
                    innovaciones que esta nueva dinámica de mercado puede ofrecer. Sabemos que el éxito en las
                    inversiones depende de tener acceso a las mejores herramientas y oportunidades, por lo que en
                    <span className='text-Yellow-200 '>CoinEstate</span> estamos trabajando intensamente para ofrecerte
                    una plataforma moderna, segura y accesible, diseñada para hacer que invertir en bienes raíces sea
                    tan sencillo como rentable.
                  </p>
                  <p>
                    Nuestro equipo está enfocado en llevar a cabo mejoras e innovaciones lo más rápido posible,
                    garantizando que cada inversor tenga acceso a las mismas oportunidades que los grandes capitales,
                    pero sin las barreras de mercado tradicionales. Cada día trabajamos para que puedas aprovechar al
                    máximo el poder de la tokenización, conectándote con inversiones en inmuebles de alto nivel en los
                    Estados Unidos, todo con un acceso rápido, seguro y desde montos bajos.
                  </p>
                  <p>
                    En <span className='text-Yellow-200 '>CoinEstate,</span> no solo queremos que inviertas, queremos
                    que lo hagas de manera informada y con completa seguridad, sabiendo que detrás de cada transacción
                    hay un equipo comprometido con tu éxito.
                  </p>
                  <p className='mt-4 '>¡Esperamos que te unas a esta nueva revolución en la inversión inmobiliaria!</p>
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
