"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import StyledImage from "@/components/StyedImage";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateAccount() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen xl:min-h-auto xl:justify-between gap-10 w-full max-w-[1600px] mx-auto p-6 ">
      <div className="w-full max-w-[586px] ">
        <p className="text-30 font-bold text-center ">Crear Cuenta</p>
        <p className="mt-6">Tu Correo</p>
        <div className="bg-light-brand-200 py-2 px-3 mt-2 rounded-[4px] text-light-brand-300 w-full ">
          <input
            type="password"
            className="bg-[transparent] w-full text-16 outline-none "
            placeholder="Ejemplo@coinestate.com.co"
          />
        </div>
        <div className="text-lightGray-700">
          <div className="flex items-center justify-between mt-6 w-full">
            <p>Contraseña</p>
            <div className="flex items-center gap-2 ">
              <StyledImage src="/assets/svg/EyeIcon.svg" className="w-4 h-4" />
              <p>Mostrar</p>
            </div>
          </div>
          <div className="bg-light-brand-200 py-2 px-3 mt-2 rounded-[4px] text-light-brand-300 flex items-center justify-between ">
            <input
              type="password"
              className="bg-[transparent] w-full text-16 outline-none "
              placeholder="*****************"
            />
          </div>
          <p className="mt-6">Repetir Contraseña</p>
          <div className="bg-light-brand-200 py-2 px-3 mt-2 rounded-[4px] text-light-brand-300 flex items-center justify-between ">
            <input
              type="password"
              className="bg-[transparent] w-full text-16 outline-none "
              placeholder="*****************"
            />
          </div>
        </div>
        <button
          onClick={() => router.push("/dashboard/dashboard-wallet")}
          className="bg-Yellow-100 p-3 text-lightGray-700 font-semibold mt-20 w-full rounded-[10px] "
        >
          Crea Tu Cuenta
        </button>
        <p className="text-lightGray-700 font-semibold mt-14 text-center ">
          ¿Ya te habias registrado?
        </p>
        <p className="underline text-blue-500 mt-7 text-center ">
          Inicia Sesión
        </p>
      </div>
      <img
        src="/assets/images/CreateAccountMainImg.png"
        className="w-full max-w-[800px] hidden xl:block "
      />
    </div>
  );
}
