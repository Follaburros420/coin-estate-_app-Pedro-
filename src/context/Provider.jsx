import { useQueryGetUser } from '@/hooks/query';
import { routerPaths } from '@/utils/helper';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { bscTestnet, polygonAmoy } from '@reown/appkit/networks';
import { cookieStorage, createStorage } from '@wagmi/core';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  console.log('Project ID is not defined');
}

export const networks = [bscTestnet, polygonAmoy];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export default function AuthProvider() {
  const router = useRouter();
  const pathName = usePathname();
  const name = pathName?.split('/')?.[1];
  const url = window.location.href;
  const urlParams = new URLSearchParams(url);
  const callbackUrl = urlParams.get('callbackUrl');
  const { data: user, isPending, refetch, isSuccess } = useQueryGetUser();

  useEffect(() => {
    const handleRoute = async () => {
      if (name) {
        if (!user?.email && routerPaths?.includes(name)) {
          router.push('/auth/log-in');
        } else if (user?.email) {
          router.push(`${url}`);
        }
      } else {
        router.push(`${url}`);
      }
    };
    if (isSuccess) {
      setTimeout(() => handleRoute(), 1000);
    }
  }, [user?.address, name, isSuccess]);

  const openWhatsApp = () => {
    window.open('https://wa.me/573118867074', '_blank');
  };

  return (
    <div>
      {isPending && <p className='absolute inset-0 flex justify-center items-center'>Loading...</p>}
      <button
        onClick={() => openWhatsApp()}
        className='fixed  right-6 shadow-lg bottom-6 z-20 bg-green rounded-lg w-8 h-8 sm:w-16 sm:h-16 p-2 '>
        <img src='/assets/svg/whatsapp.svg' alt='' className='w-full' />
      </button>
    </div>
  );
}
