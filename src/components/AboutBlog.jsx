/* eslint-disable @next/next/no-img-element */
"use client";
import { SourceUrl } from "@/hooks/queryContants";
import clsxm from "@/utils/clsxm";
import { handleFormateTime } from "@/utils/helper";
import { useRouter } from "next/navigation";
import StyledImage from "./StyedImage";
import { useState } from "react";


export default function AboutBlog({ getBlogsList }) {
  const router = useRouter();
  const [showMore, setShowMore] = useState(3)
  return (
    <div className="px-6 ">
      <div className="max-w-[1161px] mx-auto w-full pb-[100px]">
        <div className="my-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getBlogsList?.map((items, idx) => {
            const image = items.image !== 'null' ? SourceUrl + items.image : '/assets/images/BlogTwoMainImg.png';
            if (showMore > idx)
              return (
                <div key={`${items.id}___${idx}`}>
                  <div className="max-w-[371px] mx-auto rounded-2xl border border-gray-200/70 bg-white/95 transition-colors hover:bg-gray-200 lg:mx-0 dark:border-white/10 dark:bg-black-900/60 dark:hover:bg-black-900/70">
                    <div className=" relative ">
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="w-full h-[249px] object-fill"
                      />
                      <button className="absolute top-4 left-4 rounded-full bg-black-100 px-6 py-1.5 text-white transition-colors dark:bg-white dark:text-black-100">
                        {items.blogStatus}
                      </button>
                    </div>
                    <div className="p-4">
                      <h5 className="text-16 font-inter font-semibold text-black-100 dark:text-white">
                        {items.heading}
                      </h5>
                      <p className="mt-2 text-14 font-inter font-regular text-gray dark:text-white/75">
                        {items.details}
                      </p>
                      <div className={clsxm("flex justify-between mt-5")}>
                        <div className={clsxm("flex gap-1 items-center ")}>
                          <StyledImage
                            className="w-8 h-8 "
                            src="/assets/svg/UserIcon.svg"
                            alt=""
                          />
                          <h6 className="text-14 font-inter font-semibold text-black-100 dark:text-white">
                            Pedro Ardila
                          </h6>
                        </div>
                        <div className="flex gap-2 items-center ">
                          <StyledImage
                            className="w-4 h-4 "
                            src={'/assets/svg/clock.svg'}
                            alt=""
                          />
                          <h6 className="text-12 font-inter font-semibold text-gray dark:text-white/60">
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
        {getBlogsList?.length !== showMore && (<div
          className="flex justify-center">
          <button
            onClick={() => setShowMore(getBlogsList?.length)}
            className=" text-yellow font-inter font-semibold text-12 border border-yellow rounded-full py-3 px-8 ">
            Más artículos
          </button>
        </div>)}
      </div>
    </div>
  );
}
