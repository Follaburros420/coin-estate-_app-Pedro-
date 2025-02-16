// import { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// // import { Card, CardContent } from "@/components/ui/card";
// http://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR
// https://min-api.cryptocompare.com/data/blockchain/histo/day?fsym=USD
// export default function ExchangeRateGraph() {
//   const [data, setData] = useState([]);
//   const [latestRate, setLatestRate] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // https://v6.exchangerate-api.com/v6/06d5eb34217e56efbf17063c/latest/USD
//         const response = await fetch("https://v6.exchangerate-api.com/v6/06d5eb34217e56efbf17063c/latest/USD");
//         const result = await response.json();
//         const copRate = result.conversion_rates.COP;

//         setLatestRate(copRate);

//         setData((prevData) => {
//           const newData = [...prevData, { time: new Date().toLocaleTimeString(), cop: copRate }];
//           return newData.slice(-50); // Keep only the last 50 entries
//         });
//       } catch (error) {
//         console.error("Error fetching exchange rate:", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000); // Update every 5 seconds

//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className="p-4">
//       <div>
//         <h2 className="text-xl font-bold mb-4">USD to COP Exchange Rate</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="cop" stroke="#8884d8" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Highcharts, { theme } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const ExchangeRateChart = () => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('1M'); // Default range is 1 Month

  // Function to fetch USD to COP exchange rate
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/06d5eb34217e56efbf17063c/latest/USD`);
      const json = await response.json();
      const rate = json.conversion_rates.COP;
      const timestamp = new Date().getTime();
      setData((prevData) => [...prevData, [timestamp, rate]]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  // Fetch data every 5 seconds (for live updates)
  useEffect(() => {
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRangeData = () => {
    const now = new Date().getTime();
    const ranges = {
      '1D': 24 * 60 * 60 * 1000,
      '7D': 7 * 24 * 60 * 60 * 1000,
      '1M': 30 * 24 * 60 * 60 * 1000,
      '3M': 90 * 24 * 60 * 60 * 1000,
      '6M': 180 * 24 * 60 * 60 * 1000,
      '1Y': 365 * 24 * 60 * 60 * 1000,
      ALL: Infinity,
    };
    return data?.filter(([timestamp]) => now - timestamp <= ranges[range]);
  };

  const options = {
    chart: {
      zoomType: 'x',
      theme: 'dark',
    },
    title: {
      text: 'Live USD to COP Exchange Rate',
    },
    rangeSelector: {
      selected: 2,
      buttons: [
        { type: 'day', count: 1, text: '1D', events: { click: () => setRange('1D') } },
        { type: 'week', count: 1, text: '7D', events: { click: () => setRange('7D') } },
        { type: 'month', count: 1, text: '1M', events: { click: () => setRange('1M') } },
        { type: 'month', count: 3, text: '3M', events: { click: () => setRange('3M') } },
        { type: 'month', count: 6, text: '6M', events: { click: () => setRange('6M') } },
        { type: 'year', count: 1, text: '1Y', events: { click: () => setRange('1Y') } },
        { type: 'all', text: 'ALL', events: { click: () => setRange('ALL') } },
      ],
    },
    series: [
      {
        name: 'USD/COP',
        data: getRangeData(),
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} constructorType='stockChart' options={options} />;
};

export default ExchangeRateChart;
