"use client";
import StyledImage from "@/components/StyedImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="lg:px-11 px-4 py-5 fixed top-0 left-0 right-0 z-50 shadow-xl bg-white ">
      <div className="w-full max-w-[1161px] mx-auto flex items-center justify-between gap-28 ">
        <button onClick={() => router.push("/")}>
          <StyledImage
            src="/assets/svg/coinEstateLogo.svg"
            className="w-[153px] h-9 "
          />
        </button>
        <div className="hidden md:flex items-center gap-5 ">
          <Link href="/admin/create-property">Create Property</Link>
          <Link href="/admin/create-blog">Create Blog</Link>
          <Link href="/admin/dashboard">Dashboard</Link>
        </div>
        <button className="md:hidden block " onClick={() => setIsOpen(!isOpen)}>
          <StyledImage src="/assets/svg/Menu.svg" className="w-8 h-8 " />
        </button>
        {isOpen === true && (
          <div className="md:hidden absolute z-50 shadow-lg top-[75px] left-0 right-0 bg-black-500 p-4 flex flex-col items-center border-t-2 border-t-gray-dark justify-center  ">
            <Link
              href="/admin/create-marketplace"
              className="hover:bg-gray-dark w-full rounded-[4px] text-18 font-medium p-2 my-1 text-center "
            >
              Create MarketPlace
            </Link>
            <Link
              href="/admin/create-blog"
              className="hover:bg-gray-dark w-full rounded-[4px] text-18 font-medium p-2 my-1 text-center "
            >
              Create Blog
            </Link>
            <Link
              href="/admin/dashboard"
              className="hover:bg-gray-dark w-full rounded-[4px] text-18 font-medium p-2 my-1 text-center "
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
