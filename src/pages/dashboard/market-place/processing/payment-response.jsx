/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentResponsePage() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Get the ref_payco parameter from the URL
    const refPayco = searchParams.get('ref_payco');

    if (!refPayco) {
      setPaymentStatus('error');
      return;
    }

    // Fetch payment status from ePayco
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${refPayco}`);
        const data = await response.json();

        console.log('Payment response data:', data);

        if (data.success) {
          // Store payment details
          setPaymentDetails(data.data);
          
          // Set payment status based on transaction state
          const state = data.data?.x_transaction_state?.toLowerCase();
          setPaymentStatus(
            state === 'approved' ? 'success' :
            state === 'pending' ? 'pending' :
            state === 'rejected' ? 'rejected' : 'error'
          );
        } else {
          setPaymentStatus('error');
        }
      } catch (error) {
        console.error('Error validating payment:', error);
        setPaymentStatus('error');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  const renderContent = () => {
    switch (paymentStatus) {
      case 'loading':
        return (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Verifying your payment...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-700 mb-2">Payment Successful!</h2>
            <p className="mb-6">Thank you for your purchase.</p>
            <div className="bg-gray-50 p-4 rounded mb-6 text-left">
              <p><strong>Reference:</strong> {paymentDetails?.x_ref_payco || 'N/A'}</p>
              <p><strong>Transaction ID:</strong> {paymentDetails?.x_transaction_id || 'N/A'}</p>
              <p><strong>Amount:</strong> ${paymentDetails?.x_amount} {paymentDetails?.x_currency_code}</p>
            </div>
            <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Return to Home
            </Link>
          </div>
        );

      case 'pending':
        return (
          <div className="text-center">
            <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-yellow-700 mb-2">Payment Pending</h2>
            <p className="mb-6">Your payment is being processed. We'll update you when it's complete.</p>
            <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Return to Home
            </Link>
          </div>
        );

      case 'rejected':
        return (
          <div className="text-center">
            <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-700 mb-2">Payment Rejected</h2>
            <p className="mb-6">Your payment could not be processed. Please try again.</p>
            <Link href="/checkout" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Try Again
            </Link>
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-700 mb-2">Something Went Wrong</h2>
            <p className="mb-6">We couldn't verify your payment. Please contact customer support.</p>
            <Link href="/checkout" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Return to Checkout
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Status</h1>
        {renderContent()}
      </div>
    </div>
  );
} 