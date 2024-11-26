import RegisterBottomBanner from "@/components/RegisterBottomBanner";
import BlogOne from "@/components/userDetail/BlogOne";
import WorksTopBanner from "@/components/WorksTopBanner";
import Layout from "@/layout";
import React from "react";

export default function detailsBlogOne() {
  return (
    <div>
      <Layout>
        <WorksTopBanner
          heading="Perspectivas y Actualizaciones sobre la Tokenización Inmobiliaria "
          desc="Mantente informado con nuestros últimos artículos, noticias y opiniones de expertos sobre el mundo en evolución de la inversión inmobiliaria y la tecnología blockchain."
        />
        <BlogOne />
        <RegisterBottomBanner />
      </Layout>
    </div>
  );
}
