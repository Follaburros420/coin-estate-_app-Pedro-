import { ComprehensiveServicesRemodeling_Content } from "@/_mock/data";
import React from "react";
import StyledImage from "./StyedImage";

export default function ComprehensiveServicesRemodel() {
  return (
    <div className="px-6 sm:px-10 my-10 sm:my-20 font-inter ">
      <div className="w-full max-w-[1161px] mx-auto ">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between ">
          <StyledImage
            className="w-full max-w-[455px] min-h-[314px] rounded-lg overflow-hidden"
            src="/assets/images/team/employ.png"
          />
          <div className=" w-full max-w-[507px] ">
            <p className="text-28 sm:text-36 text-center font-bold capitalize leading-none ">
              ¿qué es un proyecto de remodelación en{" "}
              <span className="text-Yellow-200 ">CoinEstate</span>?
            </p>
            <p className="mt-5 ">
              Invertir en una remodelación inmobiliaria permite aumentar el
              valor de la propiedad, obtener mayor rentabilidad y acelerar su
              revalorización, haciéndola más atractiva para futuros inquilinos o
              compradores.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-[8px] p-6 mt-8 sm:mt-16 sm:text-20 text-gray font-medium ">
          <p>
            En <span className="text-Yellow-200 ">CoinEstate</span>, te
            ofrecemos la oportunidad de invertir en proyectos de remodelación
            inmobiliaria, una estrategia que combina el valor de las propiedades
            con el potencial de aumentar su rentabilidad tras una renovación.
            Con este modelo, puedes participar en la revalorización acelerada de
            inmuebles que están siendo mejorados para incrementar su valor de
            mercado y su atractivo para futuros inquilinos o compradores.
          </p>
          <div>
            {ComprehensiveServicesRemodeling_Content.map((item, idx) => {
              return (
                <div key={idx} className="mt-5 ">
                  <p className="text-18 font-bold text-black-100 text-center sm:text-start ">
                    {item.questionTitle}
                  </p>
                  <div className="mt-4  ">
                    <p>
                      <span className="text-Yellow-800 font-bold ">
                        {item.spanOne}{" "}
                      </span>
                      {item.descOne}
                    </p>
                    <p>
                      <span className="text-Yellow-800 font-bold ">
                        {item.spanTwo}{" "}
                      </span>
                      {item.descTwo}
                    </p>
                    <p>
                      <span className="text-Yellow-800 font-bold ">
                        {item.spanThree}{" "}
                      </span>
                      {item.descThree}
                    </p>
                  </div>
                </div>
              );
            })}
            <p className="mt-5 ">
              En pocas palabras los proyectos de remodelación en CoinEstate son
              ideales para inversores que buscan rentabilidad a través de la
              valorización de inmuebles, ya que permiten aprovechar el
              incremento de valor generado por las mejoras realizadas en las
              propiedades. Estos proyectos ofrecen oportunidades a mediano
              plazo, donde el valor del inmueble puede crecer de forma
              significativa tras la remodelación, brindando la posibilidad de
              obtener retornos considerables. Además, los inversores tienen la
              oportunidad de participar en la transformación de las propiedades,
              beneficiándose de las oportunidades que ofrece el mercado de
              remodelación y accediendo a proyectos exclusivos que
              tradicionalmente estarían fuera de su alcance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
