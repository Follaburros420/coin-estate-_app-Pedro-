import React from "react";

export default function AboutMarketPlace() {
  return (
    <div className=" bg-gradient-to-r from-black-200 to-black-300 pt-10 md:pt-0 ">
      <div className="max-w-[1161px] text-center mx-auto w-full px-4 py-16">
        <p className="text-white text-28 sm:text-36 font-inter font-extrabold ">
          Explora nuestro mercado de tokens Inmobiliarios
        </p>
        <p className="text-14 font-medium font-inter text-center text-white mt-4">
          Navega, invierte y comercia sin esfuerzo en un entorno digital seguro
          y transparente para activos inmobiliarios
        </p>
        <button className="text-yellow  max-w-[157px] mx-auto text-12 font-inter font-semibold py-3 px-8 border border-yellow rounded-full mt-6 ">
          Conoce Más
        </button>
      </div>
    </div>
  );
}
