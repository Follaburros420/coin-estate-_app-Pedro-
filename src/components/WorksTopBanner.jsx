import React from "react";

export default function WorksTopBanner({ heading, desc, coinEstateTitle }) {
  return (
    <div className="bg-gradient-to-r from-black-200 to-black-300 pt-32 sm:pt-20 py-20 px-6 sm:px-12 text-white ">
      <div className="w-full max-w-[1161px] mx-auto text-center ">
        <p className="text-28 capitalize md:text-40 font-bold md:leading-[48px]  ">
          {heading}
          {"  "}
          <span className="text-28 md:text-40 font-bold md:leading-[48px] text-Yellow-200">
            {coinEstateTitle}
          </span>
        </p>
        <p className="font-medium mt-6 ">{desc}</p>
      </div>
    </div>
  );
}
