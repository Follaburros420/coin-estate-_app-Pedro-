import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dummyLabels = [1, 2, 3, 4, 5, 6];
const dummyTotalGainSimple = [10000000, 12000000, 14000000, 16000000, 18000000, 20000000];
const dummyTotalGainCompound = [10000000, 13000000, 17000000, 22000000, 28000000, 35000000];
const dummyTotalCEstateSimple = [11000000, 13000000, 15000000, 17000000, 19000000, 21000000];
const dummyTotalCEstateCompound = [11000000, 14000000, 18000000, 23000000, 29000000, 36000000];

const ProjectionGraph = ({
  labels = [],
  totalGainSimple = [],
  totalGainCompound = [],
  totalCEstateSimple = [],
  totalCEstateCompound = [],
}) => {
  // Use dummy data if props are empty or not arrays of length >= 2
  const useDummy =
    !Array.isArray(labels) || labels.length < 2 ||
    !Array.isArray(totalGainSimple) || totalGainSimple.length < 2 ||
    !Array.isArray(totalGainCompound) || totalGainCompound.length < 2 ||
    !Array.isArray(totalCEstateSimple) || totalCEstateSimple.length < 2 ||
    !Array.isArray(totalCEstateCompound) || totalCEstateCompound.length < 2;

  const data = {
    labels: useDummy ? dummyLabels : labels,
    datasets: [
      {
        label: '1. Total Ganancia anual Interés Simple',
        data: useDummy ? dummyTotalGainSimple : totalGainSimple,
        borderColor: '#FFD600',
        backgroundColor: '#FFD600',
        pointBackgroundColor: '#FFD600',
        pointBorderColor: '#FFD600',
        tension: 0.3,
        fill: false,
      },
      {
        label: '2. Total Ganancia anual Interés Compuesto',
        data: useDummy ? dummyTotalGainCompound : totalGainCompound,
        borderColor: '#fff',
        backgroundColor: '#fff',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fff',
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
      },
      {
        label: '3. Total en CE Interés Simple',
        data: useDummy ? dummyTotalCEstateSimple : totalCEstateSimple,
        borderColor: '#FFD600',
        backgroundColor: '#FFD600',
        pointBackgroundColor: '#FFD600',
        pointBorderColor: '#FFD600',
        borderDash: [2, 2],
        tension: 0.3,
        fill: false,
      },
      {
        label: '4. Total en CE Interés Compuesto',
        data: useDummy ? dummyTotalCEstateCompound : totalCEstateCompound,
        borderColor: '#fff',
        backgroundColor: '#fff',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fff',
        borderDash: [8, 4],
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Proyección de Ganancias en CoinEstate\nInterés Simple vs. Interés Compuesto',
        color: '#fff',
        font: { size: 18, weight: 'bold' },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Periodo (años)',
          color: '#fff',
          font: { size: 14 },
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        title: {
          display: true,
          text: 'Valor (COP)',
          color: '#fff',
          font: { size: 14 },
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <div className="bg-black rounded-lg p-4 mt-8 w-full" style={{ height: 500 }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProjectionGraph; 