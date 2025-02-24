import clsxm from "@/utils/clsxm";
import React from "react";
import RegisterBottomBanner from "./RegisterBottomBanner";
import { SourceUrl } from "@/hooks/queryContants";
import { useRouter } from "next/navigation";


export default function AboutProperties({ getPropertyList }) {
  const router = useRouter()
  return (
    <div className="mt-16 max-w-[1161px] mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getPropertyList?.map((items, idx) => {
          const mainImage = SourceUrl + items?.image

          return (
            <div
              key={`${items?.id}___${idx}`}
              onClick={() => router.push(`/dashboard/market-place/${items.id}`)}
              className="max-w-[371px] bg-white mx-auto cursor-pointer lg:mx-0  rounded-[8px] border border-black-100"
            >
              <div className="relative">
                <div className="h-[247px] w-full">

                  <img src={mainImage} alt="" className="h-full object-cover w-full" />
                </div>
                <div className="flex justify-between">
                  <button className="absolute top-4 left-4 py-1.5 px-4 bg-skyblue rounded-full text-12 font-inter font-semibold text-black-100 ">
                    30%
                  </button>
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
                  <div className="flex gap-2 bg-peach p-1 px-3 items-center rounded-full">
                    <p className="text-12 font-inter font-semibold text-black-100">
                      Location
                    </p>
                    {/* <img src={items.flag} alt="" /> */}
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
                        Token Price
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-black-100">
                        {/* {items.tokenPrice} */}
                        {items?.totalInvestmentPrice}
                      </p>
                    </div>
                    <img src={'/assets/svg/questionMark.svg'} alt="" />
                  </div>
                  <hr className=" border border-r-1 mt-4 h-[44px] border-grey-100" />
                  <div className="mt-3 flex gap-6 items-center">
                    <div>
                      <p className="text-14 font-inter  font-regular text-grey-100">
                        Total Price
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-end text-black-100">
                        {items.propertyPrice}
                      </p>
                    </div>
                    <img src={'/assets/svg/questionMark.svg'} alt="" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="mt-4 flex gap-6 items-center">
                    <div>
                      <p className="text-14 font-inter  font-regular text-grey-100">
                        Expected Income
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-black-100">
                        {items.expectedIncome}%
                      </p>
                    </div>
                    <img src="/assets/svg/iMark.svg" alt="" />
                  </div>

                  <div className="mt-3 flex gap-6 items-center">
                    <div>
                      <p className="text-14 font-inter  font-regular text-grey-100">
                        Expected ROI
                      </p>
                      <p className="text-14 font-inter  mt-1 font-semibold text-end text-black-100">
                        {items.roiExpected}%                      </p>
                    </div>
                    <img src="/assets/svg/iMark.svg" alt="" />
                  </div>
                </div>
                <p className="mt-4 font-inter text-14 text-end font-semibold text-black-100">
                  Tokens Disponibles:{" "}
                  <span className="text-yellow  font-regular">{items?.availableTokens} </span>{" "}
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
