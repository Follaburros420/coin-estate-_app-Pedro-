/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Currency() {
  return (
    <div className="px-6 md:px-12 ">
      <div className="max-w-[1161px] mx-auto w-full pt-[52px] ">
        <div className="max-w-[1008px] mx-auto w-full border  border-grey-400 rounded-[26px] p-6">
          <h1 className="font-bold text-26">Currency</h1>
          <div className="block md:flex justify-center md:justify-between mt-9 px-10 ">
            <div className="">
              <h1 className="text-20   text-center md:text-start  font-regular">
                Investor´s Currency
              </h1>
              <div className="mt-2 md:mt-5 flex gap-10 md:gap-[72px] justify-center md:justify-start items-center">
                <img src="/assets/svg2/flag1.svg" alt="" />
                <p className="text-16 text-grey-600  font-medium">Dollar</p>
              </div>
            </div>
            <div>
              <h1 className="text-20  mt-5 md:mt-0 text-center md:text-start font-regular">
                Amount
              </h1>
              <p className="text-16 mt-2 md:mt-5 text-center  text-grey-600 lg:max-w-[70px] w-full  font-medium">
                3131
              </p>
            </div>
            <div className="">
              <h1 className="text-20 mt-5 md:mt-0 text-center md:text-start font-regular">
                percentage
              </h1>
              <div className="mt-2 md:mt-5 flex gap-10 items-center justify-center md:justify-start">
                <p className="text-16 text-grey-600 text-center md:text-start  font-medium">
                  12%
                </p>
                <img src="/assets/svg2/iMark.svg" alt="" className="w-5 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
