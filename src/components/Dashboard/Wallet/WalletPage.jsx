'use client';
import StyledImage from '@/components/StyedImage';
import { useQueryGetActiveResults, useQueryGetTokenCopPrice, useQueryGetUser } from '@/hooks/query';
import { baseScan, SourceUrl } from '@/hooks/queryContants';
import clsxm from '@/utils/clsxm';
import { conciseAddress, formatNumberIndianStyle } from '@/utils/wagmiConfig';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import ExchangeRateGraph from '../ExchangeChart';
import WalletCurrency from './WalletCurrency';
import WalletInvestments from './WalletInvestments';
import WalletTransactionHistory from './WalletTransactionHistory';
import InfoTooltip from '@/components/InfoIcon';

export const sumTokensByProperty = (transactions, userId) => {
  // Step 1: Filter transactions for the given userId
  const userTransactions = transactions?.filter(
    (transaction) => transaction.userId === userId && transaction.status !== 'PENDING',
  );

  // Step 2: Group by propertyId and sum numberOfTokens
  return userTransactions?.reduce((acc, transaction) => {
    const { propertyId, numberOfTokens } = transaction;

    if (!acc[propertyId]) {
      acc[propertyId] = 0;
    }

    acc[propertyId] += numberOfTokens;

    return acc;
  }, {});
};

