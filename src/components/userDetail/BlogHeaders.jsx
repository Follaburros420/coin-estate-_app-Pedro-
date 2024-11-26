import React from "react";
import StyledImage from "../StyedImage";

export default function BlogHeaders({
  userImg,
  userName,
  dataBtn,
  date,
  mainImg,
  heading,
}) {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 ">
        <div className="flex flex-col items-center ">
          <p className="text-28 sm:text-36 font-bold leading-none ">
            Escrito Por:
          </p>
          <StyledImage src={userImg} className="w-28 h-28 mt-8 lg:mt-[50px] " />
          <p className="text-20 text-blue-200 lg:mt-3 font-bold font-fustat ">
            {userName}
          </p>
          <p className="text-lightGray-400 lg:mt-3 font-fustat ">{date}</p>
          <button className="text-white font-semibold mt-4 py-[10px] px-3 bg-black-100 border border-Yellow-700 rounded-full ">
            {dataBtn}
          </button>
        </div>
        <StyledImage
          src={mainImg}
          className="w-full max-w-[597px] min-h-[320px] sm:min-h-[371px] "
        />
      </div>
      <p className="text-28 sm:text-26 font-bold font-inter mt-9 text-center sm:text-start capitalize ">{heading}</p>
    </div>
  );
}
