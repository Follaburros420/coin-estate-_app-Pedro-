'use client'; // only if using app router

import { useState } from 'react';

export default function VerifyCodePage({ handleVerifyCode, handleRecent, isLoadingVerify }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // e.preventDefault();
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setError('');
    // TODO: send code to backend for verification
    handleVerifyCode(code);
    console.log('Submitted code:', code);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f9fafb] px-4'>
      <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center border border-gray-200'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>Enter Verification Code</h2>
        <p className='text-sm text-gray-600 mb-6'>
          We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
        </p>

        <input
          type='text'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Enter code'
          maxLength={6}
          className='w-full border border-gray-300 rounded-md px-4 py-2 text-center tracking-widest text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3'
        />
        {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={isLoadingVerify}
          className='bg-yellow hover:bg-Yellow-300 text-black-100 font-medium py-2 px-4 rounded-md w-full transition'>
          {isLoadingVerify ? 'Loading...' : 'Verify Code'}
        </button>

        <p className='text-sm text-gray-500 mt-4'>
          Didn’t receive the code?{' '}
          <button onClick={handleRecent} className='text-blue-600 underline'>
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
