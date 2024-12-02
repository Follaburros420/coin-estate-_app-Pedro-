/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import StyledImage from "./StyedImage";
import { handleFormateTime } from "@/utils/helper";
import { SourceUrl } from "@/hooks/queryContants";
import clsxm from "@/utils/clsxm";

const options = ['all', 'Real Estate', 'Tokenization', 'Coin Estate']


export default function Blog({ blog, handleSelectFilter, handleSearch }) {
  const [selected, setSelected] = useState('all')
  return (
    <div className="px-6 ">
      <div className="max-w-[1161px] mx-auto w-full pt-[100px]">
        <p className="text-28 lg:text-36 text-black-100 text-center lg:text-start font-inter font-bold">
          descubre más, de la mano de{" "}
          <span className="text-yellow">CoinEstate</span>
        </p>
        <div className="mt-8 flex flex-col lg:flex-row gap-10 items-center justify-between mx-auto">
          <div className="flex items-center justify-center lg:justify-start w-full gap-2 ">
            {options.map((item) => {
              return <button key={item}
                onClick={() => {
                  setSelected(item)
                  handleSelectFilter(item)
                }}
                className={clsxm("text-black-100 border w-fit text-center rounded-full p-2 sm:px-6 text-12 capitalize font-semibold font-inter", selected === item ? 'bg-yellow' : 'border-black-100 ')}>
                {item}
              </button>
            })

            }
          </div>
          <div className="border border-gray-200 rounded-full w-full max-w-[530px] lg:max-w-[305px] p-2.5 flex items-center gap-2.5">
            <StyledImage
              className="w-4 h-4"
              src="/assets/svg/search.svg"
              alt=""
            />
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Busca Artículos"
              className="text-gray bg-lightblue font-inter outline-none font-regular text-16 w-full"
            />
          </div>
        </div>
        <div className="mt-16  grid md:grid-cols-2  max-w-[1161px] mx-auto gap-7">
          <img
            src={blog?.image !== 'null' ? SourceUrl + blog?.image : "/assets/images/LearnPageMainImg.png"}
            alt=""
            className="max-h-[448px] mx-auto w-full md:max-w-[662px]"
          />
          <div className="mt-6 w-full mx-auto">
            <button className="font-semibold text-14 text-center font-inter text-white bg-black-100 rounded-full py-1.5 px-6">
              {blog?.type || 'Sector Inmobiliario'}
            </button>
            <h5 className="mt-6 text-black-100 text-16 font-inter font-semibold">
              {blog?.heading}
            </h5>
            <p className="mt-2 text-14 font-inter font-regular text-black-100">
              {blog?.description}
            </p>
            <div className="flex justify-between mt-8">
              <div className="flex flex-1 gap-1 items-center ">
                <StyledImage
                  className="w-8 h-8 "
                  src="/assets/svg/UserIcon.svg"
                  alt=""
                />
                <h6 className="text-black-100 font-inter font-semibold text-14">
                  Pedro Ardila
                </h6>
              </div>
              <div className="flex gap-2 items-center ">
                <StyledImage
                  className="w-4 h-4 "
                  src="/assets/svg/clock.svg"
                  alt=""
                />
                <h6 className="text-gray font-inter font-semibold text-12">
                  {handleFormateTime(blog?.createdAt)}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
