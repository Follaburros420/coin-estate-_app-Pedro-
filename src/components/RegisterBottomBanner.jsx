import { useQueryGetUser } from '@/hooks/query';
import { useRouter } from 'next/router';
import React from 'react';

export default function RegisterBottomBanner() {
  const router = useRouter();
  const { data: user } = useQueryGetUser();

  if (!user?.email)
    return (
      <div className='px-6 md:px-10'>
        <div className='my-[100px] w-full max-w-[1161px] rounded-[24px] bg-black-100 px-6 py-10 md:px-12 md:py-16'>
          <div className='flex flex-col items-center gap-6 text-center text-white sm:flex-row sm:text-left sm:justify-between'>
            <h2 className='max-w-xl text-24 font-semibold md:text-28'>
              Accede con <span className='text-yellow'>CoinEstate</span> al futuro de la inversión inmobiliaria
            </h2>
            <button
              onClick={() => {
                router.push('/auth/create-account');
              }}
              className='rounded-full bg-yellow px-8 py-3 text-14 font-semibold text-black-100 shadow-[0_20px_50px_-25px_rgba(255,200,44,0.6)] transition hover:bg-yellow/90'
              type='button'
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>
    );
}
