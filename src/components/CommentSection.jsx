/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function CommentSection() {
  return (
    <div className="max-w-[786px] mx-auto w-full bg-white mt-4 rounded-[8px] p-6">
      <h4 className="text-18 font-inter font-bold text-black-100">
        Leave a comment
      </h4>
      <p className="mt-4 text-14 font-inter font-regular text-gray">
        Your email address will not be published. Required fields are marked *
      </p>
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 gap-5 w-fit lg:w-full  mx-auto">
        <div>
          <p className="text-14 font-inter font-semibold text-black-100">
            Name
          </p>
          <div className="flex gap-2.5 items-center px-3 py-[14px] bg-lightblue max-w-[226px] border border-grey-200 mt-1 rounded-[8px]">
            <img src="/assets/svg/feedback.svg" alt="" />
            <input
              type="text"
              placeholder=" Type Here"
              className="text-grey-100  bg-lightblue outline-none w-full text-12 font-inter font-regular"
            />
          </div>
        </div>
        <div>
          <p className="text-14 font-inter font-semibold text-black-100">
            Email
          </p>
          <div className="flex gap-2.5 items-center px-3 py-[14px] bg-lightblue max-w-[226px] border border-grey-200 mt-1 rounded-[8px]">
            <img src="/assets/svg/feedback.svg" alt="" />
            <input
              type="text"
              placeholder=" Type Here"
              className="text-grey-100 bg-lightblue outline-none w-full text-12 font-inter font-regular"
            />
          </div>
        </div>
        <div>
          <p className="text-14 font-inter font-semibold text-black-100">Web</p>
          <div className="flex gap-2.5 items-center px-3 py-[14px] bg-lightblue max-w-[226px] border border-grey-200 mt-1 rounded-[8px]">
            <img src="/assets/svg/feedback.svg" alt="" />
            <input
              type="text"
              placeholder=" Type Here"
              className="text-grey-100  bg-lightblue  outline-none w-full text-12 font-inter font-regular"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="text-14 mt-4 font-inter font-semibold text-black-100">
          Add Comment
        </p>
        <div className="flex gap-2.5 items-start  px-3 py-[14px] h-[160px] bg-lightblue max-w-[718px] border border-grey-200 mt-1 rounded-[8px]">
          <img src="/assets/svg/feedback.svg" alt="" />
          <input
            type="text"
            placeholder=" Type Here"
            className="text-grey-100  bg-lightblue outline-none w-full text-12 font-inter font-regular"
          />
        </div>
      </div>

      <div className=" mt-4 flex gap-2 items-start">
        <input type="checkbox" className="bg-peach" />
        <p className="text-gray text-12 font-inter font-regular">
          Save my name, email, and website in this browser for the next time 
        </p>
      </div>
      <button className="mt-6 px-8 py-3 text-white text-12 font-inter font-semibold bg-yellow rounded-full">
        Post a comment
      </button>
    </div>
  );
}
