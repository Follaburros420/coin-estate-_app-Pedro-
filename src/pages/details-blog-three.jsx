import RegisterBottomBanner from "@/components/RegisterBottomBanner";
import BlogThree from "@/components/userDetail/BlogThree";
import WorksTopBanner from "@/components/WorksTopBanner";
import Layout from "@/layout";
import React from "react";

export default function detailsBlogThree() {
  return (
    <div>
      <Layout>
        <WorksTopBanner
          heading="Perspectivas y Actualizaciones sobre la Tokenización Inmobiliaria "
          desc="Mantente informado con nuestros últimos artículos, noticias y opiniones de expertos sobre el mundo en evolución de la inversión inmobiliaria y la tecnología blockchain."
        />
        <BlogThree />
        <RegisterBottomBanner />
      </Layout>
    </div>
  );
}
