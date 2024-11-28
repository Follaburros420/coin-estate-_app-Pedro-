import About from "@/components/About";
import AboutMarketPlace from "@/components/AboutMarketPlace";
import AboutProperties from "@/components/AboutProperties";
import Properties from "@/components/Properties";
import RegisterBottomBanner from "@/components/RegisterBottomBanner";
import { useQueryGetProperty } from "@/hooks/query";
import Layout from "@/layout";
import React from "react";

export default function Page() {
  const { data:getPropertyList } = useQueryGetProperty();
  console.log({getPropertyList})
  return (
    <Layout>
      <div className="bg-lightblue">
        <AboutMarketPlace />
        <div className="px-6 ">
          <Properties />
          <AboutProperties getPropertyList={getPropertyList} />
          <RegisterBottomBanner />
        </div>
        <About />
      </div>
    </Layout>
  );
}
