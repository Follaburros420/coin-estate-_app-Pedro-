"use client";
import { Projection_Tab_Overview_Data } from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import clsxm from "@/utils/clsxm";
import React, { useState } from "react";
import Simulator from "./Simulator";
import Projections from "./Projections";

export default function ProjectionTab() {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div>
      <div className="grid xl:grid-cols-3 md:gap-8 ">
        <div className="mt-10  col-span-3 xl:col-span-2 w-full ">
          <div className="flex flex-col text-center xl:text-start md:flex-row items-center justify-center xl:justify-start w-full gap-5 md:gap-10 ">
            <StyledImage
              src="/assets/images/DetailsTabMainImg.png"
              className="w-[280px] h-[318px] "
            />
            <div>
              <div>
                <p className="text-20 sm:text-24 font-semibold font-quickSand leading-none ">
                  $ 32,000/ Year
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-3 ">
                  <StyledImage
                    src="/assets/svg/LocationIcon.svg"
                    className="w-4 h-4 "
                  />
                  <p className="text-12 text-grey-600 ">
                    Doane Street, Fremont CA 94538
                  </p>
                </div>
              </div>
              <div className="border border-Yellow-100 w-10 h-[2px] my-5 mx-auto md:mx-0 " />
              <div className="font-quickSand ">
                <p className="leading-none ">Overview</p>
                <div className="grid grid-cols-2 mt-5 gap-x-10 ">
                  {Projection_Tab_Overview_Data.map((item, idx) => {
                    return (
                      <button
                        className={clsxm(
                          "flex items-center gap-5 text-start ",
                          idx === 2 && "my-5",
                          isSelected === item.id && "text-Yellow-100"
                        )}
                        onClick={() => setIsSelected(item.id)}
                        key={idx}
                      >
                        <StyledImage
                          src={
                            isSelected === item.id
                              ? item.imgUrlActive
                              : item.imgUrlUnActive
                          }
                          className="w-10 h-10 "
                        />
                        <div>
                          <p>{item.title}</p>
                          <p
                            className={clsxm(
                              "text-14 text-grey-600 ",
                              isSelected === item.id &&
                                "text-Yellow-100 text-14 "
                            )}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full md:mt-10 ">
            <div className="flex items-center justify-between ">
              <div className="flex items-center ">
                <StyledImage
                  src="/assets/svg/LocationWhite.svg"
                  className="w-5 h-5 "
                />
                <p className="text-20 font-medium font-ubuntu ">Location</p>
              </div>
              <button className="text-Yellow-300 font-ubuntu ">
                Read More
              </button>
            </div>
            <p className="font-bold font-ubuntu border border-base-800 rounded-[8px] px-8 py-4 mt-4 ">
              Lorem ipsum dolor sit amet consectetur. Pellentesque imperdiet
              ipsum sit convallis viverra risus tristique. Dolor quam venenatis
              sollicitudin pulvinar vt elementum diam urna aliquam arcu. Semper
              ut lacinia massa volutpat ac mi interdum donec. Et sit diam turpis
              id.
            </p>
          </div>
        </div>
        <div className="col-span-3 w-full xl:col-span-1 ">
          <Simulator />
        </div>
      </div>
      <div className="w-full mt-6 md:mt-1 ">
        <p className="text-20 font-medium font-ubuntu text-center md:text-start ">
          why is it attractive?
        </p>
        <div className="w-full border border-base-800 rounded-[8px] mt-4 p-4 ">
          <p className="font-bold font-ubuntu w-full max-w-[880px] mx-auto opacity-60 ">
            olutpat quisque turpis. Sit gravida vitae sem mi vitae donec eros
            facilisi consectetur. Tellus ipsum sit ornare sed consequat. Velit
            in suspendisse eu mauris sit nulla neque dictum sagittis. Habitant
            massa elit ultricies consequat est. Et dictum tempor pulvinar risus.
            Quam ornare fermentum nec ut sit fermentum euismod amet iaculis. Vel
            nisl ut lacinia dolor augue. Duis e
          </p>
        </div>
      </div>
      <Projections />
    </div>
  );
}
