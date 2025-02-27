"use client"
import AdminAbout from "@/components/AdminAbout";
import Assets from "@/components/Assets";
import Income from "@/components/Income";
import Layout from "@/layout/Dashboard";
import { usePathname } from "next/navigation";
import React from "react";

export default function MyProperties() {
  const location = usePathname();
  const paths = {
    "/admin/my-properties": "My Properties",
  };
  return (
    <div>
      <Layout>
        <div className=" text-white my-10 ">
          <p className="text-28 text-center -mt-5 mb-5 font-ubuntu font-bold lg:hidden leading-none text-white w-full ">
            {paths[location]}
          </p>
          <Income />
          <Assets />
          {/* <AdminAbout /> */}
        </div>
      </Layout>
    </div>
  );
}
