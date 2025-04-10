'use client';
import Input from '@/components/Input';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import StyledImage from '@/components/StyedImage';
import { useMutateRegisterUser } from '@/hooks/mutation';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().required('e-mail is required'),
  username: yup.string().required('username'),
  password: yup.string().required('password is required'),
  cPassword: yup.string().required('confirm password is required'),
  phone: yup.string().required('phone is required'),
  termsAcceptedPolicy: yup.boolean().oneOf([true], 'You must accept the privacy policy'),
  termsAcceptedServices: yup.boolean().oneOf([true], 'You must accept the service terms'),
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

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const resolver = useYupValidationResolver(validationSchema);
  const { mutate: registerUser, isPending: isLoadingRegisterUser } = useMutateRegisterUser();

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
    // console.log(value);
    registerUser(value);
  }

  return (
    <div className='flex items-center justify-center min-h-screen max-h-screen xl:justify-between gap-10 w-full mx-auto '>
      <form
        className='w-full flex justify-center '
        onSubmit={handleSubmit((data) => {
          handleFormSubmit(data);
        })}>
        <div className='w-full max-w-[50%] flex items-center justify-center '>
          <div className='w-full max-w-[586px]  p-6 rounded-lg glass'>
            <p className='text-30 font-quickSand font-bold text-center '>Crear Cuenta</p>
            <p className='mt-6 font-quickSand font-bold'>Username</p>
            <Input
              className={clsxm('px-3 rounded-[10px] w-full border-2 flex items-center justify-between')}
              placeholder='Enter...'
              type='text'
              error={errors?.username}
              register={register('username')}
            />
            <p className=' font-quickSand font-bold mt-2'>Email</p>
            <Input
              className={clsxm('px-3 rounded-[10px] w-full border-2 flex items-center justify-between')}
              placeholder='Example@gmail.com'
              type='text'
              error={errors?.email}
              register={register('email')}
            />

            <p className=' font-quickSand font-bold mt-2'>Phone</p>
            <Input
              className={clsxm('px-3 rounded-[10px] w-full border-2 flex items-center justify-between')}
              placeholder='Example@gmail.com'
              type='text'
              error={errors?.phone}
              register={register('phone')}
            />

            <div className='text-lightGray-700'>
              <div className=' '>
                <div className='flex items-center justify-between w-full text-lightGray-700 '>
                  <p className='font-bold font-quickSand mt-2'>Password:</p>
                </div>
                <div
                  className={`bg-light-brand-200 ${
                    errors?.password?.message ? 'border-2 border-red-300' : 'border border-grayTwo'
                  } px-3  rounded-[10px] flex items-center justify-between `}>
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
              <div className='flex items-center justify-between'>
                <p className='font-quickSand font-bold mt-2'>Confirm Password</p>
              </div>
              <div
                className={`bg-light-brand-200 ${
                  errors?.cPassword?.message ? 'border-2 border-red-300' : 'border border-grayTwo'
                } px-3 rounded-[10px] flex items-center justify-between `}>
                <Input
                  className={'border-none text-black-100 '}
                  placeholder='****'
                  type={showConfirmPassword === true ? 'text' : 'password'}
                  // error={errors?.password}
                  register={register('cPassword')}
                />
                <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword === true ? (
                    <StyledImage src='/assets/svg/EyeIcon.svg' className='w-4 h-4  ' />
                  ) : (
                    <StyledImage src='/assets/svg/HideEyeIcon.svg' className='w-4 h-4  ' />
                  )}
                </button>
              </div>
              {errors?.cPassword?.message && <span className='text-[red] text-xs'>{errors?.cPassword?.message}</span>}
              <div className='flex font-bold justify-start gap-2 mt-2 items-center'>
                <Input
                  type='checkbox'
                  id='termsAcceptedServices'
                  {...register('termsAcceptedServices')}
                  className='mt-1'
                />
                <label htmlFor='termsAcceptedServices' className={clsxm('text-sm',errors?.termsAcceptedServices?.message ? 'text-red-100' : '')}>
                  He leido y acepto las condiciones de uso del servicio
                </label>
              </div>

              <div className='flex font-bold justify-start gap-2 items-center'>
                <Input
                  type='checkbox'
                  id='termsAcceptedPolicy'
                  {...register('termsAcceptedPolicy')}
                  className='mt-1'
                />
                <label htmlFor='termsAcceptedPolicy' className={clsxm('text-sm',errors?.termsAcceptedPolicy?.message ? 'text-red-100' : '')}>
                  He leido y acepto la politica de tratamiento de datos
                </label>
              </div>
            </div>
            <button
              type='submit'
              className='bg-Yellow-100 p-3 text-lightGray-700 font-bold font-quickSand mt-3 w-full rounded-[10px] '>
              {isLoadingRegisterUser ? 'Loading...' : '  Create Your Account'}
            </button>
            <p className='text-lightGray-700 font-semibold mt-5 text-center '>Have you already registered?</p>
            <div className='text-center'>
              <button
                onClick={() => router.push('/auth/log-in')}
                className='underline  text-blue-500 mt-2 text-center '>
                Log In
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            src='/assets/images/CreateAccountMainImg.png'
            className='w-full min-h-screen max-h-screen hidden xl:block '
          />
        </div>
      </form>
    </div>
  );
}
