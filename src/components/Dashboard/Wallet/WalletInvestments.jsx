import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphComponent = ({ data }) => {
  let value = 0;
  const sumOfRecent1 = data?.map((item) => {
    if (item.status === "SECCESS") return { amount: (value += item?.amount), date: item?.createdAt };
  });
  const sumOfRecent = sumOfRecent1?.filter((item) => item?.date);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const processData = () => {
      return sumOfRecent.map((item) => ({
        date: new Date(item?.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
        amount: item?.amount,
      }));
    };

    setChartData(processData());
  }, [data]);

  return (
    <>
      <h2 className='text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>Payment Amounts Over Time</h2>

      <div className='glass-enhanced-dark p-5 rounded-[16px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)]'>
        <ResponsiveContainer width='100%' height={410}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='rgba(255,255,255,0.1)' />
            <XAxis dataKey='date' tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Line type='monotone' dataKey='amount' stroke='#ffc96b' strokeWidth={3} dot={{ fill: '#ffc96b', strokeWidth: 2, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default function App({ data }) {
  return data?.length > 0 && <GraphComponent data={data} />;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='glass-enhanced-dark p-3 rounded-[8px] border border-yellow/30 shadow-[0_8px_25px_-5px_rgba(255,200,44,0.3)] backdrop-blur-xl'>
        <p className='text-white font-medium'>{`${label}`}</p>
        <p className='text-yellow-300 font-bold'>{`$${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
