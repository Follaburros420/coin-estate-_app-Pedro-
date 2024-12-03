/* eslint-disable react/no-unescaped-entities */
"use client";
import StyledImage from "@/components/StyedImage";
import React, { useState } from "react";

export default function LogIn() {
  const [showEmail, setShowEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  return (
    <div className="bg-black-800 min-h-screen flex items-center justify-center ">
      <div className="bg-white p-6 rounded-[20px] w-full max-w-[500px]  ">
        <p className="text-30 font-bold text-center">Log-In</p>
        <div className="mt-4 ">
          <p className="font-bold font-quickSand ">Email:</p>
          <div className="bg-light-brand-200 border border-grayTwo py-2 px-3 mt-2 rounded-[10px] text-light-brand-300 flex items-center justify-between ">
            <input
              type={showEmail === true ? "text" : "password"}
              className="bg-[transparent] w-full text-16 outline-none "
              placeholder="Ejemplo@coinestate.com.co"
            />
            <button onClick={() => setShowEmail(!showEmail)}>
              {showEmail === true ? (
                <StyledImage
                  src="/assets/svg/EyeIcon.svg"
                  className="w-4 h-4  "
                />
              ) : (
                <StyledImage
                  src="/assets/svg/HideEyeIcon.svg"
                  className="w-4 h-4  "
                />
              )}
            </button>
          </div>
        </div>
        <div className="mt-4 ">
          <div className="flex items-center justify-between w-full text-lightGray-700 ">
            <p className="font-bold font-quickSand ">Password:</p>
            <button
              className="font-quickSand font-bold "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="bg-light-brand-200 border border-grayTwo py-2 px-3 mt-2 rounded-[10px] text-light-brand-300 flex items-center justify-between ">
            <input
              type={showPassword === true ? "text" : "password"}
              className="bg-[transparent]  w-full text-16 outline-none "
              placeholder="*****************"
            />
          </div>
        </div>
        <button className="text-lightGray-700 w-full bg-Yellow-100 rounded-[10px] mt-6 p-3 text-20 font-bold ">
          Log In
        </button>
        {/* <hr className="my-4 p-1 border-none bg-grayTwo rounded-[100%] " /> */}
        <p className="text-lightGray-700 font-bold font-quickSand mt-8 ">
          Don't have an account yet?
        </p>
        <div className="flex items-center justify-between mt-4 px-6 text-blue-500 font-medium underline ">
          <button>Sign up</button>
          <button>Forgot your password?</button>
        </div>
      </div>
    </div>
  );
}
