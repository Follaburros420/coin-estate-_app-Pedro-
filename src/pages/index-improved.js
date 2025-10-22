import About from "@/components/About";
import AboutCoinEstate from "@/components/AboutCoinEstate-improved"; // Componente mejorado
import Comparison from "@/components/Comparison";
import Difference from "@/components/Difference";
import FAQ from "@/components/FAQ-improved"; // Componente mejorado
import Header from "@/components/Header-improved"; // Componente mejorado
import Learn from "@/components/Learn";
import Selection from "@/components/Selection";
import Slider from "@/components/Slider";
import Tokens from "@/components/Tokens-improved"; // Componente mejorado
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
          {/* Componentes mejorados con Shadcn/UI */}
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
