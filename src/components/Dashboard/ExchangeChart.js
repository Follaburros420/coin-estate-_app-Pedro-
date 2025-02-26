// // import React, { useState, useEffect } from "react";
// // import Highcharts from "highcharts/highstock";
// // import HighchartsReact from "highcharts-react-official";

// // const ExchangeRateChart = ({ data }) => {
// //   const [filteredData, setFilteredData] = useState(data);
// //   const [range, setRange] = useState("ALL");

// //   // Function to filter data based on range
// //   const filterData = (range) => {
// //     const now = new Date().getTime();
// //     const ranges = {
// //       "1D": 24 * 60 * 60 * 1000,
// //       "1W": 7 * 24 * 60 * 60 * 1000,
// //       "1M": 30 * 24 * 60 * 60 * 1000,
// //       "1Y": 365 * 24 * 60 * 60 * 1000,
// //       ALL: Infinity,
// //     };

// //     const newData = data.filter(({ timestamp }) => now - timestamp <= ranges[range]);
// //     setFilteredData(newData);
// //     setRange(range);
// //   };

// //   // Update chart when data changes
// //   useEffect(() => {
// //     filterData(range);
// //   }, [data]);

// //   // Highcharts options
// //   const options = {
// //     chart: { zoomType: "x" },
// //     title: { text: "USD to COP Exchange Rate" },
// //     xAxis: { type: "datetime" },
// //     yAxis: { title: { text: "Exchange Rate (COP)" } },
// //     series: [
// //       {
// //         name: "USD/COP",
// //         data: filteredData.map(({ timestamp, cop }) => [timestamp, cop]),
// //         tooltip: { valueDecimals: 2 },
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-xl font-bold mb-4">USD to COP Exchange Rate Chart</h2>

// //       {/* Filter Buttons */}
// //       <div className="mb-4 space-x-2">
// //         {["1D", "1W", "1M", "1Y", "ALL"].map((r) => (
// //           <button
// //             key={r}
// //             className={`px-4 py-2 rounded-md ${range === r ? "bg-blue-500 text-white" : "bg-gray-200"}`}
// //             onClick={() => filterData(r)}
// //           >
// //             {r}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Highcharts Graph */}
// //       <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={options} />
// //     </div>
// //   );
// // };

// // export default ExchangeRateChart;
import { useMutationSendExchangeRate } from '@/hooks/mutation';
import { useQueryGetExchangeList, useQueryGetTokenCopPrice } from '@/hooks/query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Fetch USD to COP exchange rate
const fetchExchangeRate = async () => {
  const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=COP');
  return { timestamp: Date.now(), cop: response.data.COP };
};

export default function ExchangeRateChart() {
  // const values = useAutoUpdateExchangeRate();
  const { data: dataList } = useQueryGetExchangeList();
  // const [data, setData] = useState([]);
  const { data: copRate } = useQueryGetTokenCopPrice();
  const { mutate: sendData } = useMutationSendExchangeRate();
  useEffect(() => {
    if (copRate) {
      sendData({ value: copRate });
    }
  }, [copRate]); // Runs every time `copRate` updates (every 5 sec)

  const [filter, setFilter] = useState('1D');

  // Use Query to fetch data every 5 seconds
  // const { data: newRate } = useQuery({
  //   queryKey: ['exchangeRate'],
  //   queryFn: fetchExchangeRate,
  //   refetchInterval: 5000, // Fetch every 5 seconds
  // });

  // // Store API data in state
  // useEffect(() => {
  //   if (newRate) {
  //     setData((prev) => [...prev, newRate].slice(-100)); // Keep last 100 records
  //   }
  // }, [newRate]);

  const formattedData = dataList?.map((item) => ({
    ...item,
    date: new Date(Number(item?.timestamp)).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    }),
  }));
  // Filter Data by Time Range
  const getFilteredData = () => {
    const timeRanges = {
      '1D': 24 * 60 * 60 * 1000,
      '1W': 7 * 24 * 60 * 60 * 1000,
      '1M': 30 * 24 * 60 * 60 * 1000,
      '1Y': 365 * 24 * 60 * 60 * 1000,
    };

    const currentTime = Date.now(); // Get current timestamp
    const selectedRange = timeRanges[filter]; // Get range in milliseconds

    return formattedData?.filter((d) => currentTime - Number(d.timestamp) <= selectedRange) || [];
  };

  return (
    <div className='p-4 md:p-0'>
      {/* <button onClick={() => sendData({ value: copRate })}>Click to send</button> */}
      <h2 className='text-xl font-bold mb-4'>USD to COP Exchange Rate</h2>

      {/* Filter Buttons */}
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
        <div className='mb-4 flex gap-2'>
          {['1D', '1W', '1M', '1Y'].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 rounded ${filter === range ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => setFilter(range)}>
              {range}
            </button>
          ))}
        </div>

        {/* Chart */}
        <ResponsiveContainer width='100%' height={350}>
          <LineChart data={getFilteredData()}>
            <CartesianGrid strokeDasharray='3 3' stroke='#333' />
            <XAxis dataKey='date' tick={{ fill: '#fff' }} />
            <YAxis
              tick={{ fill: '#fff' }}
              domain={[4000, 4400]} // Y-axis range
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type='monotone' dataKey='cop' stroke='#ffc96b' strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// const rawData = [
//   {
//     id: '67b311d9403f6f6aa460cc06',
//     timestamp: 1739788761989,
//     cop: 4087,
//   },
//   {
//     id: '67b311e0403f6f6aa460cc07',
//     timestamp: 1739788768258,
//     cop: 4087,
//   },
//   {
//     id: '67b31207403f6f6aa460cc08',
//     timestamp: 1739788807627,
//     cop: 4087,
//   },
//   {
//     id: '67b3121e403f6f6aa460cc09',
//     timestamp: 1739788830449,
//     cop: 4087,
//   },
//   {
//     id: '67b31253403f6f6aa460cc0a',
//     timestamp: 1739788883804,
//     cop: 4087,
//   },
//   {
//     id: '67b3125b403f6f6aa460cc0b',
//     timestamp: 1739788891988,
//     cop: 4087,
//   },
// ];

// Convert timestamps to a readable format
// const formattedData = rawData.map((item) => ({
//   ...item,
//   date: new Date(item.timestamp).toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//   }),
// }));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1e1e1e',
          color: '#fff',
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ffc96b',
        }}>
        <p>{`${label}`}</p>
        <p style={{ fontWeight: 'bold' }}>{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// const StyledChart = () => {
//   return (
//     <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
//       <ResponsiveContainer width='100%' height={300}>
//         <LineChart data={formattedData}>
//           <CartesianGrid strokeDasharray='3 3' stroke='#333' />
//           <XAxis dataKey='date' tick={{ fill: '#fff' }} />
//           <YAxis
//             tick={{ fill: '#fff' }}
//             domain={[4000, 4400]} // Y-axis range
//             tickCount={5}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Line type='monotone' dataKey='cop' stroke='#ff6b6b' strokeWidth={2} dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default StyledChart;
