"use client";
import React, { useEffect, useState } from "react";
import WorksTopBanner from "../WorksTopBanner";
import {
  Why_CoinEstate_Data,
  Why_CoinEstate_QueryOne_Lists_Data,
} from "@/_mock/data";
import StyledImage from "../StyedImage";
import RegisterBottomBanner from "../RegisterBottomBanner";

export default function WhyCoinEstates() {
  const [isBrowser, setIsBrowser] = useState(false);

  // Ensure the document is available only in the browser
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const scrollToSection = (id) => {
    if (isBrowser) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <WorksTopBanner
        heading={
          <span>
            Descubre qué hace a{" "}
            <span className="text-Yellow-200 ">CoinEstate</span> pionero en
            Colombia y cómo puedes beneficiarte{" "}
          </span>
        }
        desc="Con CoinEstate, invertir en bienes raíces internacionales nunca había sido tan simple y accesible."
      />
      <div className="px-6 md:px-10 my-10 sm:my-20 ">
        <div className="font-inter  w-full max-w-[1161px] mx-auto ">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-20 ">
            <StyledImage
              src="/assets/images/team/por.png"
              className="w-full max-w-[380px] min-h-[380px] "
            />
            <div className="w-full max-w-[456px] text-center lg:text-start ">
              <p className="text-28 md:text-36 font-bold font-inter capitalize md:leading-[50px] ">
                ¿Por qué invertir en{" "}
                <span className="text-Yellow-200 ">CoinEstate?</span>
              </p>
              <p className="text-gray font-medium font-inter mt-6 ">
                Permítenos explicarte los beneficios de CoinEstate, que nos
                posicionan como pioneros en el mercado de inversión inmobiliaria
                internacional mediante la tokenización y la tecnología de cadena
                de bloques.
              </p>
            </div>
          </div>
          <div className="mt-16 flex flex-col md:flex-row items-start gap-6 ">
            <div className="w-full lg:max-w-[371px] ">
              {Why_CoinEstate_Data.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(item.scrollTo)}
                    className="flex items-center justify-between focus:outline-none gap-5 bg-[#ffffff] py-2 my-4 shadow-md rounded-[4px] p-4 w-full text-start "
                  >
                    <p className="text-14 truncate sm:text-14 font-medium text-lightGray-300 ">
                      {item.title}
                    </p>
                    <StyledImage
                      src="/assets/svg/downArrow.svg"
                      className="w-full max-w-6 h-6 "
                    />
                  </button>
                );
              })}
            </div>

            <div className="bg-white shadow-md p-4 sm:p-6 rounded-[8px] w-full ">
              <div id="section1">
                <p className="font-inter font-bold text-center sm:text-start ">
                  En pocas palabras, con{" "}
                  <span className="text-Yellow-200 ">CoinEstate</span> podrás:
                </p>
                <div className="mt-4">
                  {Why_CoinEstate_QueryOne_Lists_Data.map((item, idx) => {
                    return (
                      <div key={idx} className="flex items-start gap-2 mt-1 ">
                        <div className="bg-gray p-[3px] rounded-full mt-[6px] " />
                        <p className="text-14 font-medium font-inter text-gray  ">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div id="section2" className="mt-5 ">
                <p className="font-inter font-bold text-center sm:text-start ">
                  Qué ventajas competitivas tenemos con respecto a otras
                  plataformas de inversión inmobiliaria?
                </p>
                <div className="flex items-start gap-2 mt-4 ">
                  <div className="bg-gray p-[3px] rounded-full mt-[6px] " />
                  <p className="text-14 font-medium font-inter text-gray  ">
                    Ofrecemos a los inversores un{" "}
                    <span className="text-Yellow-400 ">
                      modelo de prueba rápido y accesible con montos bajos.
                    </span>{" "}
                    Ya no es necesario invertir grandes sumas ni esperar largos
                    periodos de tiempo para comprobar cómo funciona nuestra
                    plataforma. Con CoinEstate, puedes invertir desde pequeños
                    montos en propiedades que ya están generando rentas o en
                    proyectos de remodelación. Esto te permite probar el modelo
                    de negocio sin complicaciones y obtener resultados en menor
                    tiempo gracias a la tokenización, tecnología y modelo de
                    negocio implementados.
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-4 ">
                  <div className="bg-gray p-[3px] rounded-full mt-[6px] " />
                  <p className="text-14 font-medium font-inter text-gray  ">
                    Ofrecemos a los inversores un{" "}
                    <span className="text-Yellow-400 ">
                      modelo de prueba rápido y accesible con montos bajos.
                    </span>{" "}
                    Ya no es necesario invertir grandes sumas ni esperar largos
                    periodos de tiempo para comprobar cómo funciona nuestra
                    plataforma. Con CoinEstate, puedes invertir desde pequeños
                    montos en propiedades que ya están generando rentas o en
                    proyectos de remodelación. Esto te permite probar el modelo
                    de negocio sin complicaciones y obtener resultados en menor
                    tiempo gracias a la tokenización, tecnología y modelo de
                    negocio implementados.
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-4 ">
                  <div className="bg-gray p-[3px] rounded-full mt-[6px] " />
                  <p className="text-14 font-medium font-inter text-gray  ">
                    Parte de lo que nos diferencia es nuestra{" "}
                    <span className="text-Yellow-400">
                      visión clara y estructurada a corto, medio y largo plazo.
                    </span>{" "}
                    En CoinEstate, estamos trabajando continuamente para
                    implementar funcionalidades innovadoras y revolucionarias.
                    Es solo cuestión de tiempo para que el mercado secundario,
                    con todos sus beneficios de liquidez y flexibilidad, y los
                    sistemas de colateralización de tokens se hagan realidad,
                    ofreciendo nuevas formas de maximizar el valor de tus
                    inversiones. Estas mejoras nos permitirán seguir
                    posicionándonos como pioneros en la transformación del
                    sector inmobiliario.
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-4 ">
                  <div className="bg-gray p-[3px] rounded-full mt-[6px] " />
                  <p className="text-14 font-medium font-inter text-gray  ">
                    Democratizamos la inversión en el sector inmobiliario
                    gracias a la tecnología blockchain.{" "}
                    <span className="text-Yellow-400">
                      Ahora es posible invertir en bienes raíces desde montos
                      muy bajos, haciendo accesibles oportunidades que antes
                      estaban reservadas solo para unos pocos.
                    </span>{" "}
                    Con CoinEstate, cualquiera puede participar en el mercado
                    inmobiliario de Estados Unidos y beneficiarse de las
                    rentabilidades en dólares, maximizando el rendimiento de la
                    inversión. Además, al estar en una divisa fuerte como el
                    dólar, tu inversión tiende a valorizarse frente al peso
                    colombiano (COP), aprovechando su comportamiento
                    históricamente favorable.
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-4 ">
                  <div className="bg-Yellow-400 p-[3px] rounded-full mt-[6px] " />
                  <p className="text-14 font-medium font-inter text-gray  ">
                    <span className="text-Yellow-400">
                      {" "}
                      Facilitamos la reinversión de capital y el aprovechamiento
                      del interés compuesto.
                    </span>{" "}
                    Con nuestros bajos montos de entrada, reinvertir tus
                    beneficios nunca ha sido tan sencillo.
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-4 ">
                  <div className="bg-Yellow-400 p-[3px] rounded-full mt-[6px] " />
                  <p className="text-14 font-medium font-inter text-gray  ">
                    <span className="text-Yellow-400">
                      Automatización y eficiencia en procesos.
                    </span>{" "}
                    Gracias a la tecnología blockchain y los contratos
                    inteligentes, eliminamos intermediarios y automatizamos
                    procesos que antes requerían intervención humana y altos
                    costos. Esto no solo hace que las operaciones sean más
                    rápidas y seguras, sino que también reduce
                    significativamente los gastos de transacción,
                    <span className="text-Yellow-400 ">
                      {" "}
                      permitiendo que más valor llegue directamente a los
                      inversores.
                    </span>
                  </p>
                </div>
                <button className="mt-6 font-semibold font-inter py-3 px-8 bg-Yellow-200 rounded-full text-white flex justify-center sm:justify-start ">
                  Regístrate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterBottomBanner />
    </div>
  );
}
