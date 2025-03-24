import { useState, useEffect } from 'react';
import EpaycoCheckout from './EpaycoCheckout';

export default function MakePayment() {
  const [product, setProduct] = useState({
    name: 'Vestido Mujer Primavera',
    description: 'Vestido Mujer Primavera',
    invoice: `INV-${Date.now()}`,
    currency: 'cop',
    amount: '12000',
    tax_base: '0',
    tax: '0',
  });

  // For debugging
  useEffect(() => {
    console.log('Checkout page mounted');
    console.log('Window ePayco available:', typeof window !== 'undefined' && !!window.ePayco);

    // Check browser console for errors
    const originalError = console.error;
    console.error = (...args) => {
      originalError(...args);
      if (args[0] && typeof args[0] === 'string' && args[0].includes('ePayco')) {
        console.log('ePayco error detected:', args);
      }
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div className='container mx-auto p-8 '>
      <h1 className='text-2xl font-bold mb-6'>Checkout</h1>

      <div className='bg-white p-6 rounded-lg shadow-md mb-8 text-black-100'>
        <h2 className='text-xl font-semibold mb-4'>Product Details</h2>
        <div className='mb-4'>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Amount:</strong> ${product.amount} {product.currency.toUpperCase()}
          </p>
        </div>

        <EpaycoCheckout productData={product} />
      </div>

      <div className='mt-6'>
        <p className='text-sm text-gray-600'>This is a test checkout. No actual payment will be processed.</p>
      </div>
    </div>
  );
}
