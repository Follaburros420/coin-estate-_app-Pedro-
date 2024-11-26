"use client";

import About from "@/components/About";
import AboutServices from "@/components/AboutServices";
import Services from "@/components/Services";
import WorksTopBanner from "@/components/WorksTopBanner";
import Layout from "@/layout";
import React from "react";

export default function Page() {
  return (
    <Layout>
      <div className="bg-lightblue">
        {/* <Services /> */}
        <WorksTopBanner
          heading={"Servicios Integrales para la Tokenización de inmuebles lkjflkd sajflkjdsa flkjdsalkfjldsa"}
          desc={
            "Desbloquea el Potencial de tus Inversiones Inmobiliarias con Nuestras Soluciones Expertas y Tecnologías Innovadoras"
          }
        />
        <AboutServices />
        <About />
      </div>
    </Layout>
  );
}
