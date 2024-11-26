"use client";
import clsxm from "@/utils/clsxm";
import React from "react";
import StyledImage from "./StyedImage";
import { useRouter } from "next/navigation";
import { LEARN } from "@/_mock/data";


export default function AboutBlog() {
  const router = useRouter();
  return (
    <div className="px-6 ">
      <div className="max-w-[1161px] mx-auto w-full pb-[100px]">
        <div className="my-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARN.map((items, idx) => {
            return (
              <div key={`${items.id}___${idx}`}>
                <div className="max-w-[371px] mx-auto lg:mx-0 bg-white hover:bg-gray-200 rounded-lg">
                  <div className=" relative ">
                    <StyledImage
                      src={items.img}
                      alt=""
                      className="w-full h-[249px]"
                    />
                    <button className="absolute top-4 left-4  py-1.5  px-6 rounded-full bg-black-100 text-white ">
                      {items.btn}
                    </button>
                  </div>
                  <div className="p-4">
                    <h5 className="text-16 text-black-100 font-semibold font-inter">
                      {items.heading}
                    </h5>
                    <p className="mt-2 text-14 font-inter font-regular text-black-100">
                      {items.about}
                    </p>
                    <div className={clsxm("flex justify-between mt-5")}>
                      <div className={clsxm("flex gap-1 items-center ")}>
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
                          src={items.clockImg}
                          alt=""
                        />
                        <h6 className="text-gray font-inter font-semibold text-12">
                          {items.time}
                        </h6>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(items.path)}
                      className="mt-4 text-yellow font-inter font-semibold text-12 border border-yellow rounded-full py-3 px-8 "
                    >
                      {items.btn1}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button className=" text-yellow font-inter font-semibold text-12 border border-yellow rounded-full py-3 px-8 ">
            Más artículos
          </button>
        </div>
      </div>
    </div>
  );
}
