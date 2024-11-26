import React from 'react'

export default function AdminAbout() {
  return (
    <div className="bg-grey-800 mt-[103px] px-6  md:px-12">
     
    <div className="  max-w-[1161px] mx-auto w-full py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 ">
        <div>
          <h5 className="font-inter font-semibold text-16 ">
            Links
          </h5>
          <div className="text-14 font-inter font-regular    leading-6 mt-4">
            <p> Inicio</p>
            <p>¿Cómo Funciona?</p>
            <p>Servicios</p> <p>Marketplace</p>
            <p>Aprender</p>
          </div>
        </div>

        <div className="max-w-[176px] mx-auto">
          <h5 className="font-inter font-semibold text-16 ">
            Otros Links
          </h5>
          <div className="text-14 font-inter font-regular   leading-6 mt-4">
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
          <h5 className="font-inter font-semibold text-16">
            Contáctanos
          </h5>
          <div className="   leading-6 mt-4">
            <div className="flex  gap-2">
              <img src="/assets/svg2/phone.svg" alt="" />
              <p className="text-14 font-inter font-regular">
                1234567890
              </p>
            </div>
            <div className="flex  gap-2">
              <img src="/assets/svg2/email.svg" alt="" />
              <p className="text-14 font-inter font-regular ">
                coinestate@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
