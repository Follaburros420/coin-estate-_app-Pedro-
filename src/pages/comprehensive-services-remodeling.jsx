import ComprehensiveServicesRemodel from "@/components/ComprehensiveServicesRemodel";
import RegisterBottomBanner from "@/components/RegisterBottomBanner";
import WorksTopBanner from "@/components/WorksTopBanner";
import Layout from "@/layout";
import React from "react";

export default function comprehensiveServicesRemodeling() {
  return (
    <div>
      <Layout>
        <WorksTopBanner
          heading="Servicios Integrales para la Tokenización de inmuebles "
          desc="Desbloquea el Potencial de tus Inversiones Inmobiliarias con Nuestras Soluciones Expertas y Tecnologías Innovadoras"
        />
        <ComprehensiveServicesRemodel />
        <RegisterBottomBanner />
      </Layout>
    </div>
  );
}
