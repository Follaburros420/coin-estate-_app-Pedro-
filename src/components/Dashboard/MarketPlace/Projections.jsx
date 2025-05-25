// import StyledImage from "@/components/StyedImage";
// import React from "react";

// export default function Projections() {
//   const tableData = [
//     { year: 2024, propertyValue: 100000, annualReturn: 6000, accumulatedRent: 6000, totalValue: 106000 },
//     { year: 2025, propertyValue: 103000, annualReturn: 6180, accumulatedRent: 12180, totalValue: 115180 },
//     { year: 2026, propertyValue: 106090, annualReturn: 6365, accumulatedRent: 18545, totalValue: 124635 },
//     { year: 2027, propertyValue: 109273, annualReturn: 6556, accumulatedRent: 25101, totalValue: 134374 },
//     { year: 2028, propertyValue: 112551, annualReturn: 6753, accumulatedRent: 31854, totalValue: 144405 }
//   ];
//   return (
//     <div className="font-ubuntu mt-6 md:mt-10 ">
//       <div className="overflow-x-auto">
//         {/* <table className="w-full border-collapse">
//           <tbody>
//             <tr className="border-b border-base-800">
//               <th className="p-3 text-left font-bold border border-base-800 bg-Yellow-100 text-black-100 w-1/4">Initial Investment</th>
//               <td className="p-3 border border-base-800">$100,000</td>
//             </tr>
//             <tr className="border-b border-base-800">
//               <th className="p-3 text-left font-bold border border-base-800 bg-Yellow-100 text-black-100 w-1/4">Annual Return Rate</th>
//               <td className="p-3 border border-base-800">6%</td>
//             </tr>
//             <tr className="border-b border-base-800">
//               <th className="p-3 text-left font-bold border border-base-800 bg-Yellow-100 text-black-100 w-1/4">Property Appreciation</th>
//               <td className="p-3 border border-base-800">3% per year</td>
//             </tr>
//             <tr className="border-b border-base-800">
//               <th className="p-3 text-left font-bold border border-base-800 bg-Yellow-100 text-black-100 w-1/4">Investment Period</th>
//               <td className="p-3 border border-base-800">5 years</td>
//             </tr>
//             <tr className="border-b border-base-800">
//               <th className="p-3 text-left font-bold border border-base-800 bg-Yellow-100 text-black-100 w-1/4">Total Expected Return</th>
//               <td className="p-3 border border-base-800">$44,405</td>
//             </tr>
//           </tbody>
//         </table> */}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-Yellow-100 text-black-100">
//               <th className="p-3 text-left font-bold border border-base-800">Year</th>
//               <th className="p-3 text-left font-bold border border-base-800">Property Value</th>
//               <th className="p-3 text-left font-bold border border-base-800">Annual Return</th>
//               <th className="p-3 text-left font-bold border border-base-800">Accumulated Rent</th>
//               <th className="p-3 text-left font-bold border border-base-800">Total Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((entry, index) => (
//               <tr key={index} className="border-b border-base-800 hover:bg-base-800/20">
//                 <td className="p-3 border border-base-800">{entry.year}</td>
//                 <td className="p-3 border border-base-800">${entry.propertyValue.toLocaleString()}</td>
//                 <td className="p-3 border border-base-800">${entry.annualReturn.toLocaleString()}</td>
//                 <td className="p-3 border border-base-800">${entry.accumulatedRent.toLocaleString()}</td>
//                 <td className="p-3 border border-base-800">${entry.totalValue.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useGlobalStates } from '@/store/useStore';
import React from 'react';

// Utility function to calculate compound interest
const calculateCompoundInterest = (principal, rate, years) => {
  return principal * Math.pow(1 + rate, years);
};

const RealEstateProjection = ({ nft }) => {

  const simulator = useGlobalStates((state) => state.simulator);

  const years = [0, 1, 2, 3, 4, 5, 6];
  const initialValue = 100000; // Example initial value
  const annualRate = 0.06; // 6% annual rate

  // Calculate property values using compound interest
  // const propertyValues =  || [];

  const projectionData = {
    "Ingresos alquiler": [simulator?.projectsOnInterest?.rentalIncome,simulator?.projectsOnInterest?.rentalIncome,simulator?.projectsOnInterest?.rentalIncome,simulator?.projectsOnInterest?.rentalIncome,simulator?.projectsOnInterest?.rentalIncome,simulator?.projectsOnInterest?.rentalIncome],
    "Ganancias valorización": simulator?.projectsOnInterest?.earning,
    "Total Ganancia año": simulator?.projectsOnInterest?.totalOfYear,
    "Total en CoinEstate": simulator?.projectsOnInterest?.totalCoinEstate,
    "Tasa de retorno ROI": simulator?.projectsOnInterest?.rateOfReturn,
    "Ganancia acumulada": simulator?.projectsOnInterest?.accumulatedGain,
  };

  return (
    <div className="text-white bg-black p-4 space-y-8">
      {/* Table 1 */}
      <div>
        <h2 className="text-yellow-400 text-lg font-bold mb-2">Valor esperado del inmueble en el tiempo</h2>
        <table className="w-full text-center border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 py-2">Año</th>
              {years.map((year) => (
                <th key={year} className="border border-gray-700 py-2 text-yellow-400">{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 py-2 font-mono">Valor del inmueble</td>
              {simulator?.PropertyValueWithTime?.map((value, index) => (
                <td key={index} className="border border-gray-700 py-2 font-mono">${value.toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table 2 */}
      <div>
        <h2 className="text-yellow-400 text-lg font-bold mb-2">Proyecciones con interés simple</h2>
        <table className="w-full text-center border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 py-2">Año</th>
              {[1, 2, 3, 4, 5, 6].map((year) => (
                <th key={year} className="border border-gray-700 py-2 text-yellow-400">{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object?.entries(projectionData).map(([label, values]) => (
              <tr key={label}>
                <td className="border border-gray-700 py-2">{label}</td>
                {values?.map((val, idx) => (
                  <td key={idx} className="border border-gray-700 py-2">{Number(val)?.toFixed(2)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RealEstateProjection;

