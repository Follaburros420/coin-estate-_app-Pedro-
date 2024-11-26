import React, { useState } from "react";
import StyledImage from "./StyedImage";

const Faq = [
  {
    id: 1,
    question: "Where do my profits come from and when do I start earning?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 2,
    question:
      "What powers or rights do I have over the property as an investor?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 3,
    question: "Is this legal?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 4,
    question: "Can I sell my share and how do I do it?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 5,
    question: "Is there a minimum length of stay?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 6,
    question:
      "Who is responsible for the administration and operating costs of the property?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 7,
    question:
      "What documents support my participation and what rights do I have over the property?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 8,
    question:
      "What happens if the property becomes vacant or there is a default?",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
];

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(1);

  const toggle = (items) => {
    setIsOpen(items.id);
  };
  return (
    <div className="px-6 ">
      <div className="max-w-[1161px] mx-auto w-full mt-16  ">
        <h1 className="text-black-100 text-center font-inter text-28 sm:text-36 font-semibold">
          Preguntas Frecuentes
        </h1>
        <div className="mt-8 sm:mt-16 grid grid-cols-1 lg:grid-cols-2">
          {Faq.map((items, idx) => {
            return (
              <div key={`${items.id}___${idx}`} className="">
                <div
                  onClick={() => {
                    toggle(items);
                  }}
                  className=" py-7 px-4  mt-2 rounded-[16px]  mx-auto lg:mx-0 bg-white max-w-[568px]"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-black-100 text-14 font-bold max-w-[456px]">
                      {items.question}
                    </p>
                    <div className="px-4 py-5 rounded-full bg-white shadow-lg ">
                      <StyledImage
                        src={items.icon}
                        alt=""
                        className=" w-4 h-2  "
                      />
                    </div>
                  </div>
                  {isOpen === items.id && (
                    <p className="text-grey-100 text-14 font-bold max-w-[406px]">
                      {items.answer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
