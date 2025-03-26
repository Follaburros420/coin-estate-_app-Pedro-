/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
// import React from 'react'

// export default function Page() {
//   return (
//     <div>
//       <h1>Forget Password</h1>
//     </div>
//   )
// }

// pages/forgot-password.js

import { useState } from 'react';
import Head from 'next/head';
import Input from '@/components/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutationSendEmail } from '@/hooks/mutation';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  console.log('🚀 ~ ForgotPassword ~ email:', email);
  const [message, setMessage] = useState('');
  const { mutate: sendEmail, isPending } = useMutationSendEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can send a request to your API to handle password reset
    // setMessage(`Password reset link sent to ${email}`);
    sendEmail(email);
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className='h-screen overflow-hidden grid xl:grid-cols-2  bg-black-800  bg-gray-100 px-4'>
        <div>
          <button onClick={() => router.back()} className='text-white text-20 font-bold p-6'>
            <img src='/assets/svg/arrowleft.svg' alt='' />
          </button>
          <div className='flex items-center justify-center h-full'>
            <div className='max-w-md  bg-white p-8 rounded-xl shadow-lg w-full'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Forgot your password?</h2>
              <p className='text-sm text-gray-500 mb-6 text-center'>
                Enter your email and we'll send you instructions to reset your password.
              </p>

              <form onSubmit={handleSubmit}>
                <Input
                  Label={'Email Address'}
                  type='email'
                  id='email'
                  required
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type='submit'
                  // className='w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200'
                  className='text-lightGray-700 w-full bg-Yellow-100 rounded-[10px] mt-6 p-3 text-20 font-bold '>
                  {isPending ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              {/* {message && <div className='mt-4 text-green-600 text-sm text-center'>{message}</div>} */}

              <div className='mt-6 text-sm text-center'>
                <Link href='/auth/log-in' className='text-blue-500 hover:underline'>
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src='/assets/images/CreateAccountMainImg.png'
            className='w-full min-h-screen max-h-screen hidden xl:block '
          />
        </div>
      </div>
    </>
  );
}
