"use client";
import { Navbar_Links } from "@/_mock/data";
import StyledImage from "@/components/StyedImage";
import clsxm from "@/utils/clsxm";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  return (
    <div className=" max-w-[1192px] mx-auto w-full  bg-white px-4 ">
      <div className="flex fixed top-0 left-0 right-0 bg-white z-50 items-center w-full justify-between sm:hidden p-4 ">
        <button
          onClick={() => router.push("/")}
          className="w-full max-w-[153px] "
        >
          <StyledImage
            src="/assets/svg/coinEstateLogo.svg"
            className="w-full max-w-[153px] h-9 "
            alt=""
          />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-grey-1100 p-1 rounded-sm focus:outline-none "
        >
          <StyledImage src="/assets/svg/MenuDark.svg" className="w-6 h-6 " />
        </button>
        {isOpen === true && (
          <div className="absolute left-0 right-0 top-[68px] shadow-2xl p-6 bg-white flex flex-col items-center font-semibold text-black-100">
            {Navbar_Links.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className={clsxm(
                    "text-14 hover:bg-gray-hover w-full text-center py-2 rounded-full ",
                    path === item.path ? "text-yellow " : "text-black-100"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
            <div className="w-full flex flex-col justify-center gap-4 mt-4 items-center">
              <button
                onClick={() => router.push("/dashboard/dashboard-wallet")}
                className="text-14 w-full font-inter font-semibold py-3 text-center px-8 text-black-100 border border-black-100 rounded-full"
              >
                Regístrate
              </button>
              <button className="text-12 font-inter w-full font-semibold py-3 text-center px-8 text-black-100 bg-yellow rounded-full">
                Ingresa
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="hidden sm:flex justify-between items-center py-3">
        <button
          onClick={() => router.push("/")}
          className="w-full max-w-[153px] "
        >
          <StyledImage
            src="/assets/svg/coinEstateLogo.svg"
            className="w-full max-w-[153px] h-9 "
            alt=""
          />
        </button>
        <div className="flex gap-3 md:gap-6 text-14 font-inter font-semibold py-3 text-black-100">
          {Navbar_Links.map((item, idx) => {
            return (
              <Link
                key={idx}
                href={item.path}
                className={clsxm(
                  path === item.path ? "text-yellow " : "text-black-100"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex gap-6 items-center">
          <button
            onClick={() => router.push("/auth/log-in")}
            className="text-12 font-inter font-semibold py-3 text-center px-8 text-black-100 border border-black-100 rounded-full"
          >
            Regístrate
          </button>
          <button
            onClick={() => router.push("/auth/create-account")}
            className="text-12 font-inter font-semibold py-3 text-center px-8 text-black-100 bg-yellow rounded-full"
          >
            Ingresa
          </button>
          <button
            className="bg-black-100 p-1 rounded-full "
            onClick={() => router.push("/admin/dashboard")}
          >
            <StyledImage src="/assets/svg/person.svg" className="w-7 h-7 " />
          </button>
        </div>
      </div>
    </div>
  );
}
