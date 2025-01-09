import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import * as config from '@/config';
import getStripe from '@/utils/get-stripejs';
import CheckoutPage from '@/components/Checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51OqeOYGUpSubT3GbqdYLrzRmhRyFNcYLcKjYRt5gTnZplQo4K7QPIBkd7mEoLzdyKiA97YAIINAp6FljxNkfNTfR00WMYiS7Rt',
);

export default function Page() {
  const amount = 49.99;
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
    <Elements
      // stripe={getStripe()}
      stripe={stripePromise}
      options={options}>
      <form>
        <CheckoutPage amount={amount} />
        <button>Submit</button>
      </form>
    </Elements>
  );
}
