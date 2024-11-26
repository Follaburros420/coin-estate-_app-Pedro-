import { TOKENS } from "@/_mock/data";
import React from "react";
import StyledImage from "./StyedImage";

function AboutCoinEstate() {
  return (
    <div className="px-6 ">
      <div className=" mt-16 lg:mt-[230px] max-w-[1161px] mx-auto w-full ">
        <p className="text-center text-black-100 text-28 lg:text-36 font-bold font-inter">
          ¿Que hacemos en <span className="text-yellow">CoinEstate</span>?
        </p>
        <p className="text-14 lg:text-20 font-inter font-regular text-black-100 max-w-[919px] mx-auto text-center ">
          Facilitamos el acceso a la inversión en proyectos inmobiliarios de los
          Estados Unidos a través de la tokenización de propiedades.
        </p>
        <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {TOKENS.map((items, idx) => {
            return (
              <div key={`${items.id}____${idx}`}>
                <div className="max-w-[248px] mx-auto lg:mx-0 p-4">
                  <StyledImage className="w-12 h-12 " src={items.img} alt="" />
                  <p className="mt-6 text-14 font-regular font-inter text-gray">
                    {items.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="w-full mt-4 max-w-[146px] mx-auto flex items-center justify-center text-center p-3 rounded-full bg-Yellow-200 text-white font-bold text-14 lg:ml-10 ">
          Aprender Más
        </button>
      </div>
    </div>
  );
}

export default AboutCoinEstate;
