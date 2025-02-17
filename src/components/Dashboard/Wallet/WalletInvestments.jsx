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
