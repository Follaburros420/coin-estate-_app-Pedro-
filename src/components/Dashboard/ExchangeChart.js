// import React, { useState, useEffect } from "react";
// import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";

// const ExchangeRateChart = ({ data }) => {
//   const [filteredData, setFilteredData] = useState(data);
//   const [range, setRange] = useState("ALL");

//   // Function to filter data based on range
//   const filterData = (range) => {
//     const now = new Date().getTime();
//     const ranges = {
//       "1D": 24 * 60 * 60 * 1000,
//       "1W": 7 * 24 * 60 * 60 * 1000,
//       "1M": 30 * 24 * 60 * 60 * 1000,
//       "1Y": 365 * 24 * 60 * 60 * 1000,
//       ALL: Infinity,
//     };

//     const newData = data.filter(({ timestamp }) => now - timestamp <= ranges[range]);
//     setFilteredData(newData);
//     setRange(range);
//   };

//   // Update chart when data changes
//   useEffect(() => {
//     filterData(range);
//   }, [data]);

//   // Highcharts options
//   const options = {
//     chart: { zoomType: "x" },
//     title: { text: "USD to COP Exchange Rate" },
//     xAxis: { type: "datetime" },
//     yAxis: { title: { text: "Exchange Rate (COP)" } },
//     series: [
//       {
//         name: "USD/COP",
//         data: filteredData.map(({ timestamp, cop }) => [timestamp, cop]),
//         tooltip: { valueDecimals: 2 },
//       },
//     ],
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">USD to COP Exchange Rate Chart</h2>

//       {/* Filter Buttons */}
//       <div className="mb-4 space-x-2">
//         {["1D", "1W", "1M", "1Y", "ALL"].map((r) => (
//           <button
//             key={r}
//             className={`px-4 py-2 rounded-md ${range === r ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//             onClick={() => filterData(r)}
//           >
//             {r}
//           </button>
//         ))}
//       </div>

//       {/* Highcharts Graph */}
//       <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={options} />
//     </div>
//   );
// };

// export default ExchangeRateChart;
import { useMutationSendExchangeRate } from '@/hooks/mutation';
import { useQueryGetTokenCopPrice } from '@/hooks/query';
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
  const [data, setData] = useState([]);
  // const values = useAutoUpdateExchangeRate();
  const { data: copRate } = useQueryGetTokenCopPrice();
  const { mutate: sendData } = useMutationSendExchangeRate();

  console.log('🚀 ~ ExchangeRateChart ~ data:', copRate);
  const [filter, setFilter] = useState('1D');

  // Use Query to fetch data every 5 seconds
  const { data: newRate } = useQuery({
    queryKey: ['exchangeRate'],
    queryFn: fetchExchangeRate,
    refetchInterval: 5000, // Fetch every 5 seconds
  });

  // Store API data in state
  useEffect(() => {
    if (newRate) {
      setData((prev) => [...prev, newRate].slice(-100)); // Keep last 100 records
    }
  }, [newRate]);

  // Filter Data by Time Range
  const getFilteredData = () => {
    const now = Date.now();
    const timeRanges = {
      '1D': 24 * 60 * 60 * 1000,
      '1W': 7 * 24 * 60 * 60 * 1000,
      '1M': 30 * 24 * 60 * 60 * 1000,
      '1Y': 365 * 24 * 60 * 60 * 1000,
    };
    return data.filter((d) => now - d.timestamp <= timeRanges[filter]);
  };

  return (
    <div className='p-4'>
      <button onClick={() => sendData({ value: copRate, time: Date.now() })}>Click to send</button>
      <h2 className='text-xl font-bold mb-4'>USD to COP Exchange Rate</h2>

      {/* Filter Buttons */}
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
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={getFilteredData()}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='timestamp'
            tickFormatter={(time) => new Date(time).toLocaleTimeString('en-US', { hour12: false })}
          />
          <YAxis />
          <Tooltip labelFormatter={(time) => new Date(time).toLocaleString()} />
          <Line type='monotone' dataKey='cop' stroke='#8884d8' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