export default function WalletPage() {
  const router = useRouter();
  const location = usePathname();
  const inputRef = useRef(null);
  const { data: userData } = useQueryGetActiveResults();
  const { data: user } = useQueryGetUser();

  const [data, setData] = useState([
    { timestamp: 1707206400000, cop: 4050 },
    { timestamp: 1707292800000, cop: 4075 },
    { timestamp: 1707379200000, cop: 4030 },
    { timestamp: 1707465600000, cop: 4090 },
  ]);
  const { data: tokenPrice } = useQueryGetTokenCopPrice();
  const total = userData?.totalInvest + userData?.totalEarningFromAllProperties;

  const summedTokens = sumTokensByProperty(userData?.invest?.payments, userData?.id);

  const annualNetIncome = userData?.userProperties?.map((item) => {
    const totalTokens = item.totalInvestmentPrice / item.tokenPrice;
    const noOFTokens = summedTokens?.[item?.id];
    return {
      id: item?.id,
      income: (item?.netAnualIncome / totalTokens) * noOFTokens,
    };
  });

  let totalNetIncome = 0;
  annualNetIncome?.map((item) => (totalNetIncome += item.income));

  const paths = {
    '/dashboard/admin-wallet': 'Wallet',
  };

  const Estimate_Balance_Data = [
    {
      id: 1,
      status: 'Available',
      price: formatNumberIndianStyle(userData?.totalEarningFromAllProperties) || 0,
      cop: formatNumberIndianStyle(userData?.totalEarningFromAllProperties * tokenPrice) || 0,
      message:
        'Dinero líquido generado por rentas mensuales o ventas de activos,listo para retirar o comprar más tokens.',
    },
    {
      id: 2,
      status: 'Total',
      price: formatNumberIndianStyle(total) || 0,
      cop: total * tokenPrice || 0,
      message:
        'Aquí ves todo lo que posees en CoinEstate: fondos líquidos + valor actual de tus tokens. A medida que los activos se valorizan, el valor de tus tokens crece. ',
    },
  ];
  const Estimate_Balance_Tokens_Data = [
    {
      id: 1,
      imgUrl: '/assets/svg/Dollar.svg',
      title: 'Invested in CoinEstate',
      availableTokens: formatNumberIndianStyle(userData?.totalInvest) + '$' || 0,
    },
    {
      id: 2,
      imgUrl: '/assets/svg/GoldenTokens.svg',
      title: 'Total of Tokens',
      availableTokens: formatNumberIndianStyle(userData?.totalTokens) || 0,
    },
    {
      id: 3,
      exclamationImg: '/assets/svg/exclamation.svg',
      imgUrl: '/assets/svg/RedGraph.svg',
      title: 'Approximate Annual Income',
      message:'Esto es lo que se estima que estarás ganando anualmente con tu inversión actual.',
      availableTokens: formatNumberIndianStyle(Number(totalNetIncome?.toFixed(2))) + '$',
    },
  ];
  return (
    <div className='max-w-[1161px] mx-auto px-6 lg:px-10  '>
      <p className='text-28 text-center -mt-5 font-ubuntu font-bold lg:hidden leading-none text-white w-full '>
        {paths[location]}
      </p>
      <div className='flex flex-col md:flex-row items-start w-full justify-between gap-6 xl:gap-10 mt-6'>
        <div className='w-full flex md:flex-col md:max-w-[200px] gap-6 items-center justify-center md:items-start md:justify-start mt-6 '>
          <div className={clsxm('bg-cover glass rounded-lg bg-no-repeat w-[90px] h-[90px] relative')}>
            <img
              src={user?.image ? SourceUrl + user?.image : '/assets/svg/AdminPic.svg'}
              className='w-full h-full'
              alt=''
            />
            <button
              onClick={() => router.push(`/profile/${userData?.id}`)}
              className='bg-grey-800 p-1 rounded-[8px] w-fit -mr-2 -mb-2 absolute bottom-0 right-0'>
              <StyledImage src='/assets/svg/Edit.svg' className='w-6 h-6 ' />
            </button>
          </div>
          <div>
            <div className='lg:mt-6 '>
              <p className='text-18 font-ubuntu font-medium leading-none '>{user?.username}</p>
              <p className='text-16 font-ubuntu font-medium text-grey-700 '>{conciseAddress(user?.email)}</p>
            </div>
            <div className='mt-1 lg:mt-4 '>
              <div className='flex items-center gap-2 '>
                <p className='text-18 font-medium font-ubuntu'>Blockchain Address</p>
                <InfoTooltip message={'Esta es tu dirección pública en la blockchain. Tu llave privada está resguardada con altos estándares de seguridad. Al hacer clic, se te redirigirá al escáner de la blockchain para que puedas revisar tu cuenta sobre la cadena.'} />
              </div>
              <div className='flex items-center gap-[6px] '>
                <Link
                  target='_blank'
                  href={baseScan + user?.address}
                  className='text-16 font-ubuntu font-medium text-grey-700 '>
                  {conciseAddress(user?.address)}
                </Link>

                <StyledImage src='/assets/svg/Blocks.svg' className='w-9 h-3 ' />
              </div>
            </div>
          </div>
        </div>
        <div className='glass-enhanced-dark border border-white/10 p-6 rounded-[26px] flex flex-col xl:flex-row gap-5 items-center justify-between w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_-5px_rgba(0,0,0,0.6)]'>
          <div className='w-full max-w-[60%]'>
            <div className='flex items-center justify-center xl:justify-start gap-4'>
              <p className='text-20 sm:text-29 font-bold leading-none bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>Estimate Balance</p>
              <StyledImage src='/assets/svg/WalletMoney.svg' className='w-6 h-6 transition-all duration-300 hover:scale-110' />
            </div>
            <div className='mt-7 flex flex-col sm:flex-row items-center gap-5 sm:gap-10'>
              <button className='group sm:text-20 py-3 px-8 sm:w-full bg-gradient-to-r from-Yellow-100 to-yellow-300 rounded-[12px] font-medium font-ubuntu text-black-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_-5px_rgba(255,200,44,0.4)] border border-yellow-200/30'>
                <span className='relative z-10'>Reinvest</span>
                <div className='absolute inset-0 rounded-[12px] bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </button>
              <button className='group sm:text-20 py-3 px-8 sm:w-full bg-gradient-to-r from-white to-gray-100 rounded-[12px] font-medium font-ubuntu text-black-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_-5px_rgba(255,255,255,0.3)] border border-white/30'>
                <span className='relative z-10'>Withdraw</span>
                <div className='absolute inset-0 rounded-[12px] bg-gradient-to-r from-gray-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </button>
            </div>
            <div className='mt-5'>
              {Estimate_Balance_Data.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={clsxm(
                      'group flex flex-col sm:flex-row items-center justify-between sm:gap-11 transition-all duration-300 hover:scale-105',
                      idx === 0 && 'mb-2',
                    )}>
                    <div className='flex items-center justify-between gap-3'>
                      <InfoTooltip message={item.message} />
                      <p className='text-20 font-bold transition-colors duration-300 group-hover:text-yellow-300'>{item.status}</p>
                    </div>
                    <div>
                      <div>
                        <p className='text-24 font-bold transition-colors duration-300 group-hover:text-yellow-300'>
                          {item.price}
                          <span className='text-22 font-regular ml-3 text-gray-300'>USD</span>
                        </p>
                      </div>
                      <p className='text-14 text-base-100 opacity-60 transition-opacity duration-300 group-hover:opacity-80'>= {formatNumberIndianStyle(item.cop)} COP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='grid sm:grid-cols-2 xl:grid-cols-1 items-center gap-5 mt-6 xl:mt-0'>
            {Estimate_Balance_Tokens_Data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className={clsxm(
                    'group bg-gradient-to-br from-black-600 to-black-700 rounded-[12px] min-h-[100px] p-4 xl:px-5 xl:py-6 w-full max-w-[254px] flex items-center gap-4 border border-white/10 transition-all duration-300 hover:scale-105 hover:border-yellow/30 hover:shadow-[0_8px_25px_-5px_rgba(255,200,44,0.2)]',
                    idx === 1 && 'xl:my-5',
                  )}>
                  <div className='bg-gradient-to-br from-yellow/20 to-yellow/30 p-2 rounded-[8px] w-fit transition-all duration-300 group-hover:scale-110'>
                    <StyledImage src={item.imgUrl} className='w-6 h-6 transition-all duration-300' />
                  </div>
                  <div>
                    <p className='text-16 leading-[18px] xl:leading-normal font-medium transition-colors duration-300 group-hover:text-yellow-300'>{item.title}</p>
                    <div className='flex items-center gap-2'>
                      {item.exclamationImg && (
                        <InfoTooltip
                          message={
                            'Dinero líquido generado por rentas mensuales o ventas de activos,listo para retirar o comprar más tokens.'
                          }
                        />
                      )}
                      <p className='text-base-100 opacity-60 text-14 transition-all duration-300 group-hover:opacity-100 group-hover:text-yellow-300'>{item.availableTokens}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <WalletCurrency
        total={formatNumberIndianStyle(total?.toFixed(2))}
        available={userData?.totalEarningFromAllProperties}
      />
      <div className='w-full grid grid-cols-1 xl:grid-cols-2 gap-5 2xl:gap-10 mt-6 lg:mt-12 '>
        <div className='xl:col-span-1 '>
          <WalletInvestments data={userData?.invest?.payments} />
        </div>
        <div className='xl:col-span-1 '>
          {/* <WalletCompartiment /> */}
          <ExchangeRateGraph data={data} />
        </div>
      </div>
      <WalletTransactionHistory />
    </div>
  );
}
