import React from "react";
import BlogHeaders from "./BlogHeaders";
import { BlogThree_QueryTwo_Content } from "@/_mock/data";

export default function BlogThree() {
  return (
    <div className="px-6 sm:px-10 ">
      <div className="w-full max-w-[1161px] mx-auto my-10 sm:my-20 ">
        <BlogHeaders
          userImg={"/assets/svg/UserIcon.svg"}
          userName={"Pedro Ardila"}
          date={"Octubre 17, 2024"}
          dataBtn={"Sector Inmobiliario"}
          mainImg={"/assets/images/BlogThreeMainImg.png"}
          heading={
            "¿Por qué invertir en el mercado inmobiliario de EE. UU. y ganar dólares?"
          }
        />
        <div className="bg-white shadow-md rounded-[8px] p-6 text-gray text-14 font-medium font-inter mt-8 sm:mt-16 ">
          <p>
            Invertir en propiedades en Estados Unidos te ofrece una oportunidad
            única: ganar en dólares, una moneda fuerte, mientras disfrutas de un
            costo de vida más bajo en tu país. Esto significa que puedes ganar
            en dólares y gastar en pesos, lo que te permite aumentar tu riqueza
            y diversificar tus inversiones de manera efectiva. En este artículo,
            exploraremos por qué esta estrategia es tan importante y cómo está
            el mercado inmobiliario en Estados Unidos actualmente.
          </p>
          <div className="mt-10 ">
            <p className="text-18 font-bold text-black-100 text-center sm:text-start">
              Ventajas de ganar en dólares y gastar en pesos
            </p>
            <div className="mt-4 ">
              <p>1. Proteger tu dinero de la devaluación</p>
              <p>
                Ganar en dólares te protege de la devaluación del peso y te
                permite aprovechar la fortaleza del dólar. En los últimos 10
                años, el dólar ha aumentado en promedio un 10% anual frente al
                peso colombiano. Esto significa que, además de las ganancias por
                tu inversión, obtienes más valor simplemente por la apreciación
                del dólar. Esto reduce el riesgo asociado a las fluctuaciones de
                la moneda local y te da más seguridad financiera.
              </p>
            </div>
            <div>
              <p>2. Mayor poder adquisitivo</p>
              <p>
                Al ganar en dólares y gastar en pesos, tu dinero rinde más. Los
                costos de vida en muchos países latinoamericanos son más bajos
                que en Estados Unidos, por lo que tus ingresos en dólares te
                permiten vivir mejor, ahorrar más y mejorar tu calidad de vida.
              </p>
            </div>
          </div>
          <div className="mt-10 ">
            <p className="text-18 font-bold text-black-100 text-center sm:text-start">
              El mercado inmobiliario en Estados Unidos
            </p>
            <p className="mt-4 ">
              El mercado de bienes raíces en Estados Unidos ofrece oportunidades
              atractivas para los inversores internacionales.
            </p>
            <div>
              {BlogThree_QueryTwo_Content.map((item, idx) => {
                return (
                  <div key={idx} className="mt-5 ">
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                    <p>{item.descTwo}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-5 ">
            Invertir en el mercado inmobiliario de Estados Unidos es una
            oportunidad atractiva y segura para inversores que quieren
            diversificar sus inversiones y proteger su dinero. Al ganar en
            dólares y gastar en pesos, puedes mejorar tu situación financiera y
            asegurar tu futuro.
          </p>
          <p>
            En CoinEstate, te ayudamos a acceder a estas oportunidades de manera
            fácil y segura. Gracias a la tokenización de propiedades, puedes
            invertir con montos bajos y empezar a ganar desde la primera semana,
            aprovechando las rentabilidades que ofrecen los inmuebles en Estados
            Unidos.
          </p>
          <p>
            No dejes pasar esta oportunidad de hacer crecer tu patrimonio y
            asegurar tu futuro financiero. Invierte ahora y comienza a ganar en
            dólares con CoinEstate.
          </p>
        </div>
      </div>
    </div>
  );
}
