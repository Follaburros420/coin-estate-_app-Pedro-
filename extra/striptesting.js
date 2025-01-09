import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

// import CustomDonationInput from './CustomDonationInput';
// import StripeTestCards from './StripeTestCards';

import * as config from '@/config';
import { formatAmountForDisplay } from '@/utils/stripe-helpers';
// import getStripe from '@/utils/get-stripejs';
import { createPaymentIntent } from '@/actions/stripe';


import getStripe from '@/utils/get-stripejs';

function CheckoutForm() {
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
    cardholderName: '',
  });
  const [paymentType, setPaymentType] = useState('');
  const [payment, setPayment] = useState({ status: 'initial' });
  const [errorMessage, setErrorMessage] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const PaymentStatus = ({ status }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>;

      case 'requires_action':
        return <h2>Authenticating...</h2>;

      case 'succeeded':
        return <h2>Payment Succeeded 🥳</h2>;

      case 'error':
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    elements?.update({ amount: input.customDonation * 100 });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!e.target.reportValidity() || !elements || !stripe) return;

      setPayment({ status: 'processing' });

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPayment({ status: 'error' });
        setErrorMessage(submitError.message || 'An unknown error occurred');
        return;
      }

      const { client_secret: clientSecret } = await createPaymentIntent(new FormData(e.target));
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/donate-with-elements/result`,
          payment_method_data: {
            billing_details: {
              name: input.cardholderName,
            },
          },
        },
      });

      if (confirmError) {
        setPayment({ status: 'error' });
        setErrorMessage(confirmError.message || 'An unknown error occurred');
      } else {
        setPayment({ status: 'succeeded' });
      }
    } catch (err) {
      setPayment({ status: 'error' });
      setErrorMessage(err.message || 'An unknown error occurred');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <CustomDonationInput
          className="elements-style"
          name="customDonation"
          value={input.customDonation}
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
        /> */}
        {/* <StripeTestCards /> */}
        <fieldset className="elements-style">
          <legend>Your payment details:</legend>
          {paymentType === 'card' && (
            <input
              placeholder="Cardholder name"
              className="elements-style"
              type="text"
              name="cardholderName"
              onChange={handleInputChange}
              required
            />
          )}
          <div className="FormRow elements-style">
            <PaymentElement
              onChange={(e) => setPaymentType(e.value.type)}
            />
          </div>
        </fieldset>
        <button
          className="elements-style-background"
          type="submit"
          disabled={!['initial', 'succeeded', 'error'].includes(payment.status) || !stripe}>
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      <PaymentStatus status={payment.status} />
    </>
  );
}

// export default CheckoutForm;



export default function ElementsForm() {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          variables: {
            colorIcon: '#6772e5',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          },
        },
        currency: config.CURRENCY,
        mode: 'payment',
        amount: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
      }}>
      <CheckoutForm />
    </Elements>
  );
}
