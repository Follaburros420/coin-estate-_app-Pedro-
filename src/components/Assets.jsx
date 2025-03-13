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
    <div className='px-6 md:px-12 mt-10 '>
      <div className='max-w-[1161px] mx-auto w-full mt-10 lg:mt-0 '>
        <p className='text-26 md:text-32 text-center md:text-start font-ubuntu font-medium text-Yellow-100'>
          My Assets
        </p>

        <div className='w-full overflow-x-auto hide-scrollbar  '>
          <div className='border min-w-[1000px] border-grey-400 mt-4 p-6 glass_css rounded-[8px]'>
            <table className='table-fixed w-full '>
              <thead className='text-16 font-regular w-full'>
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
                  const userTokens = userData?.invest?.payments.filter(
                    (amount) => amount?.propertyId === items?.id,
                  )?.[0]?.numberOfTokens;
                  return (
                    <tr
                      onClick={() => router.push(`/dashboard/market-place/${items?.id}`)}
                      key={`${items.id}____${idx}`}
                      className={clsxm(
                        'text-center cursor-pointer',
                        idx === userData?.userProperties?.length - 1 ? '' : 'border-b border-b-lightGray-500 ',
                      )}>
                      <td className='py-6 '>
                        <img
                          src={SourceUrl + items.image}
                          alt=''
                          className='h-[50px]  md:h-[100px] w-[50px] rounded-lg md:w-[100px] '
                        />
                      </td>
                      <td className=' '>
                        <div className='flex items-center justify-between w-full gap-2 '>
                          <img src={'/assets/svg2/location.svg'} alt='' className='w-[9px] h-3' />
                          {items.id}
                          <img src={'/assets/svg2/flag.svg'} alt='' className='w-[22px] h-[23px]' />
                        </div>
                      </td>

                      <td className='text-grey-700 w-full text-12 md:text-16 font-regular'>{items?.tokenPrice}</td>
                      <td className='text-grey-700 text-12 md:text-16 font-regular'>
                        {userData?.userRecords?.[items?.id]?.totalTokens}
                      </td>
                      <td className='text-darkCyan text-12 md:text-16 font-regular'>
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
