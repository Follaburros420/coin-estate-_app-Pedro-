import { SERVICES } from "@/_mock/data";
import React, { useState } from "react";
import StyledImage from "./StyedImage";
import clsxm from "@/utils/clsxm";
import { useRouter } from "next/navigation";
import RegisterBottomBanner from "./RegisterBottomBanner";
export default function AboutServices() {
  const router = useRouter();
  return (
    <div className="px-6 my-10 sm:my-20 ">
      <div className="max-w-[1161px] mx-auto w-full ">
        <p className="text-28 sm:text-36 font-bold font-inter text-center text-black-100 sm:text-start dark:text-white">
          Qué servicios ofrecemos?
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-6">
          {SERVICES.map((items, idx) => {
            return (
              <div
                key={`${items.id}___${idx}`}
                className="w-full max-w-[500px] rounded-[16px] border border-gray-200/70 bg-white/95 py-6 px-4 text-black-100 shadow-[0_25px_70px_-60px_rgba(15,23,42,0.35)] transition-colors lg:mx-0 lg:rounded-[12px] dark:border-white/10 dark:bg-black-900/60 dark:text-white dark:shadow-[0_30px_90px_-70px_rgba(0,0,0,0.7)]"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:items-start text-center sm:text-start ">
                  <StyledImage
                    src={items.img}
                    alt=""
                    className="w-full max-h-[150px] max-w-[100px] md:max-w-[150px] "
                  />
                  <div>
                    <p className="font-extrabold leading-none font-inter text-16 md:text-18 text-black-100 dark:text-white">
                      {items.title}
                    </p>
                    <p className="max-w-[362px] text-14 font-regular text-gray mt-2 font-inter dark:text-white/80">
                      {items.about}
                    </p>
                    {items.btn && (
                      <button
                        onClick={() => router.push(items.path)}
                        className="bg-yellow text-white rounded-full mt-6 text-12 font-inter font-semibold py-3 px-8"
                      >
                        {items.btn}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RegisterBottomBanner />
    </div>
  );
}
