import { useQueryGetUser } from '@/hooks/query';
import { useRouter } from 'next/router';
import React from 'react';

export default function RegisterBottomBanner() {
  const router = useRouter();
  const { data: user } = useQueryGetUser();
  if (!user?.email)
    return (
      <div className='px-6 md:px-10 '>
        <div className=' bg-black-100 my-[100px] rounded-[8px] w-full max-w-[1161px] mx-auto'>
          <div className='p-8 md:p-16 flex flex-col items-center gap-5 sm:flex-row text-center sm:text-start justify-between  '>
            <h1 className='font-semibold md:text-28 font-inter text-white'>
              Accede Con <span className='text-yellow'>CoinEstate</span> al futuro de la inversión inmobiliaria
            </h1>
            <button
              onClick={() => {
                router.push('/auth/create-account');
              }}
              className='py-3 px-8 mt-4 md:mt-0 bg-yellow font-inter font-semibold text-12 sm:text-16 text-white rounded-full'>
              Regístrate
            </button>
          </div>
        </div>
      </div>
    );
}
