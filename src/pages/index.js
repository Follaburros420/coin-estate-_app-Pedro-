import About from "@/components/About";
import AboutCoinEstate from "@/components/AboutCoinEstate";
import Comparison from "@/components/Comparison";
import Difference from "@/components/Difference";
import FAQ from "@/components/FAQ";
import Header from "@/components/Header";
import Learn from "@/components/Learn";
import Selection from "@/components/Selection";
import Slider from "@/components/Slider";
import Tokens from "@/components/Tokens";
import Layout from "@/layout";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Coin-Estate",
  description: "Trustable platform for real estate developers",
  logo: '/logo.png'
};

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
      <Layout>
        <div className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
          <Header />
          <Tokens />
          <AboutCoinEstate />
          <Difference />
          <Selection />
          <Comparison />
          <Slider />
          <FAQ />
          <Learn />
          <About />
        </div>
      </Layout>
    </div>
  );
}
