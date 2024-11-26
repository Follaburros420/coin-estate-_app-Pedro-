import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-[#efeaeac7]">
      <Navbar />
      <div className="mt-20">
      {children}
      </div>
    </div>
  );
}
