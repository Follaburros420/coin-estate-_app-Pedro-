/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import Input from '@/components/Input';
import { useMutationResetPassword } from '@/hooks/mutation';
import Link from 'next/link';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const { mutate: resetPassword, isPending } = useMutationResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    resetPassword({ token, newPassword });
    // TODO: API call to reset password
    setMessage('Your password has been reset successfully!');
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>

      <div className='h-screen overflow-hidden grid xl:grid-cols-2  bg-black-800  bg-gray-100 px-4'>
        <div>
          <button onClick={() => router.back()} className='text-white text-20 font-bold p-6'>
            <img src='/assets/svg/arrowleft.svg' alt='' />
          </button>
          <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>Reset Your Password</h2>
              <p className='text-sm text-gray-500 text-center mb-6'>Please enter your new password below.</p>

              <form onSubmit={handleSubmit}>
                <label className='block text-sm font-medium text-gray-700 mb-1'>New Password</label>
                <div className='relative mb-4'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter new password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <label className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
                <div className='relative mb-4'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Confirm new password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='flex items-center mb-4'>
                  <input
                    id='show-password'
                    type='checkbox'
                    className='mr-2'
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor='show-password' className='text-sm text-gray-600'>
                    Show Passwords
                  </label>
                </div>

                <button
                  type='submit'
                  // className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200'>
                  className='text-lightGray-700 w-full bg-Yellow-100 rounded-[10px] mt-6 p-3 text-20 font-bold '>
                  {isPending ? 'Loading...' : 'Reset Password'}
                </button>
              </form>

              {/* {message && <div className='mt-4 text-center text-sm text-green-600 font-medium'>{message}</div>} */}

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
