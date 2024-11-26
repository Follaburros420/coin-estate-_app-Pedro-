/* eslint-disable react/no-unescaped-entities */
import { ComprehensiveServices_Content } from "@/_mock/data";
import React from "react";
import StyledImage from "./StyedImage";

export default function ComprehensiveService() {
  return (
    <div className="px-6 sm:px-10 my-10 sm:my-20 ">
      <div className="w-full max-w-[1161px] mx-auto ">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between md:mx-20 ">
          <StyledImage
            className="w-full max-w-[283px] min-h-[249px] "
            src="/assets/images/ComprehensiveServiceMainImg.png"
          />
          <p className="text-28 sm:text-36 text-center w-full max-w-[587px] font-bold ">
            ¿qué es el modelo “Tenant Occupied Property”?
          </p>
        </div>
        <div className="sm:text-20 text-gray font-medium p-6 rounded-[8px] shadow-md mt-8 sm:mt-16 ">
          <p>
            En <span className="text-Yellow-200 ">CoinEstate,</span> ofrecemos a
            los inversores la posibilidad de adquirir fracciones de propiedades
            que ya están ocupadas por inquilinos y generando ingresos por
            alquiler. Este modelo, conocido como "Tenant Occupied Property",
            permite a los inversores obtener retornos inmediatos desde el primer
            mes, ya que las propiedades están rentadas en el momento de la
            inversión.
          </p>
          <div>
            {ComprehensiveServices_Content.map((item, idx) => {
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
          </div>
          <p className="mt-5 ">
            En pocas palabras, el modelo de "Tenant Occupied Property" te
            permite obtener ingresos pasivos inmediatos con propiedades que ya
            están rentadas, brindando una mayor seguridad en tu inversión y
            ofreciendo la oportunidad de diversificar tu portafolio en bienes
            raíces de manera sencilla y accesible, aprovechando tanto los
            ingresos por alquiler como la potencial plusvalía del inmueble.
          </p>
        </div>
      </div>
    </div>
  );
}
