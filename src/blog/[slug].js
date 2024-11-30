import React from "react";
import BlogHeaders from "./BlogHeaders";
import {
  BlogTwo_QueryFour_Content,
  BlogTwo_QueryTwo_Content,
} from "@/_mock/data";

export default function BlogTwo() {
  return (
    <div className="px-6 sm:px-10 ">
      <div className="w-full max-w-[1161px] mx-auto my-10 sm:my-20 ">
        <BlogHeaders
          userImg={"/assets/svg/UserIcon.svg"}
          userName={"Pedro Ardila"}
          date={"Octubre 17, 2024"}
          dataBtn={"Sector Inmobiliario"}
          mainImg={"/assets/images/BlogTwoMainImg.png"}
          heading={
            "¿Por qué el mercado inmobiliario es tan seguro y cómo la tokenización lo mejora aún más?"
          }
        />
        <div className="text-14 font-inter text-gray font-medium bg-white rounded-[8px] shadow-md mt-8 sm:mt-16 p-6 ">
          <div>
            <p>
              El mercado inmobiliario sigue siendo una de las formas más
              efectivas y comunes de construir y preservar riqueza,
              especialmente entre los más adinerados. De hecho, en Estados
              Unidos, se estima que alrededor del 90% de los millonarios han
              invertido en bienes raíces en algún momento de sus vidas. Esto se
              debe a los grandes márgenes de beneficio y los bajos riesgos
              asociados con este tipo de inversiones.
            </p>
            <p>
              Ahora, gracias a la tokenización de inmuebles mediante tecnología
              blockchain, ganar como los ricos está al alcance de todos. Ya no
              necesitas comprar una propiedad completa para invertir en el
              sector inmobiliario. Las barreras de entrada se han reducido
              significativamente: no se requieren altos montos de inversión
              mínima, y no tienes que esperar años para comenzar a ver
              ganancias.
            </p>
            <p>
              Desde la semana uno, con montos muy bajos y desde la comodidad de
              tu hogar, puedes empezar a invertir en el sector inmobiliario de
              Estados Unidos, ganar en dólares y gastar en pesos. En este blog,
              exploraremos las ventajas del mercado inmobiliario, por qué es
              considerado seguro, los riesgos asociados y cómo la tokenización
              ayuda a mitigar estos riesgos y mejora la seguridad y eficiencia
              del mercado.
            </p>
          </div>
          <div>
            <p className="text-18 font-bold text-black-100 text-center sm:text-start mt-10 ">
              Ventajas del Mercado Inmobiliario
            </p>
            <div>
              {BlogTwo_QueryTwo_Content.map((item, idx) => {
                return (
                  <div key={idx} className="mt-5 ">
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                    <p>{item.descTwo}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-5 ">
            <p className="text-18 font-bold text-black-100 text-center sm:text-start mt-10  ">
              Riesgos Asociados al Mercado Inmobiliario
            </p>
            <div className="mt-4 ">
              <p>
                A pesar de sus ventajas, el mercado inmobiliario también
                presenta algunos riesgos:
              </p>
              <div className="mt-5 ">
                <p>1. Liquidez Limitada</p>
                <p>
                  Uno de los mayores desafíos del mercado inmobiliario
                  tradicional es la falta de liquidez. Vender una propiedad
                  puede llevar tiempo, a veces meses o incluso años, y puede no
                  ser posible hacerlo rápidamente en situaciones de emergencia.
                </p>
              </div>
              <div className="mt-5 ">
                <p>2. Factores Económicos</p>
                <p>
                  Cambios bruscos en la economía, como recesiones o crisis
                  financieras, pueden afectar el valor de las propiedades y la
                  demanda de alquileres. Por ejemplo, durante la crisis
                  financiera de 2008, los precios de las viviendas en Estados
                  Unidos cayeron significativamente.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 ">
            <p className="text-18 font-bold text-black-100 text-center sm:text-start  ">
              Cómo la Tokenización Mejora el Mercado Inmobiliario
            </p>
            <p className="mt-4 ">
              La tokenización, que implica dividir el derecho de propiedad sobre
              un inmueble en tokens digitales respaldados por tecnología
              blockchain, ayuda a reducir considerablemente estos riesgos y
              aporta nuevas ventajas:
            </p>
            <div>
              {BlogTwo_QueryFour_Content.map((item, idx) => {
                return (
                  <div key={idx} className="mt-5 ">
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                    <p>{item.descTwo}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-10">
            En pocas palabras, el mercado inmobiliario sigue siendo una de las
            mejores maneras de construir y preservar riqueza debido a su
            estabilidad y rentabilidad constante. La tokenización mejora estas
            ventajas al aumentar la liquidez, facilitar la diversificación y
            promover la transparencia. Invertir es ahora más accesible y seguro
            gracias a la tecnología blockchain, abriendo nuevas oportunidades
            para los inversores globales.
          </p>
        </div>
      </div>
    </div>
  );
}
