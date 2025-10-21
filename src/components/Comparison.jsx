/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import StyledImage from './StyedImage';
import {
  CoinEstate_Table_Data,
  Dashboards_Table_Header_Data,
} from '@/_mock/data';

const COLUMN_COLOR_KEYS = [
  'titleColorOne',
  'titleColorOne',
  'titleColorOne',
  'titleColorOne',
  'titleColorOne',
  'titleColorTwo',
  'titleColorTwo',
  'titleColorThree',
];

const ICON_KEYS = [
  'imgUrlOne',
  'imgUrlTwo',
  'imgUrlThree',
  'imgUrlFour',
  'imgUrlFive',
  'imgUrlSix',
  'imgUrlSeven',
  'imgUrlEight',
];

export default function Comparison() {
  return (
    <section className='px-6 py-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto max-w-3xl text-center'>
          <span className='inline-flex items-center justify-center gap-2 rounded-full bg-yellow/15 px-4 py-1 text-12 font-semibold uppercase tracking-[0.24em] text-yellow/80 dark:bg-yellow/10'>
            Benchmark
          </span>
          <h2 className='mt-4 text-28 font-extrabold leading-tight text-black-100 dark:text-white lg:text-36'>
            CoinEstate vs. otras alternativas de inversión
          </h2>
          <p className='mt-4 text-16 leading-7 text-black-100/70 dark:text-white/70'>
            Compara características clave y descubre cómo nuestra propuesta combina liquidez, riesgo controlado y activos tangibles.
          </p>
        </div>
        <div className='mt-12 overflow-hidden rounded-[32px] border border-gray-200/60 bg-white shadow-[0_45px_120px_-60px_rgba(15,23,42,0.45)] dark:border-gray-700/60 dark:bg-black-900/60'>
          <div className='overflow-x-auto'>
            <table className='min-w-[880px] w-full text-left'>
              <thead className='bg-black-100 text-white'>
                <tr>
                  {Dashboards_Table_Header_Data.map((item, idx) => (
                    <th key={idx} scope='col' className='px-4 py-4 text-center text-12 font-semibold uppercase tracking-wide'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10'>
                          <StyledImage src={item.imgUrl} className='h-5 w-5' imgClassName='object-contain' />
                        </div>
                        <span className='text-12 font-medium text-white/80'>{item.title}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200/50 text-14 text-black-100/80 dark:divide-gray-700/60 dark:text-white/80'>
                {CoinEstate_Table_Data.map((item, rowIndex) => (
                  <tr key={item.id} className='transition hover:bg-yellow/10 dark:hover:bg-yellow/20'>
                    <th scope='row' className='px-4 py-4 text-left text-14 font-semibold text-black-100 dark:text-white'>
                      {item.titleOne}
                    </th>
                    {Array.from({ length: 8 }).map((_, colIndex) => {
                      const value = [
                        item.titleTwo,
                        item.titleThree,
                        item.titleFour,
                        item.titleFive,
                        item.titleSix,
                        item.titleSeven,
                        item.titleEight,
                        item.titleNine,
                      ][colIndex];

                      const icon = item[ICON_KEYS[colIndex]];

                      let colorKey = COLUMN_COLOR_KEYS[colIndex];
                      if (colIndex === 7) {
                        colorKey = rowIndex === 0 ? 'titleColorOne' : COLUMN_COLOR_KEYS[colIndex];
                      }

                      const color = item[colorKey] || (colIndex >= 5 ? '#ef4444' : '#0f172a');

                      return (
                        <td key={`${item.id}-${colIndex}`} className='px-4 py-4 text-center'>
                          {value ? (
                            <span style={{ color, fontWeight: 600 }}>{value}</span>
                          ) : icon ? (
                            <StyledImage src={icon} className='mx-auto h-5 w-5' imgClassName='object-contain' />
                          ) : (
                            <span className='text-black-100/40 dark:text-white/40'>—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
