import React, { useState } from "react";
import StyledImage from "./StyedImage";
const Faq = [
  {
    id: 1,
    question: "Create your account",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 2,
    question:
      "Create or connect your virtual wallet",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 3,
    question: "Complete your KYC (Know Your Customer) verification",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 4,
    question: "Select the property(ies)/project(s) in which you wish to invest.",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 5,
    question: "Buy your USDT and start investing",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },
  {
    id: 6,
    question:
      "Receive your returns and reinvest or withdraw your profits.",
    icon: "/assets/svg/arrow1.svg",
    answer:
      " Facilitamos el acceso a la inversión en proyectos inmobiliarios de los Estados Unidos a través de la tokenización de propiedades.",
  },


];

export default function AboutInvesting() {
  const [isOpen, setIsOpen] = useState();


  const toggle = (items) => {
    setIsOpen(items.id);
  };
  return (
    <div >

      <div className=" ">
        {Faq.map((items, idx) => {
          return (
            <div key={`${items.id}___${idx}`} className="">
              <div
                onClick={() => {
                  toggle(items);
                }}
                className=" p-4  mt-2 rounded-[4px]  mx-auto lg:mx-0 bg-white max-w-[600px] lg:max-w-[371px]"
              >
                <div className="flex justify-between items-center">
                  <p className="text-black-100 text-14 font-bold max-w-[269px]">
                    {items.question}
                  </p>
                  <StyledImage
                    src={items.icon}
                    alt=""
                    className=" bg-white h-2 w-2  "
                  />
                </div>
                {isOpen === items.id && (
                  <p className="text-grey-100 text-14 mt-2 font-bold max-w-[269px]">
                    {items.answer}
                  </p>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
