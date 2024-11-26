/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { MarketPlace_Total_Investments_Data } from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import clsxm from "@/utils/clsxm";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function HeaderSection() {
  const [isSelected, setIsSelected] = useState(false);
  const location = usePathname();
  const paths = {
    "/admin/market-place": "MarketPlace",
  };
  return (
    <div className="font-ubuntu ">
      <p className="text-28 text-center -mt-5 font-ubuntu font-bold lg:hidden leading-none text-white w-full ">
        {paths[location]}
      </p>
      <div className="mt-5 lg:mt-0 ">
        {/* <p className="text-16 text-center md:text-start ">
          Saturday, october,06, 2024
        </p>
        <div className="flex flex-col items-center md:flex-row text-center md:text-start md:gap-16 gap-8 mt-10 md:mt-20 ">
          <StyledImage
            src="/assets/images/MarketPlaceMain.png"
            className="w-full max-w-[474px] h-[300px] "
          />
          <div>
            <p className="text-26 md:text-40 font-bold ">
              WE Got Every Thing you need!
            </p>
            <p className="text-16 font-bold text-white opacity-60 ">
              Lorem ipsum dolor sit amet consectetur. Scelerisque quis at dui
              pulvinar sit euismod.
            </p>
          </div>
        </div> */}
        <div className="grid grid-rows-2 grid-cols-4 gap-2 rounded-[10px] overflow-hidden ">
          <img
            src="/assets/images/MarketPlaceGridImgOne.png"
            className="w-full h-full row-span-2 col-span-2 "
          />
          <img
            src="/assets/images/MarketPlaceGridImgTwo.png"
            className="w-full h-full "
          />{" "}
          <img
            src="/assets/images/MarketPlaceGridImgThree.png"
            className="w-full h-full "
          />{" "}
          <img
            src="/assets/images/MarketPlaceGridImgFour.png"
            className="w-full h-full "
          />{" "}
          <img
            src="/assets/images/MarketPlaceGridImgOne.png"
            className=" w-full h-full"
          />{" "}
        </div>
      </div>
      <div className="grid xl:grid-cols-3 gap-8 mt-10 md:mt-20 ">
        <div className="col-span-2 w-full ">
          <div className="grid sm:grid-cols-3 w-full gap-5 ">
            <div className="flex items-center justify-center gap-5 col-span-3 border border-base-800 rounded-[8px] w-full p-5 sm:col-span-2 ">
              <div className="flex items-center pr-5 gap-2 border-r border-r-base-800 ">
                <StyledImage
                  src="/assets/svg/GoldenTokens.svg"
                  className="w-14 h-14 "
                />
                <div className="text-center ">
                  <p className="text-20 text-Yellow-100  ">1000</p>
                  <p className="sm:text-20 font-bold text-white sm:mt-2 leading-none ">
                    Tokens Disponibles
                  </p>
                </div>
              </div>
              <div className="text-center ">
                <p className="text-20 text-Yellow-100 ">$1 USD</p>
                <p className="sm:text-20 font-bold leading-none ">
                  Precio del Token
                </p>
              </div>
            </div>
            <div className="border border-base-800 rounded-[8px] p-3 sm:p-5 w-full flex flex-col items-center col-span-3 sm:col-span-1 ">
              <p className="sm:text-20 font-bold ">Managed by</p>
              <StyledImage
                src="/assets/images/NewPython.png"
                className="w-16 h-16 mt-1 "
              />
            </div>
          </div>
          <div className="mt-7 md:mt-14 ">
            <p className="text-20 font-bold mt-8 ">Progreso de Venta:</p>
            <StyledImage
              src="/assets/images/LoadingBar.png"
              className="h-8 w-full mt-6 "
            />
            <div className="flex items-center justify-between mt-4 ">
              <p className="sm:text-20 font-bold ">82.3%</p>
              <div className="sm:text-20 font-bold text-center leading-none ">
                <p className=" ">99.72</p>
                <p>Total Tokens</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full col-span-2 xl:col-span-1 ">
          <div className="border border-base-800 rounded-[8px] p-6 ">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {" "}
              <p className="text-20 font-bold ">Resumen Financiero</p>
              <StyledImage
                src="/assets/svg/Exclamation.svg"
                className="w-4 h-4"
              />
            </div>
            <div className="flex items-center justify-between sm:gap-4 mt-4">
              <p className="text-14 font-bold text-Yellow-100 ">
                Rentabilidad Anual Esperada{" "}
              </p>
              <p className="sm:text-20 font-bold text-Yellow-100 ">+18,93%</p>
            </div>
            <p className="text-light-brand-400 text-center sm:text-start text-14 mt-2 ">
              {" "}
              Incluye valorización del inmueble
            </p>
            <div className="mt-8 w-full ">
              {MarketPlace_Total_Investments_Data.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={clsxm(
                      "flex items-center justify-between gap-5 text-14 mt-3 pb-1 ",
                      idx === 4 ? "" : "border-b border-b-Yellow-100 "
                    )}
                  >
                    <p className="te ">{item.title}</p>
                    <div className="flex items-center gap-2">
                      {" "}
                      <p style={{ color: `${item.color}` }}>
                        {item.ratio}
                      </p>{" "}
                      {idx === 1 && (
                        <StyledImage
                          src="/assets/svg/Exclamation.svg"
                          className="w-4 h-4"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="bg-Yellow-100 p-3 rounded-[8px] text-20 sm:text-28 w-full mt-4 font-medium text-black-100 ">
            Investing
          </button>
        </div>
      </div>
    </div>
  );
}
