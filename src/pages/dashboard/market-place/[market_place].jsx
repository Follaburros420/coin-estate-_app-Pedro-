import HeaderSection from "@/components/Dashboard/MarketPlace/HeaderSection";
import Tabs from "@/components/Dashboard/MarketPlace/Tabs";
import { useQueryGetProperty } from "@/hooks/query";
import Layout from "@/layout/Dashboard";
import { useParams } from "next/navigation";
import React from "react";

export default function MarketPlace() {
  const { data: getPropertyList } = useQueryGetProperty();

  const params = useParams();

  const selectedNFT = getPropertyList?.filter((item) => item.id === params?.market_place)?.[0];


  return (
    <div>
      <Layout>
        <div className="px-6 lg:px-10 ">
          <div className="w-full max-w-[1161px] mx-auto my-10 ">
            <HeaderSection selectedNFT={selectedNFT}  />
            <Tabs selectedNFT={selectedNFT} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
