import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGlobalStates } from '@/store/useStore';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RealEstateSimulator = () => {
  const simulator = useGlobalStates((state) => state.simulator);

  // Format numbers for display (Indian format)
  const formatNumber = (num) =>
    new Intl.NumberFormat('en-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  // const simulate = () => {
  //   const investmentYears = 30;
  //   const monthlyAppreciationRate = Math.pow(1 + annualAppreciationRate / 100, 1 / 12) - 1;

  //   let propertyValue = initialCapital;
  //   let reinvestedCapital = 0;
  //   let accumulatedRentNoReinvestment = 0;
  //   let yearlyData = [];

  //   let currentMonthlyRent = 800;

  //   for (let y = 1; y <= investmentYears; y++) {
  //     let yearIncome = 0;
  //     for (let m = 1; m <= 12; m++) {
  //       propertyValue *= 1 + monthlyAppreciationRate;

  //       if (compound) {
  //         reinvestedCapital += currentMonthlyRent;
  //         reinvestedCapital *= 1 + monthlyAppreciationRate;
  //       }
  //       accumulatedRentNoReinvestment += currentMonthlyRent;
  //       yearIncome += currentMonthlyRent;
  //       currentMonthlyRent *= 1 + monthlyAppreciationRate;
  //     }

  //     yearlyData.push({
  //       year: y,
  //       propertyValue,
  //       totalRentNoCompound: accumulatedRentNoReinvestment,
  //       reinvestedCapital,
  //       annualIncome: yearIncome,
  //     });
  //   }

  //   const summaryYears = [5, 10, 20, 30];
  //   const summaryData = summaryYears.map((year) => {
  //     const data = yearlyData[year - 1];
  //     if (!data) return null;

  //     const appreciation = data.propertyValue - initialCapital;
  //     let effectiveTotalCapital = compound
  //       ? data.propertyValue + data.reinvestedCapital
  //       : data.propertyValue + data.totalRentNoCompound;
  //     const totalReturnPercent = ((effectiveTotalCapital - initialCapital) / initialCapital) * 100;
  //     const returnRate = (appreciation / initialCapital) * 100;
  //     const accumulatedProfit = effectiveTotalCapital - initialCapital;

  //     return {
  //       year,
  //       annualIncome: formatNumber(data.annualIncome),
  //       appreciation: formatNumber(appreciation),
  //       totalReturnPercent: formatNumber(totalReturnPercent),
  //       returnRate: formatNumber(returnRate),
  //       accumulatedProfit: formatNumber(accumulatedProfit),
  //     };
  //   });

  //   setResults({
  //     yearlyData,
  //     summaryData,
  //     finalPropertyValue: propertyValue,
  //     reinvestedCapital,
  //     accumulatedRentNoReinvestment,
  //   });
  //   setChartData({
  //     labels: yearlyData.map((d) => `Year ${d.year}`),
  //     datasets: [
  //       {
  //         label: 'Property Value',
  //         data: yearlyData.map((d) => d.propertyValue),
  //         backgroundColor: 'rgba(75, 192, 75, 0.6)',
  //       },
  //       {
  //         label: 'Accumulated Rent (no reinvestment)',
  //         data: yearlyData.map((d) => d.totalRentNoCompound),
  //         backgroundColor: 'rgba(54, 162, 235, 0.6)',
  //       },
  //       {
  //         label: 'Reinvested Capital (if compound)',
  //         data: yearlyData.map((d) => d.reinvestedCapital),
  //         backgroundColor: 'rgba(255, 159, 64, 0.6)',
  //       },
  //     ],
  //   });
  // };

  return (
    <div className='py-6 bg-gray-100 min-h-screen'>
      {simulator?.results && (
        <>
          <p className='text-20  text-center md:text-start font-bold '>Projections</p>
          <div className='mt-6'>
            {/* <h2 className='text-xl font-bold'>Simulation Results (30 Years)</h2>
          <p>
            <strong>Final Property Value:</strong> USD {formatNumber(simulator?.results.finalPropertyValue)}
          </p>

          {compound ? (
            <p>
              <strong>Reinvested Capital (Compound):</strong> USD {formatNumber(simulator?.results.reinvestedCapital)}
            </p>
          ) : (
            <p>
              <strong>Total Rent (No Reinvestment):</strong> USD {formatNumber(simulator?.results.accumulatedRentNoReinvestment)}
            </p>
          )} */}

            {/* Summary Table */}
            <h3 className='text-lg font-bold mt-4 '>Summary Table (Years 5, 10, 20, 30)</h3>
            <div className='max-w-[1200px] overflow-auto'>

            <table className='w-full  border-collapse border border-yellow mt-2 rounded-lg '>
              <thead>
                <tr className='glass'>
                  <th className='border border-yellow p-2'>Year</th>
                  <th className='border border-yellow p-2'>Annual Income (USD)</th>
                  <th className='border border-yellow p-2'>Appreciation (USD)</th>
                  <th className='border border-yellow p-2'>Total Return (%)</th>
                  <th className='border border-yellow p-2'>Return Rate (%)</th>
                  <th className='border border-yellow p-2'>Accumulated Profit (USD)</th>
                </tr>
              </thead>
              <tbody>
                {simulator?.results.summaryData.map((row, idx) => (
                  <tr key={idx} className='border'>
                    <td className='border p-2'>{row.year}</td>
                    <td className='border p-2'>{row.annualIncome}</td>
                    <td className='border p-2'>{row.appreciation}</td>
                    <td className='border p-2'>{row.totalReturnPercent}</td>
                    <td className='border p-2'>{row.returnRate}</td>
                    <td className='border p-2'>{row.accumulatedProfit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
                </div>

            {/* Chart */}
            <div className='mt-4'>
              {simulator?.chartData && <Bar data={simulator?.chartData} options={{ responsive: true }} />}
            </div>
            {/* <div className="mt-6">
            <Bar data={{
              labels: results.yearlyData.map((d) => `Year ${d.year}`),
              datasets: [{ label: "Property Value", data: results.yearlyData.map((d) => d.propertyValue), backgroundColor: "blue" }]
            }} />
          </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default RealEstateSimulator;
