"use client";
import {
  Estimate_Balance_Data,
  Estimate_Balance_Tokens_Data,
} from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import clsxm from "@/utils/clsxm";
import React from "react";
import WalletCurrency from "./WalletCurrency";
import WalletCompartiment from "./WalletCompartiment";
import WalletInvestments from "./WalletInvestments";
import WalletTransactionHistory from "./WalletTransactionHistory";
import { usePathname } from "next/navigation";

export default function WalletPage() {
  const location = usePathname();
  const paths = {
    "/dashboard/admin-wallet": "Wallet",
  };
  return (
    <div className="max-w-[1161px] mx-auto px-6 lg:px-10  ">
      <p className="text-28 text-center -mt-5 font-ubuntu font-bold lg:hidden leading-none text-white w-full ">
        {paths[location]}
      </p>
      <div className="flex flex-col md:flex-row items-start w-full justify-between gap-6 xl:gap-10 mt-6 ">
        <div className="w-full flex md:flex-col md:max-w-[200px] gap-6 items-center justify-center md:items-start md:justify-start mt-6 ">
          <div className="bg-[url(/assets/svg/AdminPic.svg)] bg-cover bg-no-repeat w-[90px] h-[90px] flex items-end justify-end  ">
            <button className="bg-grey-800 p-1 rounded-[8px] w-fit -mr-2 -mb-2 ">
              <StyledImage src="/assets/svg/Edit.svg" className="w-6 h-6 " />
            </button>
          </div>
          <div>
            <div className="lg:mt-6 ">
              <p className="text-18 font-ubuntu font-medium leading-none ">
                Maria Moñitos
              </p>
              <p className="text-16 font-ubuntu font-medium text-grey-700 ">
                User-ertw2
              </p>
            </div>
            <div className="mt-1 lg:mt-4 ">
              <div className="flex items-center gap-2 ">
                <p className="text-18 font-medium font-ubuntu w- ">
                  Blockchain Address
                </p>
                <StyledImage
                  src={"/assets/svg/Exclamation.svg"}
                  className="w-3 h-3 mt-1 "
                />
              </div>
              <div className="flex items-center gap-[6px] ">
                <p className="text-16 font-ubuntu font-medium text-grey-700 ">
                  647364374637463
                </p>
                <StyledImage
                  src="/assets/svg/Blocks.svg"
                  className="w-9 h-3 "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border border-grey-400 p-6 rounded-[26px] flex flex-col xl:flex-row gap-5 items-center justify-between w-full ">
          <div>
            <div className="flex items-center justify-center xl:justify-start gap-4 ">
              <p className="text-20 sm:text-29 font-bold leading-none ">
                Estimate Balance
              </p>
              <StyledImage
                src="/assets/svg/WalletMoney.svg"
                className="w-6 h-6 "
              />
            </div>
            <div className="mt-7 flex flex-col sm:flex-row items-center gap-5 sm:gap-10 ">
              <button className="sm:text-20 py-2 px-6 sm:w-full sm:max-w-[185px] bg-Yellow-100 rounded-[8px] font-medium font-ubuntu text-black-100 ">
                Reinvest
              </button>
              <button className="sm:text-20 py-2 px-6 sm:w-full sm:max-w-[185px] bg-white rounded-[8px] font-medium font-ubuntu text-black-100  ">
                Withdraw
              </button>
            </div>
            <div className="p-5 mt-5 sm:mt-0 ">
              {Estimate_Balance_Data.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={clsxm(
                      "flex flex-col sm:flex-row items-center justify-between sm:gap-11 ",
                      idx === 0 && "mb-10"
                    )}
                  >
                    <div className="flex items-center gap-5 sm:gap-11 ">
                      <StyledImage
                        src="/assets/svg/Exclamation.svg"
                        className="w-6 h-6 "
                      />
                      <p className="text-26  ">{item.status}</p>
                    </div>
                    <div className="-mb-6 flex items-center gap-5 ">
                      <div>
                        <div>
                          <p className="text-29 font-bold ">
                            {item.price}
                            <span className="text-22 font-regular ml-3 ">
                              USD
                            </span>
                          </p>
                        </div>
                        <p className="text-14 text-base-100 opacity-60 ">
                          {item.cop}
                        </p>
                      </div>
                      {idx === 0 && (
                        <div className="p-2 rounded-full bg-darkCyan -mt-4 " />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-1 items-center gap-5 mt-6 xl:mt-0 ">
            {Estimate_Balance_Tokens_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    "bg-black-600 rounded-[6px] min-h-[100px] p-3 xl:px-4 xl:py-5 w-full max-w-[254px] flex items-center gap-4 ",
                    idx === 1 && "xl:my-5"
                  )}
                >
                  <div className="bg-black-700 p-2 rounded-[8px] w-fit ">
                    <StyledImage src={item.imgUrl} className="w-6 h-6 " />
                  </div>
                  <div>
                    <p className="text-16 leading-[18px] xl:leading-normal font-medium ">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      {item.exclamationImg && (
                        <StyledImage
                          src={item.exclamationImg}
                          className="w-3 h-3"
                        />
                      )}
                      <p className="text-base-100 opacity-60 text-14 ">
                        {item.availableTokens}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <WalletCurrency />
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-5 2xl:gap-10 mt-6 lg:mt-12 ">
        <div className="xl:col-span-1 ">
          <WalletInvestments />
        </div>
        <div className="xl:col-span-2 ">
          <WalletCompartiment />
        </div>
      </div>
      <WalletTransactionHistory />
    </div>
  );
}
