// import { Wallet_Investments_Data } from "@/_mock/data";
// import StyledImage from "@/components/StyedImage";
// import React from "react";

// export default function WalletInvestments() {
//   return (
//     <div className="p-4 2xl:p-6 w-full border h-full border-grey-400 rounded-[26px] flex flex-col justify-between ">
//       <div className="w-full ">
//         <div className="flex items-center justify-between  ">
//           <p className="text-20 sm:text-22 font-semibold ">Your Investments</p>
//           <StyledImage src="/assets/svg/DescDots.svg" className="w-6 h-6 " />
//         </div>
//         <div className="flex items-center gap-1 w-full justify-end mt-4 ">
//           <div className="p-1 rounded-full bg-pink " />
//           <p className="text-14 ">Totals in CoinEstate</p>
//         </div>
//       </div>
//       <div>
//         <StyledImage
//           src="/assets/images/InvestmentsGraph.png"
//           className="w-full max-w-[364px] mx-auto h-[191px] mt-auto  "
//         />
//         <div className="grid sm:grid-cols-2 gap-3 mt-5 ">
//           {Wallet_Investments_Data.map((item, idx) => {
//             return (
//               <div
//                 key={idx}
//                 className="w-full bg-black-700 rounded-[8px] px-3 py-2 "
//               >
//                 <div className="flex items-center justify-between ">
//                   <p className="text-grey-1000 text-14  ">{item.title}</p>
//                   <p className="text-14 ">{item.percentage}</p>
//                 </div>
//                 <p className=" text-32 font-medium ">{item.value}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphComponent = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const processData = () => {
      return data.map((item) => ({
        date: new Date(item.createdAt).toLocaleString(),
        amount: item.amount,
      }));
    };

    setChartData(processData());
  }, [data]);

  return (
    <div>
      <h2>Payment Amounts Over Time</h2>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='amount' stroke='#8884d8' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function App({ data }) {
  return data?.length > 0 && <GraphComponent data={data} />;
}
