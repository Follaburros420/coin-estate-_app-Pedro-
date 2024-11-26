import {
  Financial_Commercial_QueryThree_Data,
  Financial_Expense_QueryFour_Data,
  Financial_Legal_QueryTwo_Data,
  Financial_Tab_QueryOne_Data,
} from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import clsxm from "@/utils/clsxm";
import React from "react";

export default function FinancialTab() {
  return (
    <div className="w-full max-w-[1000px] mt-10 overflow-hidden rounded-[8px] grid xl:grid-cols-3 gap-3 xl:gap-5 ">
      <div className="col-span-2 ">
        <div className="w-full p-6 bg-black-1000 rounded-[20px] ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-20 font-bold text-Yellow-100  ">
            <div className="flex items-center gap-2 ">
              <p>Inversión Total :</p>
              <StyledImage
                src="/assets/svg/Exclamation.svg"
                className="w-4 h-4 "
              />
            </div>
            <p>65,000 USD</p>
          </div>
          <div className="mt-7">
            {Financial_Tab_QueryOne_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    " py-3  flex items-center justify-between ",
                    idx === 4 ? "" : "border-b border-b-lightGray-600"
                  )}
                >
                  <p
                    style={{ color: `${item.textColor}` }}
                    className="font-ubuntu "
                  >
                    {item.title}
                  </p>
                  <p className="text-brown-100 ">{item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-black-1000 w-full p-6 rounded-[20px] mt-3 ">
          <div className="flex items-center gap-2 ">
            <StyledImage
              src="/assets/svg/CommercialIcon.svg"
              className="w-8 h-8 "
            />
            <p className="font-bold font-inter text-center text-Yellow-100 text-18 sm:text-20 ">
              Commercial
            </p>
          </div>
          <div className="mt-10">
            {Financial_Legal_QueryTwo_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    " py-3  flex items-center justify-between ",
                    idx === 4 ? "" : "border-b border-b-lightGray-600"
                  )}
                >
                  <p
                    style={{ color: `${item.textColor}` }}
                    className="font-ubuntu "
                  >
                    {item.title}
                  </p>
                  <p className="text-brown-100 ">{item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="xl:col-span-1 col-span-2 ">
        <div className="bg-black-1000 w-full p-6 rounded-[20px] ">
          <div className="flex items-center gap-2 ">
            <StyledImage
              src="/assets/images/FinancialExpense.png"
              className="w-8 h-8 "
            />
            <p className="font-bold font-inter text-center text-Yellow-100 text-18 sm:text-20 ">
              Información de Renta
            </p>
          </div>
          <div className="mt-7">
            {Financial_Commercial_QueryThree_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    " py-3  flex items-center justify-between ",
                    idx === 7 ? "" : "border-b border-b-lightGray-600"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <p
                      style={{ color: `${item.textColor}` }}
                      className="font-ubuntu "
                    >
                      {item.title}
                    </p>
                    {item.imgUrl && (
                      <StyledImage src={item.imgUrl} className="w-4 h-4" />
                    )}
                  </div>
                  <p className="text-brown-100 ">{item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-black-1000 w-full p-6 rounded-[20px] mt-3 ">
          <div className="flex items-center gap-2 ">
            <StyledImage src="/assets/svg/LegalIcon.svg" className="w-8 h-8 " />
            <p className="font-bold font-inter text-center text-Yellow-100 text-18 sm:text-20 ">
              Legal
            </p>
          </div>
          <div className="mt-9">
            {Financial_Expense_QueryFour_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    " py-3  flex items-center justify-between ",
                    idx === 7 ? "" : "border-b border-b-lightGray-600"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <p
                      style={{ color: `${item.textColor}` }}
                      className="font-ubuntu "
                    >
                      {item.title}
                    </p>
                    {item.imgUrl && (
                      <StyledImage src={item.imgUrl} className="w-4 h-4" />
                    )}
                  </div>
                  <p className="text-brown-100 ">{item.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
