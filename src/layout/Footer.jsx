/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Footer() {
  return (
    <div className="bg-black-100 py-8  px-4" >
      <div className="max-w-[1161px] mx-auto w-full pt-10 mt-0 md:mt-0 ">
        <div className="block md:flex justify-between items-center ">
          <img src="/assets/svg/logo.svg" alt="" className=' max-w-[180px] mx-auto md:mx-0' />
          <div className="flex gap-4 justify-center md:justify-start mt-8">
            <img src="/assets/svg/fb.svg" alt="" />
            <img src="/assets/svg/linkedin.svg" alt="" />
            <img src="/assets/svg/insta.svg" alt="" />
            <img src="/assets/svg/tiktok.svg" alt="" />
            <img src="/assets/svg/youTube.svg" alt="" />
          </div>
        </div>
        <hr className="text-white mt-6 " />
        <p className="text-14 font-regular pb-8  text-center md:text-start font-inter text-white mt-6">
          Copyright © 2024 CoinEstate. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
