import { Wallet_Investments_Data } from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import React from "react";

export default function WalletInvestments() {
  return (
    <div className="p-4 2xl:p-6 w-full border h-full border-grey-400 rounded-[26px] flex flex-col justify-between ">
      <div className="w-full ">
        <div className="flex items-center justify-between  ">
          <p className="text-20 sm:text-22 font-semibold ">Your Investments</p>
          <StyledImage src="/assets/svg/DescDots.svg" className="w-6 h-6 " />
        </div>
        <div className="flex items-center gap-1 w-full justify-end mt-4 ">
          <div className="p-1 rounded-full bg-pink " />
          <p className="text-14 ">Totals in CoinEstate</p>
        </div>
      </div>
      <div>
        <StyledImage
          src="/assets/images/InvestmentsGraph.png"
          className="w-full max-w-[364px] mx-auto h-[191px] mt-auto  "
        />
        <div className="grid sm:grid-cols-2 gap-3 mt-5 ">
          {Wallet_Investments_Data.map((item, idx) => {
            return (
              <div
                key={idx}
                className="w-full bg-black-700 rounded-[8px] px-3 py-2 "
              >
                <div className="flex items-center justify-between ">
                  <p className="text-grey-1000 text-14  ">{item.title}</p>
                  <p className="text-14 ">{item.percentage}</p>
                </div>
                <p className=" text-32 font-medium ">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
