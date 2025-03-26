/* eslint-disable react/no-unescaped-entities */
'use client';
import Input from '@/components/Input';
import StyledImage from '@/components/StyedImage';
import { useMutateLoginUser } from '@/hooks/mutation';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().required('e-mail is required'),
  password: yup.string().required('password is required'),
});

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });
        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );

export default function LogIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const resolver = useYupValidationResolver(validationSchema);

  const { mutate: loginUser, isPending: isLoadingLoginUser } = useMutateLoginUser();

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver,
  });

  function handleFormSubmit(value) {
    console.log(value);
    loginUser(value);
  }

  const step = '0.001';
  return (
    <div className='bg-black-800 min-h-screen flex items-center justify-center font-inter '>
      <form
        className='w-full flex justify-center '
        onSubmit={handleSubmit((data) => {
          handleFormSubmit(data);
        })}>
        <div className='bg-white p-6 rounded-[20px] w-full max-w-[500px]  '>
          <p className='text-30 font-bold text-center'>LogIn</p>
          <div className='mt-4'>
            <p className='font-bold font-quickSand'>Email:</p>
            <div>
              <Input
                className={clsxm(
                  'px-3 mt-2 rounded-[10px] w-full border-2 text-light-brand-300 flex items-center justify-between',
                )}
                placeholder='Example@gmail.com'
                type='text'
                error={errors?.email}
                register={register('email')}
              />
            </div>
          </div>
          <div className='mt-4 '>
            <div className='flex items-center justify-between w-full text-lightGray-700 '>
              <p className='font-bold font-quickSand '>Password:</p>
            </div>
            <div
              className={`bg - light - brand - 200 ${
                errors?.password?.message ? 'border-2 border-red-300' : 'border border-grayTwo'
              } px-3 mt-2 rounded-[10px] text-light-brand-300 flex items-center justify-between `}>
              <Input
                className={'border-none text-black-100 '}
                placeholder='****'
                type={showPassword === true ? 'text' : 'password'}
                // error={errors?.password}
                register={register('password')}
              />

              <button type='button' onClick={() => setShowPassword(!showPassword)}>
                {showPassword === true ? (
                  <StyledImage src='/assets/svg/EyeIcon.svg' className='w-4 h-4  ' />
                ) : (
                  <StyledImage src='/assets/svg/HideEyeIcon.svg' className='w-4 h-4  ' />
                )}
              </button>
            </div>
            {errors?.password?.message && <span className='text-[red] text-xs'>{errors?.password?.message}</span>}
          </div>
          <button
            type='button'
            onClick={() => router.push('/auth/forget-password')}
            className='text-right text-blue-500 capitalize font-bold font-quickSand mt-2 w-full'>
            forget password?
          </button>
          <button
            type='submit'
            className='text-lightGray-700 w-full bg-Yellow-100 rounded-[10px] mt-6 p-3 text-20 font-bold '>
            {isLoadingLoginUser ? 'Loading...' : ' Log In'}
          </button>
          {/* <hr className="my-4 p-1 border-none bg-grayTwo rounded-[100%] " /> */}
          <p className='text-lightGray-700 font-bold font-quickSand mt-8 text-center'>Don't have an account yet?</p>
          <div className='flex items-center  mt-4 justify-center px-6 text-blue-500 font-medium underline '>
            <button onClick={() => router.push('/auth/create-account')} type='button'>
              Sign up
            </button>
            {/* <button type="button">Forgot your password?</button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
