import { Wallet_Transaction_History_Data } from '@/_mock/data';
import StyledImage from '@/components/StyedImage';
import { useQueryGetActiveResults } from '@/hooks/query';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function WalletTransactionHistory() {
  const { data: userData, refetch } = useQueryGetActiveResults();
  const router = useRouter();

  return (
    <div className='w-full overflow-x-auto hide-scrollbar '>
      <div className='min-w-full w-[1000px] border border-grey-400 p-6 rounded-[26px] mt-6 lg:mt-12 '>
        <p className='text-29 font-bold '>Transaction History</p>
        <table border='1' className='text-left mt-8 w-full table-fixed  '>
          <thead>
            <tr className='  '>
              <th className='text-[26px] font-regular '>Funds Added</th>
              <th className='text-center text-[26px] font-regular  '>Date</th>
              <th className='text-center text-[26px] font-regular  '>Amount</th>
              <th className='text-center text-[26px] font-regular  '>Property Id</th>
              <th className='text-center text-[26px] font-regular  '>Transactions States</th>
            </tr>
          </thead>
          <tbody>
            {userData?.invest?.payments?.map((item, idx) => (
              <tr
                key={item.id}
                className={clsxm('text-center text-grey-600 ', idx === 1 && 'border-y border-[#817E7E] ')}>
                <td className='flex items-center gap-5 py-10 '>
                  <StyledImage src='/assets/svg/WalletMoneyGrey.svg' className='w-4 h-4 ' />
                  <p className='text-grey-600 text-16 '>Funds Added</p>
                </td>
                <td>
                  {new Date(item.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short', // "Jan", "Feb", etc.
                    day: '2-digit',
                    // hour: '2-digit',
                    // minute: '2-digit',
                    // second: '2-digit',
                    // hour12: true, // Use 12-hour format
                  })}
                </td>
                <td>{item.amount}</td>
                <td className='flex items-center justify-center gap-1 '>
                  <button onClick={() => router.push(`/dashboard/market-place/${item?.propertyId}`)}>
                    {item?.propertyId}
                  </button>
                </td>
                <td className='text-center '>
                  <p
                    style={
                      {
                        // backgroundColor: `${item.statusBg}`,
                        // color: `${item.statusTitleColor}`,
                      }
                    }
                    className={clsxm(
                      'w-fit text-center  flex items-center gap-2 rounded-[7px] mx-auto py-2 px-6 ',
                      item.status === 'SECCESS'
                        ? 'border border-green text-green'
                        : 'bg-red-100 text-red-100 border border-red-100',
                    )}>
                    <span
                      // style={{ backgroundColor: `${item.statusDot}` }}
                      className={clsxm(
                        'rounded-full w-[10px] h-[10px]',
                        item.status === 'SECCESS' ? 'bg-green' : 'bg-red-100',
                      )}
                    />
                    {item.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
