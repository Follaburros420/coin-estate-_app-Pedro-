import ComprehensiveService from "@/components/ComprehensiveService";
import RegisterBottomBanner from "@/components/RegisterBottomBanner";
import WorksTopBanner from "@/components/WorksTopBanner";
import Layout from "@/layout";
import React from "react";

export default function comprehensiveServices() {
  return (
    <div>
      <Layout>
        <WorksTopBanner
          heading="Servicios Integrales para la Tokenización de inmuebles "
          desc="Desbloquea el Potencial de tus Inversiones Inmobiliarias con Nuestras Soluciones Expertas y Tecnologías Innovadoras"
        />
        <ComprehensiveService />
        <RegisterBottomBanner />
      </Layout>
    </div>
  );
}
