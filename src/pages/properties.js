import AdminAbout from "@/components/AdminAbout";

import Assets from "@/components/Assets";
import Income from "@/components/Income";
import Layout from "@/layout/admin";
import React from "react";

export default function page() {
  return (
    <Layout>
      <div className="bg-black-800 text-white">
        <Income />
        <Assets />
        <AdminAbout />
      </div>
    </Layout>
  );
}
