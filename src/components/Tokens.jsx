import { Tokens_Cards_Data } from "@/_mock/data";
import React from "react";
import StyledImage from "./StyedImage";

function Tokens() {
  return (
    <div className="bg-lightblue mt-16 lg:-mt-5 px-6  ">
      <div className="max-w-[1161px] mx-auto w-full  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:absolute lg:z-10">
          {Tokens_Cards_Data.map((items, idx) => {
            return (
              <div
                key={`${items.id}___${idx}`}
                className="py-4 px-6 sm:max-w-[371px] mx-auto lg:mx-0 rounded-[8px] bg-white  shadow-2xl"
              >
                <StyledImage className="w-12 h-12 " src={items.img} alt="" />
                <p className="mt-6 text-14 font-inter font-regular text-black-100">
                  {items.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tokens;
