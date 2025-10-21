import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-full w-full bg-gradient-to-br from-black-500 via-black-600 to-black-800 min-h-screen text-white relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffc82c15,transparent_60%)] opacity-60" />
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-yellow/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-white/5 blur-[140px] animate-pulse" style={{animationDelay: '2s'}} />
      </div>
      
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="relative z-10">
        <div className="flex lg:gap-5 w-full h-full pt-28">
          <div className="hidden xl:block lg:w-full xl:max-w-[292px]">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          </div>
          <div className="w-full lx:ml-[242px] lg:max-w-[1161px] mx-auto h-full animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
