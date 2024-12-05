'use client'
import { useQueryGetUser } from '@/hooks/query';
import { routerPaths } from '@/utils/helper';
import { QueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


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
