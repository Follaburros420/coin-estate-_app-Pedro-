import About from "@/components/About";
import Marketing from "@/components/Marketing";
import Understanding from "@/components/Understanding";
import WorksTopBanner from "@/components/WorksTopBanner";
import Layout from "@/layout";
import React from "react";

export default function page() {
  return (
    <Layout>
      <div className="bg-lightblue ">
        {/* <Understanding /> */}
        <WorksTopBanner
          heading="Descubre el Proceso de  inversión Inmobiliaria en "
          coinEstateTitle={"CoinEstate"}
          desc={
            "Descubre los Pasos Detallados y Mecanismos Detrás de la Conversión de Activos Inmobiliarios en Tokens Negociables, Entiende nuestro modelo de negocio  y cómo hacemos posible la creación de un entorno completamente seguro para invertir en activos inmobiliarios desde bajos capitales."
          }
        />
        <Marketing />
        <About />
      </div>
    </Layout>
  );
}
