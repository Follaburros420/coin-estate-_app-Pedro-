import ConnectWallet from '@/components/ConnectWallet';
import ProfileMenu from '@/components/ProfileUser';
import StyledImage from '@/components/StyedImage';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar({ toggleSidebar }) {
  const location = usePathname();
  const paths = {
    '/dashboard/dashboard-wallet': 'Wallet',
    '/dashboard/my-properties': 'My Properties',
    '/dashboard/market-place': 'Marketplace',
    adminWallet: 'Wallet',
  };
  const router = useRouter();
  return (
    <div className='bg-black-500 lg:px-11 px-4 py-5 fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-28 shadow-lg border-b border-black-600'>
      <button onClick={() => router.push('/')}>
        <StyledImage src={'/assets/svg/LogoLight.svg'} className='w-[157px] h-9 ' />
      </button>
      <div className='w-full max-w-[83%] ml-auto hidden lg:flex items-center justify-between gap-10'>
        <p className='text-24 font-ubuntu font-medium leading-none text-white h-[50px] w-full pt-4 '>
          {paths[location]}
        </p>
        <ProfileMenu />
        <ConnectWallet />
      </div>

      <button onClick={toggleSidebar} className='lg:hidden block bg-black-600 p-1 rounded-[8px] '>
        <StyledImage src='/assets/svg/Menu.svg' className='w-6 h-6 ' />
      </button>
    </div>
  );
}
