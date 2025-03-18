import { SourceUrl } from '@/hooks/queryContants';
import React from 'react';

export default function SummeryCard({ selectedNFT, amount, handleNext }) {
  return (
    <div>
      <div className='bg-lightGray-800 max-w-[720px] w-full p-4 rounded-lg mx-auto'>
        <div className=' justify-center gap-4 items-start '>
          <img src={SourceUrl + selectedNFT?.image} alt='' className='max-h-[300px] w-full' />
          <div className='w-full'>
            <p className='font-bold font-ubuntu my-2'>{selectedNFT?.name}</p>
            <div className='grid grid-cols-2 gap-2'>
              <p>Token Price: </p>
              <p className='uppercase ml-auto'>$ {selectedNFT?.tokenPrice}</p>
              <p>Number of Tokens: </p>
              <p className='uppercase ml-auto'>{amount}</p>
            </div>
          </div>
        </div>
        <p className='capitalize mt-3 border-b'>description:</p>
        <p>{selectedNFT?.description}</p>
        <button onClick={handleNext} className='bg-yellow text-black px-4 py-2 rounded-md mt-4 w-full font-bold text-black-200'>{selectedNFT?.description}</button>
      </div>
    </div>
  );
}
