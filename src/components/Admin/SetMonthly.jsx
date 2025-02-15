import { useMutationMonthlyProcess } from '@/hooks/mutation';
import { useQueryGetUser } from '@/hooks/query';
import React, { useState } from 'react';

export default function MonthlyInvestment({ setOpenModel, openModel }) {
  console.log('🚀 ~ MonthlyInvestment ~ openModel:', openModel);
  const [inputValue, setInputValue] = useState('');
  const { mutate: mutateTokenPrice, isPending: isLoading } = useMutationMonthlyProcess();
  const { data: user } = useQueryGetUser();

  return (
    <div className='fixed inset-0 z-10 glass flex items-center justify-center'>
      <div className='w-full max-w-[400px] rounded-lg p-10 bg-black-900'>
        <p className='font-bold text-center mb-6 text-20'>Monthly Percentage</p>
        <input
          type='number'
          name='amount'
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter...'
          className='w-full p-2 rounded-sm text-black-100'
        />
        <div className='grid grid-cols-2 gap-3'>
          <button
            onClick={() => setOpenModel(false)}
            className='bg-yellow w-full mt-2 rounded-md text-black-100 py-2 font-bold'>
            Close
          </button>
          <button
            onClick={() => {
              console.log({ inputValue, openModel });

              if (inputValue) {
                const allValues = {
                  name: openModel?.name,
                  tokenId: openModel?.id,
                  percentage: openModel?.percentage || 2,
                  price: Number(inputValue),
                  address: user?.address,
                  tokenAddress: openModel?.tokenAddress,
                };
                console.log({ allValues });
                mutateTokenPrice(allValues);
              }
            }}
            className='bg-yellow w-full mt-2 rounded-md text-black-100 py-2 font-bold'>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
