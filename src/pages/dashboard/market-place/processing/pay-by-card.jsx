import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import * as config from '@/config';
import getStripe from '@/utils/get-stripejs';
import CheckoutPage from '@/components/Checkout';
import TransferModal from '@/components/Dashboard/TransferModal';
import Layout from '@/layout/Dashboard';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useQueryGetProperty } from '@/hooks/query';
import { SourceUrl } from '@/hooks/queryContants';
import { useMutateTransferFunds } from '@/hooks/mutation';
import { usePropertyStates } from '@/store/useProduct';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51OqeOYGUpSubT3GbqdYLrzRmhRyFNcYLcKjYRt5gTnZplQo4K7QPIBkd7mEoLzdyKiA97YAIINAp6FljxNkfNTfR00WMYiS7Rt',
);

export default function Page() {
  const { data: getPropertyList } = useQueryGetProperty();
  const { mutate: sendTokens } = useMutateTransferFunds();
  const initailPropert = usePropertyStates((state) => state.initailPropert);

  const searchParams = useSearchParams();
  const paramsId = searchParams.get('id');
  const amount = searchParams.get('amount');
  const tokenAddress = searchParams.get('tokenAddress');

  // console.log({ amount, tokenAddress, amounts1: initailPropert.values });

  const selectedNFT = getPropertyList?.filter((item) => item.id === paramsId)?.[0];

  const [isOpenModal, setIsOpenModal] = useState(false);

  const options = {
    appearance: {
      variables: {
        colorIcon: '#6772e5',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      },
    },
    currency: config.CURRENCY,
    mode: 'payment',
    amount: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  };

  const handleModal = () => {
    console.log('success');
    sendTokens({ address: tokenAddress, amount: initailPropert?.values });
  };

  return (
    <Layout>
      <div className='border border-red-400 w-full lg:flex gap-5 mt-10 px-5 glass py-6'>
        <div className='w-full h-full'>
          {selectedNFT?.id && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutPage selectedNFT={selectedNFT} amount={amount} id={selectedNFT?.id} handleModal={handleModal} />
            </Elements>
          )}

          {/* <button onClick={handleModal}>sendTokens</button> */}
          <TransferModal title='Transfer Nft' isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
            <p>Wait Nft Transfer under processing</p>
          </TransferModal>
        </div>
        <div className='bg-lightGray-800 max-w-[320px] w-full p-4 rounded-lg '>
          <div className=' justify-center gap-4 items-start '>
            <img src={SourceUrl + selectedNFT?.image} alt='' className='max-h-[300px] w-full' />
            <div className='w-full'>
              <p className='font-bold font-ubuntu my-2'>{selectedNFT?.name}</p>
              <div className='grid grid-cols-2 gap-2'>
                <p>Price: </p>
                <p className='uppercase ml-auto'>$ {selectedNFT?.propertyPrice}</p>
                <p>Property Type: </p>
                <p className='uppercase ml-auto'>{selectedNFT?.houseType}</p>
              </div>
            </div>
          </div>
          <p className='capitalize mt-3'>description:</p>
          <p>{selectedNFT?.description}</p>
        </div>
      </div>
    </Layout>
  );
}
