import { useQueryGetUser } from '@/hooks/query';
import { routerPaths } from '@/utils/helper';
import { QueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, bscTestnet, polygonAmoy } from '@reown/appkit/networks'
import { cookieStorage, createStorage, http } from '@wagmi/core'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
   console.log('Project ID is not defined')
}

export const networks = [bscTestnet, polygonAmoy]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export default function AuthProvider() {
  const router = useRouter();
  const pathName = usePathname();
  const name = pathName?.split('/')?.[1]
  const { data: user, isPending, refetch } = useQueryGetUser();

  useEffect(() => {
    refetch()
    if (!user?.email && !isPending && routerPaths?.includes(name)) {
      router.push('/')
    }
  }, [pathName, user?.email])

  // return (
  //   <div>
  //     {isPending && <p className='absolute inset-0 flex justify-center items-center bg-red-300'>Loading...</p>}
  //   </div>
  // )
}
