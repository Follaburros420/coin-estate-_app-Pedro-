"use client";
import { useState } from "react";
import BlockChainTab from "./BlockChainTab";
import FinancialTab from "./FinancialTab";
import ProjectionTab from "./ProjectionTab";

function Tabs({ selectedNFT, userData }) {
  const [activeTab, setActiveTab] = useState(0); // Manage active tab

  // Components corresponding to each tab
  const tabComponents = [
    {
      name: "Details & Projections",
      component: <ProjectionTab nft={selectedNFT} />
    },
    {
      name: "Blockchain",
      component: <BlockChainTab nft={selectedNFT} userData={userData} />
    },
    {
      name: "Financials",
      component: <FinancialTab nft={selectedNFT} />
    },

  ];

  return (
    <div className="w-full ">
      {/* Tab Buttons */}
      <div className="flex sm:space-x-4 border-b-[8px] border-base-1000 w-fit md:w-full md:max-w-[586px] xl:w-fit mx-auto xl:mx-0 mt-10 xl:-mt-14 ">
        {tabComponents.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-2 sm:px-4 focus:outline-none transition-colors duration-300 sm:text-24 font-medium ${activeTab === index
              ? "border-Yellow-300 border-b-[8px] -mb-2 sm:text-20 text-white  "
              : " text-base-900 "
              }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">{tabComponents[activeTab].component}</div>
    </div>
  );
}

export default Tabs;
