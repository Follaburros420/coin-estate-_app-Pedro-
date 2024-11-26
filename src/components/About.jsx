/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function About() {
  return (
    <div className="px-6 ">
      <div className="max-w-[1161px] mx-auto w-full">
        <div className=" pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 ">
            <div>
              <h5 className="font-inter font-semibold text-16 text-black-100">
                Links
              </h5>
              <div className="text-14 font-inter font-regular text-black-100   leading-6 mt-4">
                <p> Inicio</p>
                <p>¿Cómo Funciona?</p>
                <p>Servicios</p> <p>Marketplace</p>
                <p>Aprender</p>
              </div>
            </div>

            <div className="max-w-[176px] mx-auto">
              <h5 className="font-inter font-semibold text-16 text-black-100">
                Otros Links
              </h5>
              <div className="text-14 font-inter font-regular text-black-100   leading-6 mt-4">
                <p>
                  {" "}
                  Política de <br /> Privacidad
                </p>
                <p>
                  Términos y <br /> Condiciones
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0 max-w-[176px] ml-0 md:ml-auto">
              <h5 className="font-inter font-semibold text-16 text-black-100">
                Contáctanos
              </h5>
              <div className="   leading-6 mt-4">
                <div className="flex  gap-2">
                  <img src="/assets/svg/phone.svg" alt="" />
                  <p className="text-14 font-inter font-regular text-black-100">
                    1234567890
                  </p>
                </div>
                <div className="flex  gap-2">
                  <img src="/assets/svg/email.svg" alt="" />
                  <p className="text-14 font-inter font-regular text-black-100">
                    coinestate@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
