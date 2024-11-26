/* eslint-disable @next/next/no-img-element */
import React from "react";
import StyledImage from "./StyedImage";

export default function Selection() {
  return (
    <div className="bg-black-100  text-white mt-16 md:mt-[140px] py-8 sm:py-16 px-6">
      <div className="w-full max-w-[1161px] mx-auto ">
        <h1 className="text-center font-inter text-28 lg:text-36 font-bold">
          ¿Cómo Invertir?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto lg:mx-0 mt-8 md:mt-16 ">
          <div className="max-w-[300px] mx-auto lg:mx-0  mt-4 md:mt-0">
            <div className="flex gap-[53px]  ">
              <StyledImage
                src="/assets/svg/selection1.svg"
                alt=""
                className="h-[48px] w-[48px] mx-auto md:mx-0 "
              />
              <div className="hidden lg:flex">
                {" "}
                <img src="/assets/svg/arrowUp.svg" alt="" />
              </div>
            </div>
            <p className="font-extrabold font-inter text-center md:text-start text-18">
              Registrate
            </p>
            <p className="max-w-[248px] mt-2 leading-6 text-14 text-center md:text-start font-inter  font-regular">
              ¡Crear tu cuenta en{" "}
              <span className="text-yellow">CoinEstate</span> te tomará menos de
              cinco minutos!
            </p>
            <button className="text-black-100 mt-6 flex font-inter font-semibold text-12 bg-yellow py-3  rounded-full mx-auto md:mx-0 max-w-[155px] px-8">
              Crear Cuenta
            </button>
          </div>
          <div className="max-w-[300px] mx-auto lg:mx-0  mt-4 md:mt-0">
            <div className="flex gap-[53px]">
              <StyledImage
                src="/assets/svg/selection2.svg"
                alt=""
                className="h-[48px] w-[48px] mx-auto md:mx-0 "
              />
              <div className="hidden lg:flex">
                {" "}
                <img src="/assets/svg/arrowDown.svg" alt="" />
              </div>
            </div>
            <p className="font-extrabold font-inter text-center md:text-start text-18">
              Selecciona
            </p>
            <p className="max-w-[248px] mt-2 leading-6 text-14 text-center md:text-start font-inter  font-regular">
              Ingresa a nuestro Marketplace y escoge los proyectos que mas te
              llamen la atención. ¡Recuerda que puedes diversificar tu
              portafolio desde 1 USD!
            </p>
          </div>
          <div className="max-w-[300px] mx-auto lg:mx-0  mt-4 lg:mt-0">
            <div className="flex gap-[53px]">
              <StyledImage
                src="/assets/svg/selection3.svg"
                alt=""
                className="h-[48px] w-[48px] mx-auto md:mx-0 "
              />
              <div className="hidden lg:flex">
                {" "}
                <img src="/assets/svg/arrowUp.svg" alt="" />
              </div>
            </div>
            <p className="font-extrabold font-inter text-center md:text-start text-18">
              Invierte
            </p>
            <p className="max-w-[248px] mt-2 leading-6 text-14 font-inter text-center md:text-start  font-regular">
              Ingresa a nuestro Marketplace y escoge los proyectos que mas te
              llamen la atención. ¡Recuerda que puedes diversificar tu
              portafolio desde 1 USD!
            </p>
          </div>
          <div className="max-w-[300px] mx-auto lg:mx-0 mt-4 lg:mt-0">
            <StyledImage
              src="/assets/svg/selection3.svg"
              alt=""
              className="h-[48px] w-[48px] mx-auto md:mx-0 "
            />
            <p className="font-extrabold font-inter text-center md:text-start text-18">
              Gana
            </p>
            <p className="max-w-[248px] mt-2 leading-6 text-center md:text-start text-14 font-inter  font-regular">
              Benefíciate de la valorización de tus inversiones, además de los
              rendimientos que generan los proyectos que se encuentran rentando.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
