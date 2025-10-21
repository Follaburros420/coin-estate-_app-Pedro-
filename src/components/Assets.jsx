/* eslint-disable @next/next/no-img-element */
import { useQueryGetActiveResults } from '@/hooks/query';
import { SourceUrl } from '@/hooks/queryContants';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/navigation';

export default function Assets() {
  const router = useRouter();
  const { data: userData } = useQueryGetActiveResults();

  if(userData?.userProperties?.length > 0)
  return (
    <div className='px-6 md:px-12 mt-10'>
      <div className='max-w-[1161px] mx-auto w-full mt-10 lg:mt-0'>
        <p className='text-26 md:text-32 text-center md:text-start font-ubuntu font-medium bg-gradient-to-r from-Yellow-100 to-yellow-300 bg-clip-text text-transparent'>
          My Assets
        </p>

        <div className='w-full overflow-x-auto hide-scrollbar'>
          <div className='glass-enhanced-dark min-w-[1000px] border border-white/10 mt-4 p-6 rounded-[12px] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)]'>
            <table className='table-fixed w-full'>
              <thead className='text-16 font-regular w-full'>
                <tr>
                  <th className='text-start transition-colors duration-300 hover:text-yellow-300'>Projects</th>
                  <th className='transition-colors duration-300 hover:text-yellow-300'>Address</th>
                  <th className='transition-colors duration-300 hover:text-yellow-300'>Token price</th>
                  <th className='text-Yellow-100 transition-colors duration-300 hover:text-yellow-300'>Your Tokens</th>
                  <th className='transition-colors duration-300 hover:text-yellow-300'>Monthly Income</th>
                </tr>
              </thead>
              <tbody style={{ marginTop: '20px' }} className='w-full'>
                {userData?.userProperties?.map((items, idx) => {
                  const userTokens = userData?.invest?.payments.filter(
                    (amount) => amount?.propertyId === items?.id,
                  )?.[0]?.numberOfTokens;
                  return (
                    <tr
                      onClick={() => router.push(`/dashboard/market-place/${items?.id}`)}
                      key={`${items.id}____${idx}`}
                      className={clsxm(
                        'group text-center cursor-pointer transition-all duration-300 hover:bg-white/5 hover:scale-105',
                        idx === userData?.userProperties?.length - 1 ? '' : 'border-b border-b-white/10',
                      )}>
                      <td className='py-6'>
                        <img
                          src={SourceUrl + items.image}
                          alt=''
                          className='h-[50px] md:h-[100px] w-[50px] rounded-lg md:w-[100px] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg'
                        />
                      </td>
                      <td>
                        <div className='flex items-center justify-between w-full gap-2'>
                          <img src={'/assets/svg2/location.svg'} alt='' className='w-[9px] h-3 transition-all duration-300 group-hover:scale-110' />
                          <span className='transition-colors duration-300 group-hover:text-yellow-300'>{items.id}</span>
                          <img src={'/assets/svg2/flag.svg'} alt='' className='w-[22px] h-[23px] transition-all duration-300 group-hover:scale-110' />
                        </div>
                      </td>
                      <td className='text-grey-700 w-full text-12 md:text-16 font-regular transition-colors duration-300 group-hover:text-yellow-300'>{items?.tokenPrice}</td>
                      <td className='text-grey-700 text-12 md:text-16 font-regular transition-colors duration-300 group-hover:text-yellow-300'>
                        {userData?.userRecords?.[items?.id]?.totalTokens}
                      </td>
                      <td className='text-darkCyan text-12 md:text-16 font-regular transition-colors duration-300 group-hover:text-green-300'>
                        {userData?.userRecords?.[items?.id]?.earning?.toFixed(2) || 0}
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
