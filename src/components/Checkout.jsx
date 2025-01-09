import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useQueryGetUser } from '@/hooks/query';

function convertToSubcurrency(amount, factor = 100) {
  return Math.round(amount * factor);
}

const CheckoutPage = ({ amount }) => {
  const { data: user } = useQueryGetUser();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  console.log({ elements, stripe, clientSecret });

  // useEffect(() => {
  //   fetch('/api/v2/userInstants/create-payment-intent', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${user?.token}`,
  //     },
  //     body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, [amount]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!user?.token) {
        console.error("User token is missing");
        return;
      }
  
      try {
        const response = await fetch('/api/v2/userInstants/create-payment-intent', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json', // Ensure Content-Type is set
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });
   
        if (!response.ok) {
          throw console.log(`Error: ${response.status} - ${response.statusText}`);
        }
  
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Failed to fetch payment intent:", error);
      }
    };
  
    if (amount > 0) { // Optional: Ensure amount is valid
      createPaymentIntent();
    }
  }, [amount, user?.token]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className='flex items-center justify-center'>
        Loading...
        <div
          className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
          role='status'>
          <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white p-2 rounded-md'>
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className='text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse'>
        {!loading ? `Pay $${amount}` : 'Processing...'}
      </button>
    </form>
  );
};

export default CheckoutPage;
