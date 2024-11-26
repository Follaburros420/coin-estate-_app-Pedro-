"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import StyledImage from "./StyedImage";
import {
  MarketPlace_Dropdown_Data,
  MarketPlace_List_Content,
} from "@/_mock/data";
import clsxm from "@/utils/clsxm";

export default function Properties() {
  const [isSelected, setIsSelected] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [title, setTitle] = useState("Más recientes");
  return (
    <div className="max-w-[1161px] mx-auto w-full ">
      <h1 className="font-inter font-bold text-center lg:text-start text-36 text-black-100 mt-[52px]">
        Marketplace
      </h1>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 sm:gap-10 ">
          <div className="flex items-center justify-between sm:justify-center md:justify-start gap-2 ">
            {MarketPlace_List_Content.map((item, idx) => {
              return (
                <button
                  onClick={() => setIsSelected(idx)}
                  key={idx}
                  className={clsxm(
                    "text-12 font-semibold w-fit text-center font-inter border border-black-100 p-2 sm:px-5 rounded-full",
                    isSelected === idx
                      ? "bg-yellow text-white text-[12px] "
                      : ""
                  )}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
          <div className="max-w-[375px] w-full rounded-full border border-grey-200 py-2 px-3 mt-4 lg:mt-0 hidden lg:flex items-center gap-2.5">
            <StyledImage
              src="/assets/svg/search.svg"
              className="w-4 h-4 "
              alt=""
            />
            <input
              type="text"
              placeholder="Busca Propiedades "
              className="text-grey-100 bg-lightblue w-full outline-none text-16 font-inter font-regular"
            />
          </div>

          <div className="flex gap-2 items-center justify-between w-full sm:max-w-[250px] ">
            <p className="text-12 font-semibold font-inter text-grey-100 ">
              Ordenado por:
            </p>
            <button
              onClick={() => setIsShown(!isShown)}
              className="px-6 py-2.5 items-center focus:outline-none bg-peach rounded-full border border-yellow flex gap-2.5"
            >
              <p className="text-black-100 text-12 font-inter font-semibold">
                {title}
              </p>
              <StyledImage
                src="/assets/svg/blackArrowDown.svg"
                alt=""
                className={clsxm(
                  "w-4 h-2",
                  isShown === true &&
                    "rotate-180 transition-all ease-in-out after:transition-all "
                )}
              />
              {isShown && (
                <div className="absolute bg-white mt-[190px] w-full max-w-[150px] z-50 shadow-2xl p-2 rounded-[10px] -ml-6 ">
                  {MarketPlace_Dropdown_Data.map((item, idx) => {
                    return (
                      <div key={idx}>
                        <input
                          className="text-14 font-medium py-2 my-1 hover:bg-gray-hover w-full rounded-full placeholder:text-black-100 placeholder:text-center cursor-pointer "
                          placeholder={item.title}
                          onClick={() => setTitle(item.title)}
                        />
                        {/* {item.title} */}
                      </div>
                    );
                  })}
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="w-full rounded-full border border-grey-200 py-2 px-3 mt-6 md:mt-8 lg:mt-0 flex items-center gap-2.5 lg:hidden ">
          <StyledImage
            src="/assets/svg/search.svg"
            className="w-4 h-4 "
            alt=""
          />
          <input
            type="text"
            placeholder="Busca Propiedades "
            className="text-grey-100 bg-lightblue w-full outline-none text-16 font-inter font-regular"
          />
        </div>
      </div>
    </div>
  );
}
