/* eslint-disable react/no-unescaped-entities */
import React from "react";
import StyledImage from "./StyedImage";
import {
  CoinEstate_Table_Data,
  Dashboards_Table_Header_Data,
} from "@/_mock/data";
import clsxm from "@/utils/clsxm";

export default function Comparison() {
  return (
    <div className="px-6 ">
      <div className="mt-16 max-w-[1161px] mx-auto w-full ">
        <div className="flex justify-center">
          {" "}
          <StyledImage
            className="w-[194px] h-[194px] "
            src="/assets/images/compititon.png"
            alt=""
          />
        </div>
        <p className="mt-1.5 font-inter text-28 lg:text-36 font-bold text-black-100 text-center">
          <span className="text-Yellow-100 ">CoinEstate</span> VS La Competencia
        </p>
        <div className="w-full overflow-x-auto hide-scrollbar ">
          <table
            style={{
              webkitBoxShadow: "24px 23px 73px -33px rgba(0,0,0,0.67)",
              mozBoxShadow: "24px 23px 73px -33px rgba(0,0,0,0.67)",
              boxShadow: "24px 23px 73px -33px rgba(0,0,0,0.67)",
            }}
            className="mt-8 min-w-full table-fixed  "
          >
            <thead className="w-full ">
              <tr className=" ">
                {Dashboards_Table_Header_Data.map((item, idx) => {
                  return (
                    <th
                      key={idx}
                      className={clsxm(
                        "p-4 h-full bg-black-100 ",
                        idx === 1
                          ? "bg-yellow border-t-2 border-t-yellow border-b-[3px] border-b-black-100 "
                          : "bg-black-100 border-b-[3px] border-b-yellow "
                      )}
                    >
                      <div className="flex flex-col items-center justify-between h-[100px] ">
                        <div className="bg-white rounded-full p-3 w-fit ">
                          <StyledImage src={item.imgUrl} className="w-6 h-6 " />
                        </div>
                        <p className="leading-none text-14 text-white ">
                          {item.title}
                        </p>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {CoinEstate_Table_Data.map((item, idx) => (
                <tr key={item.id} className=" text-center  ">
                  <td className="text-start border border-grey-300 leading-none px-2 w-[250px]  ">
                    {item.titleOne}
                  </td>
                  <td className=" h-14 py-3 px-2 bg-yellow ">
                    <p
                      style={{
                        color: `${item.titleColorOne}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleTwo}
                    </p>
                    {item.imgUrlOne && (
                      <StyledImage
                        src={item.imgUrlOne}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                  <td className="border border-grey-300 h-14">
                    <p
                      style={{
                        color: `${item.titleColorOne}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleThree}
                    </p>
                    {item.imgUrlTwo && (
                      <StyledImage
                        src={item.imgUrlTwo}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                  <td className="border border-grey-300 h-14">
                    <p
                      style={{
                        color: `${item.titleColorOne}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleFour}
                    </p>
                    {item.imgUrlThree && (
                      <StyledImage
                        src={item.imgUrlThree}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                  <td className="border border-grey-300 h-14">
                    <p
                      style={{
                        color: `${item.titleColorOne}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleFive}
                    </p>
                    {item.imgUrlFour && (
                      <StyledImage
                        src={item.imgUrlFour}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                  <td className="border border-grey-300 h-14">
                    <p
                      style={{
                        color: `${item.titleColorOne}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleSix}
                    </p>
                    {item.imgUrlFive && (
                      <StyledImage
                        src={item.imgUrlFive}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                  <td className="border border-grey-300 h-14">
                    <p
                      style={{
                        color: `${item.titleColorTwo}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleSeven}
                    </p>
                    {item.imgUrlSix && (
                      <StyledImage
                        src={item.imgUrlSix}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                  <td className="border border-grey-300 h-14">
                    <p
                      style={{
                        color: `${item.titleColorTwo}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleEight}
                    </p>
                    {item.imgUrlSeven && (
                      <StyledImage
                        src={item.imgUrlSeven}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                  <td className="border border-grey-300 h-14">
                    <p
                      style={{
                        color:
                          idx === 0
                            ? `${item.titleColorOne}`
                            : `${item.titleColorThree}`,
                        fontWeight: 600,
                      }}
                    >
                      {item.titleNine}
                    </p>
                    {item.imgUrlEight && (
                      <StyledImage
                        src={item.imgUrlEight}
                        className="w-4 mx-auto h-4"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
