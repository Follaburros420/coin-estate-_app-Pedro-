import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import * as config from '@/config';
import getStripe from '@/utils/get-stripejs';
import CheckoutPage from '@/components/Checkout';
import TransferModal from '@/components/Dashboard/TransferModal';
import Layout from '@/layout/Dashboard';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51OqeOYGUpSubT3GbqdYLrzRmhRyFNcYLcKjYRt5gTnZplQo4K7QPIBkd7mEoLzdyKiA97YAIINAp6FljxNkfNTfR00WMYiS7Rt',
);

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const amount = 419;
  const options = {
    // passing the client secret obtained from the server
    // clientSecret:'sk_test_51OqeOYGUpSubT3GboMfryc83rAxge8tZ5BmCH8PYP2UwQbTvqgwxaHB9MHnyn67qF1N2sIOM8NI3XLVNOaVRhwUe00FlqY5yJy',

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

  return (
    <div>
      <Layout>
        <Elements stripe={stripePromise} options={options}>
          <form onSubmit={(e) => e.preventDefault()}>
            <CheckoutPage amount={amount} />
          </form>
        </Elements>
        {/* <button onClick={() => setIsOpenModal(true)}>Open</button> */}

        <TransferModal title='Transfer Nft' isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <p>Wait Nft Transfer under processing</p>
        </TransferModal>
      </Layout>
    </div>
  );
}
