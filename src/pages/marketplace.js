import About from "@/components/About";
import AboutMarketPlace from "@/components/AboutMarketPlace";
import AboutProperties from "@/components/AboutProperties";
import Properties from "@/components/Properties";
import RegisterBottomBanner from "@/components/RegisterBottomBanner";
import Layout from "@/layout";
import React from "react";

export default function Page() {
  return (
    <Layout>
      <div className="bg-lightblue">
        <AboutMarketPlace />
        <div className="px-6 ">
          <Properties />
          <AboutProperties />
          <RegisterBottomBanner />
        </div>
        <About />
      </div>
    </Layout>
  );
}
