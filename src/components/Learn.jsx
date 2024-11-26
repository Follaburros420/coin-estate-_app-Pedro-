import clsxm from "@/utils/clsxm";
import React from "react";
import StyledImage from "./StyedImage";
import RegisterBottomBanner from "./RegisterBottomBanner";
const LEARN = [
  {
    id: 1,
    img: "/assets/images/learn1.png",
    btn: "Sector Inmobiliario",
    heading: "  Predicciones inmobiliarias en usa (2025)",
    about:
      "Las tasas hipotecarias son un factor clave en el mercado inmobiliario. Los cambios en estas tasas pueden afectar tanto a los compradores de viviendas como a los inversores, influyendo en...",
    manImg: "/assets/images/man4.png",
    name: "Omar Lemke",
    clockImg: "/assets/svg/clock.svg",
    time: "5 Aug 20234",
    btn1: "Aprende Mas",
  },
  {
    id: 2,
    img: "/assets/images/learn2.png",
    btn: "Sector Inmobiliario",
    heading: " ¿invertir el sector inmobiliario estadounidense?",
    about:
      "Invertir en el mercado inmobiliario de Estados Unidos ofrece una oportunidad única de generar ingresos en una moneda fuerte como el dólar, mientras se beneficia de...",
    manImg: "/assets/images/man4.png",
    name: "Omar Lemke",
    clockImg: "/assets/svg/clock.svg",
    time: "5 Aug 20234",
    btn1: "Aprende Mas",
  },
  {
    id: 3,
    img: "/assets/images/learn3.png",
    btn: "Blockchain",
    heading:
      "  ¿Cómo la tokenización puede revolucionar el sector inmobiliario?",
    about:
      "La tokenización de activos por medio de contratos inteligentes marcará un antes y un después, revolucionando el sector inmobiliario por varias razones clave...",
    manImg: "/assets/images/man4.png",
    name: "Omar Lemke",
    clockImg: "/assets/svg/clock.svg",
    time: "5 Aug 20234",
    btn1: "Aprende Mas",
  },
];

export default function Learn() {
  return (
    <div className="px-6 ">
      <div className="max-w-[1161px] mx-auto w-full mt-16 ">
        <h1 className="text-center text-black-100 font-bold text-28 sm:text-36 font-inter ">
          Aprender
        </h1>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARN.map((items, idx) => {
            return (
              <div
                key={`${items.id}___${idx}`}
                className="max-w-[371px] mx-auto lg:mx-0 bg-white h-full hover:bg-gray-200 rounded-lg"
              >
                <div className=" relative ">
                  <StyledImage
                    src={items.img}
                    alt=""
                    className="w-full h-[249px]"
                  />
                  <button className="absolute top-4 left-4  py-1.5  px-6 rounded-full bg-black-100 text-white ">
                    {items.btn}
                  </button>
                </div>
                <div className="p-4 flex flex-col items-start justify-between h-[263px] gap-2 ">
                  <div className="">
                    <h5 className="text-16 text-black-100 font-semibold font-inter">
                      {items.heading}
                    </h5>
                    <p className="mt-2 text-14 font-inter font-regular text-black-100">
                      {items.about}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex gap-1 items-center ">
                      <StyledImage
                        src={items.manImg}
                        className="w-8 h-8 "
                        alt=""
                      />
                      <h6 className="text-black-100 font-inter font-semibold text-14">
                        {items.name}
                      </h6>
                    </div>
                    <div className="flex gap-2 items-center ">
                      <StyledImage
                        className="w-4 h-4 "
                        src={items.clockImg}
                        alt=""
                      />
                      <h6 className="text-gray font-inter font-semibold text-12">
                        {items.time}
                      </h6>
                    </div>
                  </div>
                  <button className="text-yellow font-inter font-semibold text-12 border border-yellow rounded-full py-3 px-8 ">
                    {items.btn1}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RegisterBottomBanner />
    </div>
  );
}
