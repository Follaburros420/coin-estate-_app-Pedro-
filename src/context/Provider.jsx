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

  const { data: user, isPending, refetch, isSuccess } = useQueryGetUser();

  useEffect(() => {
    const handleRoute = async () => {
      if (name) {
        if (!user?.email && routerPaths?.includes(name)) {
          router.push('/auth/log-in');
        } else {
          router.push(pathName);
        }
      }
    };
    if (isSuccess) {
      setTimeout(() => handleRoute(), 1000);
    }
  }, [user?.address, name]);

  return (
    <div>{isPending && <p className='absolute inset-0 flex justify-center items-center'>Loading...</p>}</div>
  );
}
