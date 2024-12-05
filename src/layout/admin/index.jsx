import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-full w-full bg-[#121315] min-h-screen text-white ">
      <Navbar toggleSidebar={toggleSidebar} />
      <div>
        <div className="flex lg:gap-5 w-full h-full pt-28 ">
          <div className="lg:w-full lg:max-w-[292px]">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          </div>
          <div className="w-full lg:max-w-[1361px] mx-auto lg:ml-auto h-full ">
            {children}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
