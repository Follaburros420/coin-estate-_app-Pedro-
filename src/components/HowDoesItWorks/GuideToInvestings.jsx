"use client";
/* eslint-disable react/no-unescaped-entities */
import { Guide_Investing_Data } from "@/_mock/data";
import React, { useEffect, useState } from "react";
import StyledImage from "../StyedImage";
import RegisterBottomBanner from "../RegisterBottomBanner";
import WorksTopBanner from "../WorksTopBanner";

export default function GuideToInvesting() {
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
    <div className=" ">
      <WorksTopBanner
        heading={
          "Inicia tu camino con esta guía y comienza a invertir en el mercado inmobiliario de Estados Unidos hoy mismo."
        }
        desc={
          "Descubre los Pasos Detallados y Mecanismos Detrás de la Conversión de Activos Inmobiliarios en Tokens Negociables, Asegurando una Experiencia Transparente y Sin Interrupciones para los Inversores"
        }
      />
      <div className="my-10 sm:my-20 px-6 sm:px-10 ">
        <div className="w-full max-w-[1161px] mx-auto  text-center sm:text-start ">
          <p className="text-28 md:text-36 font-bold font-inter ">
            Guía para invertir
          </p>
          <p className="text-gray font-medium font-inter mt-6 ">
            Guía paso a paso para invertir en los inmuebles y proyectos que
            desees, desde cómo crear tu cuenta, hasta cómo comprar fracciones,
            reinvertir o retirar ganancias.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10 lg:mt-16 ">
            <div className="w-full lg:max-w-[371px] col-span-1 ">
              {Guide_Investing_Data.map((item, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(item.scrollTo)}
                    className="flex items-center justify-between focus:outline-none gap-5 bg-[#ffffff] py-2 my-4 shadow-md rounded-[4px] p-4 w-full text-start "
                  >
                    <p className="text-12 truncate sm:text-14 leading-[18px] font-medium text-lightGray-300 ">
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
            <div className="bg-white shadow-md p-6 rounded-[8px] w-full col-span-2 ">
              <div id="section1">
                <p className="font-inter font-bold ">Paso 1: Crea tu cuenta</p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                  Visita el sitio web de{" "}
                  <span className="text-Yellow-200 ">CoinEstate</span> y haz
                  clic en el botón "Registrarse". Completa el formulario de
                  registro con tu nombre, número de teléfono y correo
                  electrónico, para que podamos comunicarnos contigo, ofrecerte
                  soporte personalizado y mantenerte al tanto de actualizaciones
                  importantes.
                </p>
                <p className="text-14 font-medium font-inter text-gray mt-8  ">
                  Luego, verifica tu correo electrónico abriendo el mensaje de
                  confirmación que recibirás automáticamente y activando tu
                  cuenta. Esta verificación es necesaria para garantizar la
                  seguridad de tu cuenta y de tus inversiones.
                </p>
                <button className="mt-6 font-semibold font-inter py-3 px-8 bg-Yellow-200 rounded-full text-white ">
                  Regístrate
                </button>
              </div>
              <div className="mt-5 " id="section2">
                <p className="font-inter font-bold ">
                  Paso 2: Selecciona el o los inmuebles/proyectos en los que
                  deseas invertir.
                </p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                   En nuestra sección de “marketplace” navega por la lista de
                  proyectos e inmuebles disponibles, revisa la información
                  detallada de cada proyecto, ubicación, tipo de inmueble,
                  rendimiento esperado, fotografías, entre otros. Puedes
                  utilizar el simulador de inversión para determinar el monto
                  que deseas invertir, y hacerte una idea del comportamiento que
                  tendrá tu inversión a lo largo del tiempo.
                </p>
              </div>
              <div className="mt-5 " id="section3">
                <p className="font-inter font-bold ">
                  Paso 3: Realiza tu verificación KYC (Know Your Coustumer)
                </p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                  La verificación KYC es vital  para proporcionar a nuestros
                  usuarios un entorno seguro y confiable de inversión. Este
                  proceso permite proteger tus activos ante posibles
                  implicaciones legales derivadas de otros inversores y nos
                  ayuda a prevenir actividades ilícitas en la plataforma. Para
                  completar la verificación, solo debes seguir los pasos que se
                  te presentarán la primera vez que intentes comprar tokens. Se
                  te solicitará información como documentos de identificación,
                  entre otros datos necesarios.¡Recuerda que este proceso solo
                  se hace una vez!.
                </p>
                <p className="text-14 font-medium font-inter text-gray  ">
                  Posterior a la validación de tu identidad en la plataforma,
                  podrás acceder a todas las funcionalidades de{" "}
                  <span className="text-Yellow-200 ">CoinEstate</span> sin
                  complicaciones adicionales. Esto garantiza que tu experiencia
                  de inversión sea fluida, segura y cumpla con los estándares
                  regulatorios necesarios.
                </p>
              </div>
              <div className="mt-5 " id="section4">
                <p className="font-inter font-bold ">
                  Paso 4: Elige tu método de pago
                </p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                  Para hacer efectiva la compra de tokens, elige el método de
                  pago que prefieras y procede con el mismo. Contamos con
                  múltiples formas de pago, como transferencia bancaria, pagos
                  con tarjetas de crédito y débito e incluso pagos en efectivo
                  en ciertos puntos físicos
                </p>
                <p className="text-14 font-medium font-inter text-gray  ">
                  Una vez hayas cumplido con todos los requisitos para
                  participar en el negocio, podrás acceder a un panel de
                  inversionista para monitorear el rendimiento de las
                  inversiones, ver detalles sobre pagos de rentas,
                  revalorización del inmueble, y cualquier actualización
                  relevante relacionada con el proyecto.
                </p>
              </div>
              <div className="mt-5 " id="section5">
                <p className="font-inter font-bold ">
                  Paso 5: Recibe tus rendimientos y reinvierte o retira tus
                  ganancias
                </p>
                <p className="text-14 font-medium font-inter text-gray mt-4  ">
                  Las rentabilidades provenientes de tus participaciones en el
                  negocio se distribuirán automáticamente a tu cuenta en{" "}
                  <span className="text-Yellow-200 ">CoinEstate,</span> este
                  saldo se reflejará en el panel de control del inversionista.
                  recuerda que los rendimientos se recibirán en forma de USD,
                  pues el pago de las rentas es efectuado en esta divisa. Te
                  brindamos acceso al Panel de Inversiones, en el cual podrás
                  ver tus participaciones y las de otros, rendimientos,
                  historial de transacciones y otras métricas importantes. Así
                  podrás tener una visión clara de tus rentabilidades y decidir
                  lbremente como quieres utilizar tus ganancias.
                </p>
                <div>
                  <p className="text-14 font-medium font-inter text-[#3B5999] mt-6 ">
                    Recuerda que con tus ganancias podrás:
                  </p>
                  <div className="flex items-start gap-2 ">
                    <div className="bg-gray p-[3px] rounded-full mt-[6px] " />
                    <p className="text-14 font-medium font-inter text-gray  ">
                      Reinvertir: Puedes reinvertir tus ganancias fácilmente
                      comprando más tokens, incrementando así tu participación
                      en otros proyectos y potencialmente aumentando tus futuros
                      rendimientos.
                    </p>
                  </div>
                  <div className="flex items-start gap-2 ">
                    <div className="bg-gray p-[3px] rounded-full mt-[6px] " />
                    <p className="text-14 font-medium font-inter text-gray  ">
                      Retirar: También tienes la opción de retirar tus ganancias
                      y transferirlas a tu cuenta bancaria preferida de manera
                      rápida y sencilla, disfrutando de los beneficios de la
                      apreciación del dólar frente a tu moneda local. El proceso
                      es seguro, y puedes realizar retiros cuando lo necesites,
                      sin restricciones complicadas.
                    </p>
                  </div>
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
