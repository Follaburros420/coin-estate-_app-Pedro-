"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import StyledImage from "@/components/StyedImage";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen max-h-screen xl:justify-between gap-10 w-full mx-auto ">
      <div className="w-full max-w-[50%] flex items-center justify-center ">
        <div className="w-full max-w-[586px] pl-6 ">
          <p className="text-30 font-quickSand font-bold text-center ">
            Crear Cuenta
          </p>
          <p className="mt-6 font-quickSand font-bold">Email</p>
          <div className="bg-light-brand-200 py-2 px-3 mt-2 rounded-[10px] border border-grayTwo text-light-brand-300 w-full ">
            <input
              type="password"
              className="bg-[transparent] w-full text-16 outline-none "
              placeholder="Ejemplo@coinestate.com.co"
            />
          </div>
          <div className="text-lightGray-700">
            <div className="flex items-center justify-between mt-6 w-full">
              <p className="font-quickSand font-bold ">Password</p>
            </div>
            <div className="bg-light-brand-200 py-2 px-3 mt-2 rounded-[10px] border border-grayTwo text-light-brand-300 flex items-center justify-between ">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-[transparent] w-full text-16 outline-none "
                placeholder="*****************"
              />
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword === true ? (
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
            <div className="flex items-center justify-between mt-6 ">
              <p className="font-quickSand font-bold">Confirm Password</p>
            </div>
            <div className="bg-light-brand-200 border border-grayTwo py-2 px-3 mt-2 rounded-[10px] text-light-brand-300 flex items-center justify-between ">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="bg-[transparent] w-full text-16 outline-none "
                placeholder="*****************"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword === true ? (
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
          <button
            onClick={() => router.push("/dashboard/dashboard-wallet")}
            className="bg-Yellow-100 p-3 text-lightGray-700 font-bold font-quickSand mt-20 w-full rounded-[10px] "
          >
            Create Your Account
          </button>
          <p className="text-lightGray-700 font-semibold mt-14 text-center ">
            Have you already registered?
          </p>
          <p className="underline text-blue-500 mt-7 text-center ">Log In</p>
        </div>
      </div>
      <div>
        <img
          src="/assets/images/CreateAccountMainImg.png"
          className="w-full min-h-screen max-h-screen hidden xl:block "
        />
      </div>
    </div>
  );
}
