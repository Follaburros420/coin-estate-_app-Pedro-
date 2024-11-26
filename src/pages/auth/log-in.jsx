"use client";
import StyledImage from "@/components/StyedImage";
import React, { useState } from "react";

export default function LogIn() {
  const [showEmail, setShowEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  return (
    <div className="bg-black-800 min-h-screen flex items-center justify-center ">
      <div className="bg-white p-4 rounded-[20px] w-full max-w-[500px]  ">
        <p className="text-30 font-bold text-center">Inicio de sesión</p>
        <div className="mt-6 ">
          <p>Tu Correo</p>
          <div className="bg-light-brand-200 py-2 px-3 mt-2 rounded-[4px] text-light-brand-300 flex items-center justify-between ">
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
        <div className="mt-6 ">
          <div className="flex items-center justify-between w-full text-lightGray-700 ">
            <p>Contraseña</p>
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Esconder" : "Espectáculo"}
            </button>
          </div>
          <div className="bg-light-brand-200 py-2 px-3 mt-2 rounded-[4px] text-light-brand-300 flex items-center justify-between ">
            <input
              type={showPassword === true ? "text" : "password"}
              className="bg-[transparent] w-full text-16 outline-none "
              placeholder="*****************"
            />
          </div>
        </div>
        <button className="font-semibold text-lightGray-700 w-full bg-Yellow-100 rounded-[10px] mt-6 p-3  ">
          Iniciar sesión
        </button>
        <p className="text-lightGray-700 font-semibold mt-8 ">
          ¿Aún no tienes cuenta?
        </p>
        <div className="flex items-center justify-between mt-4 px-6 text-blue-500 font-medium underline ">
          <button>Regístrate</button>
          <button>¿Olvidaste tu contraseña?</button>
        </div>
      </div>
    </div>
  );
}
