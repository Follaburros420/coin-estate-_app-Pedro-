'use client';
import InfoTooltip from '@/components/InfoIcon';
import { useQueryGetTokenCopPrice } from '@/hooks/query';
import { useGlobalStates } from '@/store/useStore';
import { formatNumberIndianStyle } from '@/utils/wagmiConfig';
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

export default function Simulator({ nft }) {
  console.log({nft})
  const [value, setValue] = useState(10);
  const [reinvest, setReinvest] = useState(false);
  const { data: tokenPrice } = useQueryGetTokenCopPrice();
  const setSimulator = useGlobalStates((state) => state.setSimulator);

  // Update the value as the user swipes
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  let calculation = tokenPrice * value;
  calculation = calculation.toFixed(2);
  calculation = Number(calculation);
  calculation = formatNumberIndianStyle(calculation);

  const handleSimulate = () => {
    const investmentYears = 30;
    const initialCapital = value;
    const annualAppreciationRate = nft?.expectedIncome;
    const annualNetRent = initialCapital * annualAppreciationRate / 100;
    const monthlyRent = annualNetRent / 12;

    console.log({ annualAppreciationRate, annualNetRent, initialCapital,monthlyRent });
    // console.log({ annualNetRent,monthlyRent });
    const monthlyAppreciationRate = Math.pow(1 + annualAppreciationRate / 100, 1 / 12) - 1;

    let propertyValue = initialCapital;
    let reinvestedCapital = 0;
    let accumulatedRentNoReinvestment = 0;
    let yearlyData = [];

    let currentMonthlyRent = monthlyRent;

    for (let y = 1; y <= investmentYears; y++) {
      let yearIncome = 0;
      for (let m = 1; m <= 12; m++) {
        propertyValue *= 1 + monthlyAppreciationRate;

        if (reinvest) {
          reinvestedCapital += currentMonthlyRent;
          reinvestedCapital *= 1 + monthlyAppreciationRate;
        }
        accumulatedRentNoReinvestment += currentMonthlyRent;
        yearIncome += currentMonthlyRent;
        currentMonthlyRent *= 1 + monthlyAppreciationRate;
      }

      yearlyData.push({
        year: y,
        propertyValue,
        totalRentNoCompound: accumulatedRentNoReinvestment,
        reinvestedCapital,
        annualIncome: yearIncome,
      });
    }

    const summaryYears = [5, 10, 20, 30];
    const summaryData = summaryYears.map((year) => {
      const data = yearlyData[year - 1];
      if (!data) return null;

      const appreciation = data.propertyValue - initialCapital;
      let effectiveTotalCapital = reinvest
        ? data.propertyValue + data.reinvestedCapital
        : data.propertyValue + data.totalRentNoCompound;
      const totalReturnPercent = ((effectiveTotalCapital - initialCapital) / initialCapital) * 100;
      const returnRate = (appreciation / initialCapital) * 100;
      const accumulatedProfit = effectiveTotalCapital - initialCapital;

      return {
        year,
        annualIncome: formatNumberIndianStyle(data.annualIncome),
        appreciation: formatNumberIndianStyle(appreciation),
        totalReturnPercent: formatNumberIndianStyle(totalReturnPercent),
        returnRate: formatNumberIndianStyle(returnRate),
        accumulatedProfit: formatNumberIndianStyle(accumulatedProfit),
      };
    });

    const results = {
      yearlyData,
      summaryData,
      finalPropertyValue: propertyValue,
      reinvestedCapital,
      accumulatedRentNoReinvestment,
    };
    const chartData = {
      labels: yearlyData.map((d) => `Year ${d.year}`),
      datasets: [
        {
          label: 'Property Value',
          data: yearlyData.map((d) => d.propertyValue),
          backgroundColor: 'rgba(75, 192, 75, 0.6)',
        },
        {
          label: 'Accumulated Rent (no reinvestment)',
          data: yearlyData.map((d) => d.totalRentNoCompound),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          label: 'Reinvested Capital (if compound)',
          data: yearlyData.map((d) => d.reinvestedCapital),
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
      ],
    };

    setSimulator({ chartData, results, compound: reinvest });
    console.log({ chartData, results, compound: reinvest });
  };

  return (
    <div className='w-full mt-6  '>
      <div className='border border-base-800 glass rounded-[8px] p-5 w-full '>
        <p className='text-20 sm:text-24 font-bold text-center '>Simulator</p>
        <div>
          <p className='text-14 sm:text-16 font-medium font-ubuntu text-center mt-2 '>Current Exchange Rate </p>
          <p className='text-14 sm:text-16 font-ubuntu text-center mb-5 '>
            1 USD= {formatNumberIndianStyle(tokenPrice)} COP
          </p>
          <p className=' font-medium font-ubuntu '>How many tokens would you buy.</p>
        </div>
        <div className='w-full mt-7 '>
          <input
            type='range'
            min='10'
            max='1000'
            value={value}
            onChange={handleChange}
            className='w-full h-1 bg-Yellow-300 rounded-lg appearance-none cursor-pointer accent-indigo-500 range-slider'
          />
          <div className='flex items-center justify-between  '>
            <div
              style={{ backgroundImage: `url(/assets/svg/RangeBg.svg)` }}
              className='font-medium bg-contain bg-no-repeat w-12 h-10 flex items-center  justify-center '>
              <p className='font-ubuntu font-medium mt-2 '>{value}</p>
            </div>
            <p className='font-ubuntu font-medium '>1000</p>
          </div>
        </div>
        <div className='grid grid-cols-2 mt-7 '>
          <div className=''>
            <p className='font-medium font-ubuntu glass p-2 border border-gray'>Cop</p>
            <p className='font-medium font-ubuntu p-2 border border-gray'>USD</p>
          </div>
          <div>
            <p className='font-medium font-ubuntu glass p-2 border border-gray'>{calculation}</p>
            <p className='font-medium font-ubuntu p-2 border border-gray '>{value * nft?.tokenPrice}</p>
          </div>
        </div>

        <div className='sm:text-20 font-medium font-ubuntu text-center mt-5 '>
          <div class='flex gap-2 justify-start font-bold text-14 '>
            <input
              id='compoundCheck'
              type='checkbox'
              checked={reinvest}
              onChange={() => setReinvest(!reinvest)}
              className='w-5 h-5 border-2 border-yellow bg-transparent rounded ring-1 focus:ring-0 focus:outline-none'
            />
            <label for='compoundCheck'>Want to Re-Invest Monthly?</label> <InfoTooltip message={'Al reinvertir tus ganancias mensualmente, aprovechas el interés compuesto para maximizar tu rentabilidad a largo plazo. Sin embargo, las cifras mostradas son proyecciones y pueden no reflejar la realidad, ya que están sujetas a cambios en las condiciones de mercado y otros factores externos.'} />
          </div>
          <button
            onClick={() => handleSimulate()}
            className='bg-yellow text-black-100 w-full rounded-lg p-2 font-bold mt-4'>
            Simulate
          </button>
        </div>
      </div>
    </div>
  );
}
