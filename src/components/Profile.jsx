/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Profile() {
  return (
    <div className="max-w-[1161px] mx-auto w-full pt-[59px] px-5 md:px-12">
      <div className="block lg:flex gap-4">
        <div className="max-w-[400px] lg:max-w-[170px] mx-auto w-full flex lg:block gap-6 items-center">
          <img
            src="/assets/images/maria.png"
            alt=""
            className="block lg:hidden"
          />
          <div>
            <div>
              <img
                src="/assets/images/maria.png"
                alt=""
                className="hidden lg:block"
              />
              <p className="pt-8 text-18 font-medium font-ubuntu">
                Maria Moñitos
              </p>
              <p className="text-grey-900 text-16 font-semibold font-ubuntu mt-1">
                User-ertw2
              </p>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <p className=" text-18 font-medium font-ubuntu">
                Blockchain Address
              </p>
              <img src="/assets/svg2/iMark.svg" alt="" className="h-3 w-3 " />
            </div>
            <div className="flex gap-2 items-center mt-1">
              <p className=" text-16 text-grey-700 font-medium font-ubuntu">
                647364374637463
              </p>
              <img
                src="/assets/svg2/box.svg"
                alt=""
                className="h-3 w-[38px] "
              />
            </div>
          </div>
        </div>

        <div className="max-w-[828px] w-full block md:flex justify-between mt-4 lg:mt-0 border border-grey-400 rounded-[26px] p-6">
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-26 font-semibold">Estimate Balance</p>
              <img src="/assets/svg2/balance.svg" alt="" />
            </div>
            <div className="mt-7 block md:flex gap-10 items-center">
              <button className="text-black-800 bg-Yellow-100 text-20 w-full md:w-fit mx-auto  md:mx-0 font-medium font-ubuntu py-2 px-8  rounded-[8px]">
                Reinvest
              </button>
              <button className="text-black-800 mt-4 md:mt-0 w-full md:w-fit mx-auto  md:mx-0 bg-white text-20 font-medium font-ubuntu py-2 px-8  rounded-[8px]">
                Withdraw
              </button>
            </div>
            <div className="mt-10  block md:flex gap-10 items-center ml-10 ">
              <div className="flex gap-10 items-center">
                <img
                  src="/assets/svg2/iMark.svg"
                  alt=""
                  className="w-[18px] h-5"
                />
                <p className="text-26 font-regular">Available</p>
              </div>
              <div>
                <p className="text-28 font-semibold">
                  1000<span className="text-22 font-regular"> USD</span>{" "}
                </p>
                <p className="text-14 text-gray font-regular">
                  =4´200.000.00 COP
                </p>
              </div>
            </div>
            <div className="mt-8  block md:flex gap-10 items-center ml-10 ">
              <div className="flex gap-10 items-center">
                <img
                  src="/assets/svg2/iMark.svg"
                  alt=""
                  className="w-[18px] h-5"
                />
                <p className="text-26 font-regular">Invested</p>
              </div>
              <div>
                <p className="text-28 font-semibold">
                  1000<span className="text-22 font-regular"> USD</span>{" "}
                </p>
                <p className="text-14 text-gray font-regular">
                  =4´200.000.00 COP
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="p-5 rounded-[8px] bg-black-600">
              <div className="flex gap-4 items-center  justify-center md:justify-start">
                <img
                  src="/assets/svg2/dollar.svg"
                  alt=""
                  className="bg-black-700 p-2 rounded-[8px]"
                />
                <div>
                  <p className="text-16 font-medium font-ubuntu">
                    Total in CoinEstate
                  </p>
                  <p className="mt-1 text-14 font-regular text-ray">
                    $3,245.03
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5  mt-6 rounded-[8px] bg-black-600">
              <div className="flex gap-4 items-center justify-center md:justify-start ">
                <img
                  src="/assets/svg2/token.svg"
                  alt=""
                  className="bg-black-700 p-2 rounded-[8px]"
                />
                <div>
                  <p className="text-16 font-medium font-ubuntu">
                    Total of Tokens
                  </p>
                  <p className="mt-1 text-14 font-regular text-ray">3,342.03</p>
                </div>
              </div>
            </div>
            <div className="p-5 mt-6 rounded-[8px] bg-black-600">
              <div className="flex gap-4 items-center  justify-center md:justify-start">
                <img
                  src="/assets/svg2/income.svg"
                  alt=""
                  className="bg-black-700 p-2 rounded-[8px]"
                />
                <div>
                  <p className="text-16 font-medium font-ubuntu">
                    Income from Rent
                  </p>
                  <p className="mt-1 text-14 font-regular text-ray">
                    $3,646.03
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
