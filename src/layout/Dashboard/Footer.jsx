/* eslint-disable @next/next/no-img-element */
import StyledImage from "@/components/StyedImage";
// import Footer from "@/dashboard/Footer";
import React from "react";

export default function AdminFooter() {
  return (
    <div className="w-full">
      <div className="w-full bg-grey-500 text-white pt-2 ">
        <div className="max-w-[1160px] mx-auto w-full pb-8 ">
          <div className=" pb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 ">
              <div>
                <h5 className="font-inter font-semibold text-16">Links</h5>
                <div className="text-14 font-inter font-regular leading-6 mt-4">
                  <p> Inicio</p>
                  <p>¿Cómo Funciona?</p>
                  <p>Servicios</p> <p>Marketplace</p>
                  <p>Aprender</p>
                </div>
              </div>

              <div className="max-w-[176px] mx-auto">
                <h5 className="font-inter font-semibold text-16">
                  Otros Links
                </h5>
                <div className="text-14 font-inter font-regular leading-6 mt-4">
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
                <h5 className="font-inter font-semibold text-16 ">
                  Contáctanos
                </h5>
                <div className="   leading-6 mt-4">
                  <div className="flex items-center gap-2">
                    <StyledImage
                      className="w-4 h-4"
                      src="/assets/svg/PhoneLight.svg"
                      alt=""
                    />
                    <p className="text-14 font-inter font-regular ">
                      1234567890
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StyledImage
                      className="w-4 h-4 "
                      src="/assets/svg/emailLight.svg"
                      alt=""
                    />
                    <p className="text-14 font-inter font-regular">
                      coinestate@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 bg-black-100  px-4">
        <div className="max-w-[1161px] mx-auto w-full pt-10 mt-0 md:mt-0 ">
          <div className="block md:flex justify-between items-center ">
            <img
              src="/assets/svg2/logo.svg"
              alt=""
              className=" max-w-[180px] mx-auto md:mx-0"
            />
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
            Copyright © 2024 CoinEstate. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
