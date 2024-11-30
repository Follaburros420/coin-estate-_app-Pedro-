"use client";
import clsxm from "@/utils/clsxm";
import React from "react";
import StyledImage from "./StyedImage";
import { useRouter } from "next/navigation";
import { LEARN } from "@/_mock/data";
import { SourceUrl } from "@/hooks/queryContants";
import { handleFormateTime } from "@/utils/helper";
import Link from "next/link";


export default function AboutBlog({ getBlogsList }) {
  const router = useRouter();
  return (
    <div className="px-6 ">
      <div className="max-w-[1161px] mx-auto w-full pb-[100px]">
        <div className="my-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getBlogsList?.map((items, idx) => {
            const image = SourceUrl + items.image
            return (
              <div key={`${items.id}___${idx}`}>
                <div className="max-w-[371px] mx-auto lg:mx-0 bg-white hover:bg-gray-200 rounded-lg border border-gray-200">
                  <div className=" relative ">
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="w-full h-[249px] object-fill"
                    />
                    <button className="absolute top-4 left-4  py-1.5  px-6 rounded-full bg-black-100 text-white ">
                      {'Real Estate Sector'}
                    </button>
                  </div>
                  <div className="p-4">
                    <h5 className="text-16 text-black-100 font-semibold font-inter">
                      {items.heading}
                    </h5>
                    <p className="mt-2 text-14 font-inter font-regular text-gray">
                      {items.details}
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
                          src={'/assets/svg/clock.svg'}
                          alt=""
                        />
                        <h6 className="text-gray font-inter font-semibold text-12">
                          {handleFormateTime(items.createdAt)}
                        </h6>
                      </div>
                    </div>
                    <button
                      // href={{ pathname: "/[blog]/blog-details", query: { id: items.id } }}
                      onClick={() => router.push(`/blog/${items.id}`)}
                      className="mt-4 text-yellow font-inter font-semibold text-12 border border-yellow rounded-full py-3 px-8 "
                    >
                      {'Conoce Más'}
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
