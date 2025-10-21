/* eslint-disable @next/next/no-img-element */
import { useQueryGetActiveResults, useQueryGetTokenCopPrice } from '@/hooks/query';
import { formatNumberIndianStyle } from '@/utils/wagmiConfig';
import { sumTokensByProperty } from './Dashboard/Wallet/WalletPage';
import GoogleMapComponent from './GoogleMap';

const locations = [
  { Latitude: 37.7749, Longitude: -122.4194 }, // San Francisco
  { Latitude: 34.0522, Longitude: -118.2437 }, // Los Angeles
  { Latitude: 40.7128, Longitude: -74.006 }, // New York
];
export default function Income() {
  const { data: tokenPrice } = useQueryGetTokenCopPrice();
  const { data: userData } = useQueryGetActiveResults();

  const summedTokens = sumTokensByProperty(userData?.invest?.payments, userData?.id);
  const tokensList = summedTokens && Object.values(summedTokens);

  let totalTokens = 0;
  tokensList?.map((item) => (totalTokens += item));

  const locationsList = userData?.userProperties
  ?.map((item) => {
    try {
      const coordinates = JSON.parse(item?.location); // Directly parse without template literals
      return {
        ...coordinates,
      };
    } catch (error) {
      console.error('Invalid JSON format:', item?.location);
      return null; // Return null or handle the error gracefully
    }
  })
  .filter(Boolean);
  console.log("🚀 ~ Income ~ locationsList:", locationsList)

  let tokenCOPPrice = userData?.totalInvest * tokenPrice;
  tokenCOPPrice = tokenCOPPrice?.toFixed(2);
  tokenCOPPrice = Number(tokenCOPPrice);

  let totalCOPEarning = userData?.totalEarningFromAllProperties * tokenPrice;
  totalCOPEarning = totalCOPEarning.toFixed(2);
  totalCOPEarning = Number(totalCOPEarning);

  return (
    <div className='max-w-[1161px] mx-auto w-full px-6 md:px-12'>
      <div className='grid md:grid-cols-2 gap-8'>
        <div className=''>
          <div className='glass-enhanced-dark border border-white/10 rounded-[26px] px-4 md:px-11 py-4 md:py-9 justify-center flex flex-col sm:flex-row items-center gap-8 md:gap-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)]'>
            <div className='group transition-all duration-300 hover:scale-105'>
              <p className='text-18 md:text-20 font-ubuntu font-medium transition-colors duration-300 group-hover:text-yellow-300'>Total Investment</p>
              <div className='mt-4 bg-gradient-to-r from-grey-500 to-grey-600 flex gap-5 items-center max-w-[200px] rounded-[12px] py-3 px-2 border border-white/10 transition-all duration-300 group-hover:border-yellow/30'>
                <p className='bg-gradient-to-r from-Yellow-100 to-yellow-300 font-bold text-black-100 leading-6 px-[8px] rounded-[8px] py-1 transition-all duration-300 group-hover:scale-110'>
                  {formatNumberIndianStyle(userData?.totalInvest)}
                </p>
                <p className='text-20 font-bold font-ubuntu transition-colors duration-300 group-hover:text-yellow-300'>USD</p>
              </div>
              <p className='mt-4 text-14 font-regular text-grayTwo transition-colors duration-300 group-hover:text-gray-300'>={formatNumberIndianStyle(tokenCOPPrice)} COP</p>
            </div>
            <div className='group transition-all duration-300 hover:scale-105'>
              <p className='text-18 md:text-20 font-ubuntu font-medium transition-colors duration-300 group-hover:text-yellow-300'>Monthly Income</p>
              <div className='mt-4 bg-gradient-to-r from-grey-500 to-grey-600 flex gap-5 items-center max-w-[200px] rounded-[12px] p-3 border border-white/10 transition-all duration-300 group-hover:border-green/30'>
                <p className='bg-gradient-to-r from-zink to-green-400 px-4 rounded-[8px] py-1 transition-all duration-300 group-hover:scale-110'>
                  {formatNumberIndianStyle(userData?.totalEarningFromAllProperties)}
                </p>
                <p className='text-20 font-bold font-ubuntu transition-colors duration-300 group-hover:text-green-300'>USD</p>
              </div>
              <p className='mt-4 text-14 font-regular text-grayTwo transition-colors duration-300 group-hover:text-gray-300'>
                ={formatNumberIndianStyle(totalCOPEarning) || 0} COP
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className='glass-enhanced-dark border border-white/10 rounded-[16px] p-5 mt-7 w-full lg:mt-0 overflow-hidden pt-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)]'>
            <div className='flex justify-between items-center'>
              <p className='font-semibold text-20 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>Map View</p>
            </div>
            <GoogleMapComponent coordinates={locationsList || []} />
          </div>
          <div className='max-w-[331px] w-full mx-auto flex items-center justify-between gap-5 mt-5'>
            <div className='flex flex-col items-center lg:items-end gap-3 text-20 justify-between transition-colors duration-300 hover:text-yellow-300'>
              <p>You invested</p>
              <p>in</p>
            </div>
            <div className='flex flex-col items-center lg:items-end gap-3 text-20 text-darkCyan font-semibold justify-between transition-colors duration-300 hover:text-yellow-300'>
              <p>{totalTokens || 0}</p>
              <p>{userData?.userProperties?.length}</p>
            </div>
            <div className='flex flex-col items-start gap-3 text-20 font-semibold justify-between transition-colors duration-300 hover:text-yellow-300'>
              <p className='text-Yellow-100'>Tokens</p>
              <p>Proyects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
