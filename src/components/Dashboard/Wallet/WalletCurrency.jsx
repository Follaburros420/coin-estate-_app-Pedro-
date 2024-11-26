import StyledImage from "@/components/StyedImage";
import React from "react";

export default function WalletCurrency() {
  return (
    <div className="w-full border border-grey-400 p-6 rounded-[26px] mt-6 lg:mt-12 ">
      <p className="text-20 sm:text-29 font-bold text-center sm:text-start ">Currency</p>
      <div className="grid sm:grid-cols-3 gap-6 place-items-center w-full max-w-[90%] mx-auto my-8 ">
        <div className=" flex flex-col justify-between h-full ">
          <p className="text-20 sm:text-26 leading-none ">
            Investor´s Currency
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-5 sm:gap-14 mt-3 sm:mt-5 ">
            <StyledImage
              src="/assets/svg/AmericaFlag.svg"
              className="w-10 h-8 "
            />
            <p className="text-16 font-medium ">Dollar</p>
          </div>
        </div>
        <div className=" flex flex-col justify-between h-full ">
          <p className="text-20 sm:text-26  ">Amount</p>

          <p className="text-16 font-medium ml-6 mt-3 sm:mt-5 ">3131</p>
        </div>
        <div className="w-fit flex flex-col justify-between h-full ">
          <p className="text-20 sm:text-26  ">percentage</p>
          <div className="flex items-center gap-3 sm:gap-6 mt-3 sm:mt-5 justify-end ">
            <p className="text-16 font-medium ">12%</p>
            <StyledImage
              src="/assets/svg/Exclamation.svg"
              className="w-10 h-8 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
