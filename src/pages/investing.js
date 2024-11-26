"use client";
import About from "@/components/About";
import AboutInvesting from "@/components/AboutInvesting";
import CommentSection from "@/components/CommentSection";
import CommentSrction from "@/components/CommentSection";
import Investing from "@/components/Investing";
import RegisterBottomBanner from "@/components/RegisterBottomBanner";
import Steps from "@/components/Steps";
import Layout from "@/layout";
import React from "react";

export default function page() {
  return (
    <Layout>
      <Investing />
      <div className="bg-lightblue px-6 ">
        <div className="max-w-[1161px] mx-auto w-full  ">
          <h1 className="text-black-100 font-inter text-36 pt-[77px] ">
            Guía para invertir
          </h1>
          <p className="mt-6 text-gray  text-14 font-inter font-medium ">
            Guía paso a paso para invertir en los inmuebles y proyectos que
            desees, desde cómo crear tu cuenta y billetera virtual, hasta cómo
            comprar fracciones, reinvertir o retirar <br /> ganancias.
          </p>
          <div className="max-w-[1161px] mx-auto w-full px-4 mt-16  block lg:flex gap-6">
            <AboutInvesting />
            <div>
              <Steps />
              <div>
                {" "}
                <CommentSection />
              </div>
            </div>
          </div>
        </div>
        <RegisterBottomBanner />
        <About />
      </div>
    </Layout>
  );
}
