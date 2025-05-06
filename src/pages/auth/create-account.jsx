'use client';
import Input from '@/components/Input';
import CustomSelect from '@/components/Select';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import StyledImage from '@/components/StyedImage';
import { useMutateRegisterUser } from '@/hooks/mutation';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().required('e-mail is required'),
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
  cPassword: yup.string().required('confirm password is required'),
  phone: yup.string().required('phone is required'),
  termsAcceptedPolicy: yup.boolean().oneOf([true], 'You must accept the privacy policy'),
  termsAcceptedServices: yup.boolean().oneOf([true], 'You must accept the service terms'),
  code: yup.string().required('code is required'),
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/, // Date format: YYYY-MM-DD
      'Date must be in the format YYYY-MM-DD',
    )
    .test('age', 'You must be at least 18 years old', (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      return age > 18 || (age === 18 && m >= 0); // Valid if 18 years or older
    }),
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
  console.log("🚀 ~ CreateAccount ~ errors:", errors)

  function handleFormSubmit(value) {
    // console.log(value, code);

    if (value.password === value.cPassword) {
      const code = value.code.split(' ').pop();
      const values = {
        email: value.email,
        username: value.username,
        password: value.password,
        cPassword: value.cPassword,
        termsAcceptedPolicy: value.termsAcceptedPolicy,
        termsAcceptedServices: value.termsAcceptedServices,
        phone: code + value?.phone,
        dateOfBirth: value.dateOfBirth,
      };
      console.log({values, code})
      //
      // registerUser(values);
    } else {
      toast.error("Password don't matched");
    }
  }

  return (
    <div className='flex items-center  justify-center min-h-screen max-h-screen xl:justify-between gap-10 w-full mx-auto '>
      <form
        className='w-full flex justify-center '
        onSubmit={handleSubmit((data) => {
          handleFormSubmit(data);
        })}>
        <div className='w-full max-w-[50%] flex items-center justify-center '>
          <div className='w-full max-w-[586px]  p-6 rounded-lg glass'>
            <p className='text-30 font-quickSand font-bold text-center '>Crear Cuenta</p>
            <p className='mt-6 font-quickSand font-bold'>Full Name</p>
            <Input
              placeholder='Enter...'
              type='text'
              error={errors?.username}
              className={'placeholder:text-lightGray-500'}
              register={register('username')}
            />
            <p className=' font-quickSand font-bold mt-2'>Email</p>
            <Input
              placeholder='Example@gmail.com'
              type='text'
              error={errors?.email}
              register={register('email')}
              className={'placeholder:text-lightGray-500'}
            />

            <p className=' font-quickSand font-bold mt-2'>Phone</p>
            <div>
              {/* <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    country={'co'}
                    // onlyCountries={['co', 'us', 'mx', 'br', 'ar']}
                    {...field}
                    inputClass='w-full !py-2 !pl-12 !pr-4'
                    buttonClass='!bg-gray-100'
                    containerClass='!border rounded-md overflow-hidden'
                  />
                )}
              /> */}
            </div>

            <div className='flex justify-start items-center gap-3 w-full'>
              <div>
                <CustomSelect
                  setValue={setValue}
                  error={errors.propertyType}
                  control={control}
                  isCustom={false}
                  className='rounded-md p-3'
                  name='code'
                  options={[
                    '🇨🇴 Colombia +57',
                    '🇺🇸 United States +1',
                    '🇲🇽 Mexico +52',
                    '🇦🇷 Argentina +54',
                    '🇨🇱 Chile +56',
                    '🇵🇪 Peru +51',
                  ]}
                />
                {errors?.phone && <p className='text-red-100 text-sm'>{errors?.phone?.message}</p>}
              </div>
              <Input
                placeholder='3123456789'
                type='text'
                error={errors?.phone}
                register={register('phone')}
                className={'placeholder:text-lightGray-500 p-2.5 text-md w-full'}
              />
            </div>

            <label htmlFor='dateOfBirth' className='block text-sm font-medium text-gray-700'>
              Date of Birth
            </label>
            <Controller
              name='dateOfBirth'
              control={control}
              render={({ field }) => <input type='date' {...field} className='w-full p-2 border rounded-md' />}
            />
             {errors.dateOfBirth && <p className="text-red-100 text-sm">{errors.dateOfBirth.message}</p>}
            <div className='text-lightGray-700'>
              <div className=''>
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
                <label
                  htmlFor='termsAcceptedServices'
                  className={clsxm('text-sm', errors?.termsAcceptedServices?.message ? 'text-red-100' : '')}>
                  He leido y acepto las condiciones de uso del servicio
                </label>
              </div>

              <div className='flex font-bold justify-start gap-2 items-center'>
                <Input type='checkbox' id='termsAcceptedPolicy' {...register('termsAcceptedPolicy')} className='mt-1' />
                <label
                  htmlFor='termsAcceptedPolicy'
                  className={clsxm('text-sm', errors?.termsAcceptedPolicy?.message ? 'text-red-100' : '')}>
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
