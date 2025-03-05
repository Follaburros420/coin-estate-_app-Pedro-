import { useMutationMonthlyProcess } from '@/hooks/mutation';
import { useQueryGetUser } from '@/hooks/query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function MonthlyInvestment({ setOpenModel, openModel, refetchList }) {
  const [inputValue, setInputValue] = useState(null);
  const [percentage, setPercentage] = useState(null);

  const onSuccess = () => {
    setOpenModel(null);
    refetchList()
  };
  const { mutate: mutateTokenPrice, isPending: isLoading } = useMutationMonthlyProcess(onSuccess);
  const { data: user } = useQueryGetUser();

  return (
    <div className='fixed inset-0 z-10 glass flex items-center justify-center'>
      <div className='w-full max-w-[400px] rounded-lg p-10 bg-black-900'>
        <p className='font-bold text-center mb-6 text-20'>Monthly Percentage</p>
        <label htmlFor="">Amount</label>
        <input
          type='number'
          name='amount'
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter...'
          className='w-full p-2 rounded-sm text-black-100'
        />
        <label htmlFor="">percentage</label>
        <input
          type='number'
          name='amount'
          onChange={(e) => setPercentage(e.target.value)}
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
              console.log({ percentage });

              if (inputValue && percentage) {
                const allValues = {
                  name: openModel?.name,
                  tokenId: openModel?.id,
                  percentage: Number(percentage) || 2,
                  price: Number(inputValue),
                  address: user?.address,
                  totalPrice: Number(openModel?.totalInvestmentPrice),
                  tokenAddress: openModel?.tokenAddress,
                };
                console.log({ allValues });
                mutateTokenPrice(allValues);
              } else {
                toast.error('invalid details');
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
