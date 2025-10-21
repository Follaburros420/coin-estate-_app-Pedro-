import InfoTooltip from '@/components/InfoIcon';
import UserProfile from '@/components/ProfileUser';
import StyledImage from '@/components/StyedImage';
import { useQueryGetActiveResults } from '@/hooks/query';
import { formatNumberIndianStyle } from '@/utils/wagmiConfig';
import { Button, Tooltip } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar({ toggleSidebar }) {
  const { data: userData } = useQueryGetActiveResults();
  const location = usePathname();
  const paths = {
    '/dashboard/dashboard-wallet': 'Wallet',
    '/dashboard/my-properties': 'My Properties',
    '/dashboard/market-place': 'Marketplace',
    adminWallet: 'Wallet',
  };
  const router = useRouter();
  return (
    <div className='glass-enhanced-dark lg:px-11 px-4 py-3 fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-28 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border-b border-white/10 backdrop-blur-xl transition-all duration-300'>
      <button 
        onClick={() => router.push('/')}
        className="group flex items-center gap-2 transition-all duration-300 hover:scale-105"
      >
        <StyledImage src={'/assets/svg/LogoLight.svg'} className='w-[157px] h-9 transition-all duration-300 group-hover:brightness-110' />
      </button>
      <div className='w-full max-w-[83%] ml-auto hidden lg:flex items-center justify-between gap-10'>
        <div className='hidden lg:flex items-center gap-4 sm:gap-7 w-full justify-end'>
          <div className='group bg-gradient-to-r from-black-600 to-black-700 py-3 px-4 rounded-[12px] w-full max-w-[183px] flex items-center justify-between border border-white/10 transition-all duration-300 hover:border-yellow/30 hover:shadow-[0_8px_25px_-5px_rgba(255,200,44,0.2)]'>
            <div className='flex items-center gap-3 w-full'>
              <div className='bg-gradient-to-br from-yellow/20 to-yellow/30 w-full max-w-9 h-9 flex items-center justify-center rounded-[8px] p-1 transition-all duration-300 group-hover:scale-110'>
                <StyledImage src='/assets/svg/Token.svg' className='w-9 h-9 transition-all duration-300 group-hover:brightness-110' />
              </div>
              <p className="font-semibold transition-colors duration-300 group-hover:text-yellow-300">{formatNumberIndianStyle(userData?.totalInvest)}</p>
            </div>
            <InfoTooltip
              message={'Saldo total. Esto es todo lo que tienes en CoinEstate: fondos líquidos + valor de tus tokens.'}
            />
          </div>
          <div className='group bg-gradient-to-r from-black-600 to-black-700 py-3 px-4 rounded-[12px] w-full max-w-[183px] flex items-center justify-between border border-white/10 transition-all duration-300 hover:border-yellow/30 hover:shadow-[0_8px_25px_-5px_rgba(255,200,44,0.2)]'>
            <div className='flex items-center gap-3 w-full'>
              <div className='bg-gradient-to-br from-green/20 to-green/30 w-full max-w-9 h-9 flex items-center justify-center rounded-[8px] p-1 transition-all duration-300 group-hover:scale-110'>
                <StyledImage src='/assets/svg/Dollar.svg' className='w-9 h-9 transition-all duration-300 group-hover:brightness-110' />
              </div>
              <p className="font-semibold transition-colors duration-300 group-hover:text-green-300">{formatNumberIndianStyle(userData?.totalEarningFromAllProperties?.toFixed(2))}</p>
            </div>
            <InfoTooltip
              message={'Saldo disponible. Fondos líquidos listos para retirar o reinvertir (rentas y ventas).'}
            />
          </div>
        </div>
        <UserProfile balance={formatNumberIndianStyle(userData?.totalEarningFromAllProperties)} />
      </div>
      <button 
        onClick={toggleSidebar} 
        className='lg:hidden block bg-gradient-to-r from-black-600 to-black-700 p-2 rounded-[12px] border border-white/10 transition-all duration-300 hover:border-yellow/30 hover:scale-110'
      >
        <StyledImage src='/assets/svg/Menu.svg' className='w-6 h-6 transition-all duration-300' />
      </button>
    </div>
  );
}
