"use client";
import { Marketing_Cards_Data } from "@/_mock/data";
import React from "react";
import StyledImage from "./StyedImage";
import { useRouter } from "next/navigation";
import RegisterBottomBanner from "./RegisterBottomBanner";

export default function Marketing() {
  const router = useRouter();
  return (
    <div className=" px-6 my-10 sm:my-20 ">
      <div className="max-w-[1161px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Marketing_Cards_Data.map((items, idx) => {
            return (
              <button
                onClick={() => router.push(items.onClick)}
                key={`${items.id}____${idx}`}
                className="w-full max-w-[371px] mx-auto lg:mx-0 text-start bg-white rounded-[8px] p-6"
              >
                <StyledImage className="w-12 h-12 " src={items.img} alt="" />
                <p className="mt-6 font-extrabold leading-[20px] font-inter text-18 text-black-100">
                  {items.title}
                </p>
                <p className="mt-2 font-regular font-inter text-14 text-gray">
                  {items.about}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <RegisterBottomBanner />
    </div>
  );
}
