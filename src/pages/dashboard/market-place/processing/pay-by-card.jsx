import CheckoutPage from '@/components/Checkout';
import KYCVerification from '@/components/Dashboard/KYCVerification';
import MakePayment from '@/components/Dashboard/MakePayment';
import SignContract from '@/components/Dashboard/SignContract';
import SummeryCard from '@/components/Dashboard/SummeryCard';
import TransferModal from '@/components/Dashboard/TransferModal';
import * as config from '@/config';
import { useMutateTransferFunds } from '@/hooks/mutation';
import { useQueryGetProperty } from '@/hooks/query';
import Layout from '@/layout/Vault-Dashboard';
import { usePropertyStates } from '@/store/useProduct';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51OqeOYGUpSubT3GbqdYLrzRmhRyFNcYLcKjYRt5gTnZplQo4K7QPIBkd7mEoLzdyKiA97YAIINAp6FljxNkfNTfR00WMYiS7Rt',
);

const tabs = {
  checkout: 'sign-contract',
  'sign-contract': 'make-payment',
  'make-payment': 'kyc-verification',
};

export default function Page() {
  const router = useRouter();
  const { data: getPropertyList } = useQueryGetProperty();
  const { mutate: sendTokens } = useMutateTransferFunds();
  const initailPropert = usePropertyStates((state) => state.initailPropert);

  useEffect(() => {
    if (initailPropert) {
      setIsOpenModal(true);
    }
  }, [initailPropert]);

  const searchParams = useSearchParams();
  const paramsId = searchParams.get('id');
  const amount = searchParams.get('amount');
  const tokenAddress = searchParams.get('tokenAddress');
  const tab = searchParams.get('tab');

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

  const handleNext = () => {
    router.push(
      `/dashboard/market-place/processing/pay-by-card?tab=${tabs?.[tab]}&id=${paramsId}&amount=${amount}&tokenAddress=${tokenAddress}`,
    );
  };

  return (
    <Layout>
      <div className='px-6 xl:pr-10'>
        {tab === 'checkout' && <SummeryCard selectedNFT={selectedNFT} amount={amount} handleNext={handleNext} />}
        {tab === 'sign-contract' && <SignContract selectedNFT={selectedNFT} amount={amount} handleNext={handleNext} />}
        {tab === 'make-payment' && <MakePayment selectedNFT={selectedNFT} amount={amount} handleNext={handleNext} />}
        {tab === 'kyc-verification' && (
          <div className='glass p-4 rounded-lg'>
          <KYCVerification selectedNFT={selectedNFT} amount={amount} handleNext={handleNext} />
          </div>
        )}
      </div>
    </Layout>
  );
}
