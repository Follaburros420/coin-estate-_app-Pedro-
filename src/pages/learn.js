import About from "@/components/About";
import AboutBlog from "@/components/AboutBlog";
import Blog from "@/components/Blog";
import Learn from "@/components/Learn";
import Update from "@/components/Update";
import WorksTopBanner from "@/components/WorksTopBanner";
import Layout from "@/layout";
import React from "react";

export default function page() {
  return (
    <Layout>
      <div className="bg-lightblue">
        {/* <Update /> */}
        <WorksTopBanner
          heading={
            "Perspectivas y Actualizaciones sobre la Tokenización Inmobiliaria"
          }
          desc={
            "Mantente informado con nuestros últimos artículos, noticias y opiniones de expertos sobre el mundo en evolución de la inversión inmobiliaria y la tecnología blockchain."
          }
        />
        <Blog />
        <AboutBlog />
        <About />
      </div>
    </Layout>
  );
}
