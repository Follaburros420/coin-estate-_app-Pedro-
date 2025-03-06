import { useQueryGetActiveResults, useQueryGetUser } from '@/hooks/query';
import { SourceUrl } from '@/hooks/queryContants';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';
import { formatNumberIndianStyle } from '@/utils/wagmiConfig';

export default function AboutProperties({ getPropertyList, isDark }) {
  const router = useRouter();
  const { data: userData } = useQueryGetActiveResults();
  const { data: getUser } = useQueryGetUser();
  console.log('🚀 ~ AboutProperties ~ getUser:', getUser);

  return (
    <div className='mt-16 max-w-[1161px] mx-auto w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {getPropertyList?.map((items, idx) => {
          const mainImage = SourceUrl + items?.image;
          const remaining = userData?.values?.filter((item) => item.propertyId === items?.id)?.[0];
          let remainingTokens = items?.totalInvestmentPrice - remaining?.remaining;
          remainingTokens = remainingTokens / items?.tokenPrice;
          return (
            <div
              key={`${items?.id}___${idx}`}
              onClick={() =>
                getUser?.address ? router.push(`/dashboard/market-place/${items.id}`) : router.push(`/auth/log-in`)
              }
              className={clsxm(
                'max-w-[371px]  p-2 mx-auto cursor-pointer lg:mx-0  rounded-[8px] ',
                isDark ? 'glass' : 'border border-grayTwo',
              )}>
              <div className='relative'>
                <div className='h-[247px] w-full'>
                  <img src={mainImage} alt='' className='h-full object-cover rounded-[8px] w-full' />
                </div>
                <div className='flex justify-between'>
                  <button className='absolute top-4 right-4 py-1.5 px-4 bg-black-100 rounded-full text-12 font-inter font-semibold text-white '>
                    {items.propertyType}
                  </button>
                </div>
              </div>
              <div className='p-4'>
                <div className='flex justify-between items-center'>
                  <h5 className='text-16 text-yellow font-inter font-semibold '>{items.name}</h5>
                </div>
                <div className='mt-2 rounded-full'>
                  <ProgressBar
                    totalValue={items?.totalInvestmentPrice / items?.tokenPrice}
                    value={remaining?.remaining / items?.tokenPrice}
                  />
                </div>
                <div className='flex justify-between'>
                  <div className='mt-3 flex gap-6 items-center'>
                    <div>
                      <p className='text-14 font-inter  font-regular text-grey-100'>Token Price</p>
                      <p className='text-14 font-inter  mt-1 font-semibold '>{items?.tokenPrice}</p>
                    </div>
                  </div>
                  <hr className=' border border-r-1 mt-4 h-[44px] border-grey-100' />
                  <div className='mt-3 flex gap-6 items-center'>
                    <div>
                      <p className='text-14 font-inter  font-regular text-grey-100'>Total Price</p>
                      <p className='text-14 font-inter  mt-1 font-semibold text-end '>{items.totalInvestmentPrice}</p>
                    </div>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='mt-4 flex gap-6 items-center'>
                    <div>
                      <p className='text-14 font-inter  font-regular text-grey-100'>Expected Income</p>
                      <p className='text-14 font-inter  mt-1 font-semibold '>{items.expectedIncome}%</p>
                    </div>
                  </div>

                  <div className='mt-3 flex gap-6 items-center'>
                    <div>
                      <p className='text-14 font-inter  font-regular text-grey-100'>Expected ROI</p>
                      <p className='text-14 font-inter  mt-1 font-semibold text-end '>{items.roiExpected}% </p>
                    </div>
                  </div>
                </div>
                <p className='mt-4 font-inter text-14 text-end font-semibold '>
                  Tokens Disponibles:{' '}
                  <span className='text-yellow  font-regular'>
                    {formatNumberIndianStyle(Number(remainingTokens.toFixed(2))) || 0}{' '}
                  </span>{' '}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
