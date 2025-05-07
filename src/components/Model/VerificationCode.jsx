'use client'; // only if using app router

import { useState } from 'react';

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setError('');
    // TODO: send code to backend for verification
    console.log('Submitted code:', code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Enter Verification Code</h2>
        <p className="text-sm text-gray-600 mb-6">
          We’ve sent a 6-digit code to your email. Please enter it below to verify your account.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            maxLength={6}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-center tracking-widest text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full transition"
          >
            Verify Code
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive the code? <a href="#" className="text-blue-600 underline">Resend</a>
        </p>
      </div>
    </div>
  );
}
