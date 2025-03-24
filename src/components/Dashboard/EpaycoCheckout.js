'use client';

import { useEffect, useState } from 'react';

export default function EpaycoCheckout({ productData }) {
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    // Check if script already exists to avoid duplicates
    if (document.querySelector('script[src="https://checkout.epayco.co/checkout.js"]')) {
      // Script already exists, check if ePayco is available
      if (window.ePayco) {
        setIsClientReady(true);
      } else {
        // Wait a bit and check again
        const checkInterval = setInterval(() => {
          if (window.ePayco) {
            setIsClientReady(true);
            clearInterval(checkInterval);
          }
        }, 100);
        
        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkInterval), 10000);
      }
      return;
    }

    // Add the ePayco script to the document
    const script = document.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.async = true;
    script.onload = () => {
      // Script is loaded, but we need to make sure the ePayco object is initialized
      const checkEpayco = setInterval(() => {
        if (window.ePayco) {
          setIsClientReady(true);
          clearInterval(checkEpayco);
          console.log('ePayco loaded successfully');
        }
      }, 100);
      
      // Clear interval after 10 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkEpayco), 10000);
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Don't remove the script on unmount, as it might be used elsewhere
      // Just clean up any intervals
      // document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = () => {
    if (!isClientReady) {
      console.error('ePayco SDK not loaded yet');
      return;
    }

    if (!window.ePayco || !window.ePayco.checkout) {
      console.error('ePayco checkout not available');
      return;
    }

    // Default product data - can be overridden by props
    const data = {
      // Required payment parameters
      name: productData?.name || "Vestido Mujer Primavera",
      description: productData?.description || "Vestido Mujer Primavera",
      invoice: productData?.invoice || `INV-${Date.now()}`,
      currency: productData?.currency || "cop",
      amount: productData?.amount || "12000",
      tax_base: productData?.tax_base || "0",
      tax: productData?.tax || "0",
      country: productData?.country || "co",
      lang: productData?.lang || "es",

      // Onpage="false" - Standard="true"
      external: "false",

      // Optional attributes
      extra1: productData?.extra1 || "extra1",
      extra2: productData?.extra2 || "extra2",
      extra3: productData?.extra3 || "extra3",
      
      // Callback URLs
      confirmation: productData?.confirmation || `${window.location.origin}/api/payment-confirmation`,
      response: productData?.response || `${window.location.origin}/payment-response`,

      // Customer attributes
      name_billing: productData?.name_billing || "Andres Perez",
      address_billing: productData?.address_billing || "Carrera 19 numero 14 91",
      type_doc_billing: productData?.type_doc_billing || "cc",
      mobilephone_billing: productData?.mobilephone_billing || "3050000000",
      number_doc_billing: productData?.number_doc_billing || "100000000"
    };

    try {
      console.log('Configuring ePayco checkout...');
      const handler = window.ePayco.checkout.configure({
        key: "cb8d42f8571e473134792daec1b738dc6997805f", // Hardcoded for reliability
        test: true
      });

      console.log('Opening ePayco checkout...');
      handler.open(data);
    } catch (error) {
      console.error('Error opening ePayco checkout:', error);
    }
  };

  return (
    <div className="epayco-checkout">
      <button 
        onClick={handleCheckout}
        disabled={!isClientReady}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isClientReady ? 'Pay with ePayco' : 'Loading ePayco...'}
      </button>
      {!isClientReady && (
        <p className="text-xs text-gray-500 mt-2">
          If loading takes too long, try refreshing the page.
        </p>
      )}
    </div>
  );
} 