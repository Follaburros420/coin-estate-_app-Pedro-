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
                className="mt-2 max-w-[600px] rounded-[12px] border border-gray-200/70 bg-white/95 p-4 text-black-100 shadow-[0_20px_60px_-55px_rgba(15,23,42,0.45)] transition-colors lg:mx-0 lg:max-w-[371px] dark:border-white/10 dark:bg-black-900/60 dark:text-white dark:shadow-[0_25px_80px_-60px_rgba(0,0,0,0.75)]"
              >
                <div className="flex items-center justify-between">
                  <p className="max-w-[269px] text-14 font-bold text-black-100 dark:text-white">
                    {items.question}
                  </p>
                  <StyledImage
                    src={items.icon}
                    alt=""
                    className="h-3 w-3 text-black-100 dark:text-white"
                  />
                </div>
                {isOpen === items.id && (
                  <p className="mt-2 max-w-[269px] text-14 font-medium text-gray dark:text-white/80">
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
