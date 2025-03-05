import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphComponent = ({ data }) => {
  let value = 0;
  const sumOfRecent = data.map((item) => {
    return { amount: (value += item?.amount), date: item?.createdAt };
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const processData = () => {
      return sumOfRecent.map((item) => ({
        date: new Date(item.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        }),
        amount: item.amount,
      }));
    };

    setChartData(processData());
  }, [data]);

  return (
    <>
      <h2 className='text-xl font-bold mb-4'>Payment Amounts Over Time</h2>

      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px' }}>
        <ResponsiveContainer width='100%' height={410}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#333' />
            <XAxis dataKey='date' tick={{ fill: '#fff' }} />
            <YAxis tick={{ fill: '#fff' }} />
            {/* <Tooltip /> */}
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Line type='monotone' dataKey='amount' stroke='#ffc96b' strokeWidth={2} dot={false} />
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
