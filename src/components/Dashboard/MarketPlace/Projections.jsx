import StyledImage from "@/components/StyedImage";
import React from "react";

export default function Projections() {
  return (
    <div className="font-ubuntu mt-6 md:mt-10 ">
      <p className="text-20 font-medium text-center md:text-start ">
        Projections
      </p>
      <div className="grid md:grid-cols-3 gap-8 mt-6">
        <div className="col-span-2 md:col-span-1 w-full border border-base-800 rounded-[8px] py-4 px-6 ">
          <div className="flex items-center justify-between ">
            <p className="text-20 font-bold ">Rents</p>
            <StyledImage src="/assets/svg/DescDots.svg" className="w-4 h-4 " />
          </div>
          <StyledImage
            src="/assets/images/ProjectionTab.png "
            className="w-full h-[200px] "
          />
          <div className="flex items-center justify-between mt-4 ">
            <div className="flex items-center gap-2 ">
              <div className="bg-Yellow-100 rounded-full w-2 h-2 " />
              <p className="font-medium ">Rentes</p>
            </div>
            <div className="flex items-center gap-1 font-ubuntu text-white opacity-60 ">
              <p>98</p>
              <p>733</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 border border-base-800 rounded-[8px] py-4 px-6 ">
          <div className="flex items-center justify-between col-span-1 ">
            <p className="text-20 font-bold ">Compound vs simple interest</p>
            <StyledImage src="/assets/svg/DescDots.svg" className="w-4 h-4 " />
          </div>
          <StyledImage
            src="/assets/images/ProjectionTabGraphTwo.png "
            className="w-full h-[200px] "
          />
          <div className="flex items-center gap-4 mt-4 ">
            <div className="flex items-center gap-2 ">
              <div className="bg-Yellow-100 rounded-full w-2 h-2 " />
              <p className="font-medium ">Compound interest</p>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="bg-blue rounded-full w-2 h-2 " />
              <p className="font-medium ">Simple interest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
