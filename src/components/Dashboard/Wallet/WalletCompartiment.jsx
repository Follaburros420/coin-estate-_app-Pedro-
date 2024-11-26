"use client";
import { Time_Selection_Data } from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import clsxm from "@/utils/clsxm";
import React, { useState } from "react";

export default function WalletCompartiment() {
  const [isSelected, setIsSelected] = useState(0);
  return (
    <div className="p-4 sm:p-6 border border-grey-400 rounded-[15px] ">
      <div className="flex flex-col sm:flex-row text-center sm:text-start items-center justify-between gap-5 ">
        <p className="text-20 font-semibold ">Comportamiento USD Vs COP</p>
        <div className="flex items-center justify-center sm:justify-end w-full gap-2 sm:gap-4 ">
          <button className="p-2 border border-grey-700 w-fit rounded-[5px] ">
            <StyledImage src="/assets/svg/Plug.svg" className="w-4 h-4 " />
          </button>
          <button className="p-2 border border-grey-700 w-fit rounded-[5px] flex items-center gap-2 ">
            <StyledImage src="/assets/svg/USDIcon.svg" className="w-5 h-5 " />
            <p className="text-grey-1300 text-12 ">USD</p>
            <StyledImage src="/assets/svg/DownArrow.svg" className="w-4 h-4 " />
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 ">
        <div>
          <div className="flex items-center gap-3 ">
            <p className="text-14 text-grey-1300 opacity-60 ">Dollar / COP</p>
            <StyledImage src="/assets/svg/DownArrow.svg" className="w-4 h-4 " />
          </div>
          <p className="text-18 font-semibold mt-1 ">Currencies</p>
        </div>
        <div className="grid mt-4 w-full sm:w-fit grid-cols-5 place-items-center gap-2 ">
          {Time_Selection_Data.map((item, idx) => {
            return (
              <button
                key={idx}
                onClick={() => setIsSelected(idx)}
                className={clsxm(
                  "border border-black-700 rounded-[15px] px-2 py-1 w-12 sm:w-16 text-14",
                  isSelected === idx
                    ? "bg-Yellow-100 text-white "
                    : "text-grey-1200"
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
      <StyledImage
        src="/assets/svg/CompartimentGraph.svg"
        className="w-full max-w-[550px] max-h-[260px] mx-auto mt-6 "
      />
    </div>
  );
}
