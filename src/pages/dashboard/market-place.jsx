import HeaderSection from "@/components/Dashboard/MarketPlace/HeaderSection";
import Tabs from "@/components/Dashboard/MarketPlace/Tabs";
import Layout from "@/layout/Dashboard";
import React from "react";

export default function MarketPlace() {
  return (
    <div>
      <Layout>
        <div className="px-6 lg:px-10 ">
          <div className="w-full max-w-[1161px] mx-auto my-10 ">
            <HeaderSection />
            <Tabs />
          </div>
        </div>
      </Layout>
    </div>
  );
}
