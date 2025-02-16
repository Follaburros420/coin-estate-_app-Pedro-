/* eslint-disable @next/next/no-img-element */
import React from 'react';
import StyledImage from './StyedImage';
import clsxm from '@/utils/clsxm';
import { useQueryGetActiveResults, useQueryGetTokenPercentage } from '@/hooks/query';
import { SourceUrl } from '@/hooks/queryContants';
const ASSETS = [
  {
    id: 1,
    img: '/assets/images/asset1.png',
    location: '/assets/svg2/location.svg',
    about: 'Terry Lane, Golden CO 80403',
    flag: '/assets/svg2/flag.svg',
    price: '1$',
    token: '70',
    income: '$ 776.99',
  },
  {
    id: 2,
    img: '/assets/images/asset2.png',
    location: '/assets/svg2/location.svg',
    about: 'Yule Street, Arvada CO 80007',
    flag: '/assets/svg2/flag.svg',
    price: '1$',
    token: '30',
    income: '$ 567.99',
  },
  {
    id: 3,
    img: '/assets/images/asset3.png',
    location: '/assets/svg2/location.svg',
    about: 'Alice Court, Annapolis MD 21401',
    flag: '/assets/svg2/flag.svg',
    price: '1$',
    token: '60',
    income: '$ 543.99',
  },
  {
    id: 4,
    img: '/assets/images/asset4.png',
    location: '/assets/svg2/location.svg',
    about: 'Doane Street, Fremont CA 94538',
    flag: '/assets/svg2/flag.svg',
    price: '1$',
    token: '40',
    income: '$ 453.99',
  },
];

export default function Assets() {
  const { data: userData } = useQueryGetActiveResults();
  const { data: getTokenCalculation } = useQueryGetTokenPercentage();

  console.log({ userData, getTokenCalculation });

  return (
    <div className='px-6 md:px-12 '>
      <div className='max-w-[1161px] mx-auto w-full mt-10 lg:mt-0 '>
        <p className='text-26 md:text-32 text-center md:text-start font-ubuntu font-medium text-Yellow-100'>
          My Assets
        </p>

        <div className='w-full overflow-x-auto hide-scrollbar '>
          <div className='border min-w-[1000px] border-grey-400 mt-4 p-6 rounded-[26px]'>
            <table className='table-fixed w-full '>
              <thead className='text-16 md:text-20 font-regular w-full'>
                <tr className=' '>
                  <th className='text-start '>Projects</th>
                  <th>Address</th>
                  <th>Token price</th>
                  <th className='text-Yellow-100 '>Your Tokens</th>
                  <th> Monthly Income</th>
                </tr>
              </thead>
              <tbody style={{ marginTop: '20px' }} className='w-full '>
                {userData?.userProperties?.map((items, idx) => {
                  return (
                    <tr
                      key={`${items.id}____${idx}`}
                      className={clsxm('text-center', idx === 3 ? '' : 'border-b border-b-lightGray-500 ')}>
                      <td className='py-6 '>
                        <img
                          src={SourceUrl + items.image}
                          alt=''
                          className='h-[50px]  md:h-[100px] w-[50px]  md:w-[100px] '
                        />
                      </td>
                      <td className=' '>
                        <div className='flex items-center justify-between w-full gap-2 '>
                          <img src={'/assets/svg2/location.svg'} alt='' className='w-[9px] h-3' />
                          <p className='text-grey-600 font-inter truncate text-12 font-regular '>{items.location}</p>
                          <img src={'/assets/svg2/flag.svg'} alt='' className='w-[22px] h-[23px]' />
                        </div>
                      </td>

                      <td className='text-grey-700 w-full text-12 md:text-16 font-regular'>
                        {getTokenCalculation?.[items?.id]?.totalPrice}
                      </td>
                      <td className='text-grey-700 text-12 md:text-16 font-regular'>
                        {getTokenCalculation?.[items?.id]?.purchased}
                      </td>
                      <td className='text-darkCyan text-12 md:text-16 font-regular'>
                        {getTokenCalculation?.[items?.id]?.earned.toFixed(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
