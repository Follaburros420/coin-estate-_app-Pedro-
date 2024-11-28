import clsxm from "@/utils/clsxm";
import React from "react";
import RegisterBottomBanner from "./RegisterBottomBanner";
import { SourceUrl } from "@/hooks/queryContants";
const CARDS = [
  {
    id: 1,
    img: "/assets/images/property1.png",
    title: "1437 Lincoln Ave, Miami",
    about: "Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: "$100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "100%",
    percentage2: "25%",
  },
  {
    id: 2,
    img: "/assets/images/property2.png",
    title: "Carrera 1#58-63,cartagena",
    about: " Colombia",
    flag: "/assets/svg/flag2.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "0%",
    percentage2: "25%",
  },
  {
    id: 3,
    img: "/assets/images/property3.png",
    title: "Ocean Drive, Miami",
    about: " Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "$1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "70%",
    percentage2: "25%",
  },
  {
    id: 4,
    img: "/assets/images/property4.png",
    title: "Ocean Drive, Miami",
    about: " Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "70%",
    percentage2: "25%",
  },
  {
    id: 5,
    img: "/assets/images/property5.png",
    title: "Ocean Drive, Miami",
    about: " Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "70%",
    percentage2: "25%",
  },
  {
    id: 6,
    img: "/assets/images/property6.png",
    title: "Ocean Drive, Miami",
    about: " Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "70%",
    percentage2: "25%",
  },
  {
    id: 7,
    img: "/assets/images/property7.png",
    title: "Ocean Drive, Miami",
    about: " Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "70%",
    percentage2: "25%",
  },
  {
    id: 8,
    img: "/assets/images/property8.png",
    title: "Ocean Drive, Miami",
    about: " Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "70%",
    percentage2: "25%",
  },
  {
    id: 9,
    img: "/assets/images/property9.png",
    title: "Ocean Drive, Miami",
    about: " Estados Unidos",
    flag: "/assets/svg/flag1.svg",
    btn1: " 30% off",
    btn2: " Financiación",
    token: " Precio Token",
    tokenPrice: " $100 c/u",
    total: " Precio Total",
    totalPrice: "  $1000",
    icon1: "/assets/svg/questionMark.svg",
    icon2: "/assets/svg/iMark.svg",
    income: "Ingreso Esperado",
    percentage1: "35%",
    roi: "ROI Esperado",
    progress: "70%",
    percentage2: "25%",
  },
];

export default function AboutProperties({getPropertyList}) {
  return (
    <div className="mt-16 max-w-[1161px] mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getPropertyList?.map((items, idx) => {
          const mainImage = SourceUrl + items?.image

          return (
            <div
              key={`${items?.id}___${idx}`}
              className="max-w-[371px] bg-white mx-auto lg:mx-0  rounded-[8px] border border-black-100"
            >
              <div className="relative">
                <div className="h-[247px] w-full">

                <img src={mainImage} alt="" className="h-full object-cover w-full" />
                </div>
                <div className="flex justify-between">
                  {/* <button className="absolute top-4 left-4 py-1.5 px-4 bg-skyblue rounded-full text-12 font-inter font-semibold text-black-100 ">
                    {items.btn}
                  </button> */}
                  <button className="absolute top-4 right-4 py-1.5 px-4 bg-black-100 rounded-full text-12 font-inter font-semibold text-white ">
                    {items.propertyType}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-16 font-inter font-semibold text-black-100">
                    {items.name}
                  </h5>
                  <div className="flex gap-2 bg-peach p-1 items-center rounded-full">
                    <p className="text-12 font-inter font-semibold text-black-100">
                      {items.about}
                    </p>
                    <img src={items.flag} alt="" />
                  </div>
                </div>
                <div className="bg-grey-200  h-2 mt-4 rounded-full">
                  <div
                    className={clsxm("bg-yellow  h-2  rounded-full")}
                    style={{
                      width: items.progress,
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="mt-3 flex gap-6 items-center">
                    <div>
                      <p className="text-14 font-inter  font-regular text-grey-100">
                        {items.token}
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-black-100">
                        {items.tokenPrice}
                      </p>
                    </div>
                    <img src={items.icon1} alt="" />
                  </div>
                  <hr className=" border border-r-1 mt-4 h-[44px] border-grey-100" />
                  <div className="mt-3 flex gap-6 items-center">
                    <div>
                      <p className="text-14 font-inter  font-regular text-grey-100">
                        {items.total}
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-end text-black-100">
                        {items.totalPrice}
                      </p>
                    </div>
                    <img src={items.icon1} alt="" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="mt-4 flex gap-6 items-center">
                    <div>
                      <p className="text-14 font-inter  font-regular text-grey-100">
                        {items.income}
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-black-100">
                        {items.percentage1}
                      </p>
                    </div>
                    <img src="/assets/svg/iMark.svg" alt="" />
                  </div>

                  <div className="mt-3 flex gap-6 items-center">
                    <div>
                      <p className="text-14 font-inter  font-regular text-grey-100">
                        {items.roi}
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-end text-black-100">
                        {items.percentage2}
                      </p>
                    </div>
                    <img src="/assets/svg/iMark.svg" alt="" />
                  </div>
                </div>
                <p className="mt-4 font-inter text-14 text-end font-semibold text-black-100">
                  Tokens Disponibles:{" "}
                  <span className="text-yellow  font-regular">100 </span>{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
     {/* <RegisterBottomBanner /> */}
    </div>
  );
}
