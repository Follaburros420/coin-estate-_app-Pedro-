'use client';
import Input from '@/components/Input';
import CustomSelect from '@/components/Select';
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import StyledImage from '@/components/StyedImage';
import { ThreeDMarquee } from '@/components/ui/3d-marquee';
import { useMutateRegisterUser, useMutateSocialLogin } from '@/hooks/mutation';
import clsxm from '@/utils/clsxm';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const COUNTRY_CODES = [
  'Colombia +57',
  'Argentina +54',
  'Chile +56',
  'Peru +51',
  'Mexico +52',
  'United States +1',
  'Canada +1',
  'Spain +34',
];

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('e-mail is required'),
  username: yup.string().required('username is required'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least 1 capital letter')
    .matches(/[0-9]/, 'Password must contain at least 1 number'),
  cPassword: yup
    .string()
    .required('confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  phone: yup
    .string()
    .required('phone is required')
    .length(10, 'Phone number must be exactly 10 digits')
    .matches(/^[0-9]+$/, 'Phone can only include numbers'),
  termsAcceptedPolicy: yup.boolean().oneOf([true], 'You must accept the privacy policy'),
  termsAcceptedServices: yup.boolean().oneOf([true], 'You must accept the service terms'),
  code: yup.string().required('code is required'),
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'Date must be in the format YYYY-MM-DD')
    .test('age', 'You must be at least 18 years old', (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDelta = today.getMonth() - birthDate.getMonth();
      return age > 18 || (age === 18 && monthDelta >= 0);
    }),
});

const useYupValidationResolver = (schema) =>
  useCallback(
    async (data) => {
      try {
        const values = await schema.validate(data, {
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
    [schema],
  );

const Spinner = ({ variant = 'slate' }) => (
  <span
    className={clsxm(
      'inline-block h-4 w-4 animate-spin rounded-[999px] border-2 border-t-transparent',
      variant === 'light' ? 'border-white' : 'border-slate-400',
    )}
  />
);

const GoogleIcon = () => (
  <svg className='h-5 w-5' viewBox='0 0 24 24' aria-hidden='true'>
    <path
      fill='#EA4335'
      d='M12 10.2v3.72h5.25c-.22 1.2-.9 2.22-1.92 2.9l3.1 2.4c1.8-1.66 2.84-4.1 2.84-6.99 0-.67-.06-1.32-.18-1.95z'
    />
    <path
      fill='#34A853'
      d='M6.54 13.32a3.98 3.98 0 0 1 0-2.64L3.3 7.92A8.01 8.01 0 0 0 3.9 16.2l3.18-2.88z'
    />
    <path
      fill='#4A90E2'
      d='M12 4.8c1.14 0 2.17.33 3.04.98l2.27-2.27A8.01 8.01 0 0 0 3.3 7.92l3.24 2.76C6.9 9.68 8.28 8.4 12 8.4z'
    />
    <path
      fill='#FBBC05'
      d='M12 19.2c-3.72 0-5.1-2.28-5.46-3.9L3.3 16.2A8 8 0 0 0 12 20.4c1.92 0 3.66-.66 4.98-1.78l-3.12-2.43c-.87.6-1.89.96-2.86.96z'
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className='h-5 w-5 fill-current' viewBox='0 0 8 16' aria-hidden='true'>
    <path d='M5.6 15.5V8.5H7.8L8 5.7H5.6V4c0-.8.2-1.3 1.3-1.3H8V.1C7.3 0 6.7 0 6 0 4 0 2.6 1.2 2.6 3.4v2.3H0v2.8h2.6v7z' />
  </svg>
);

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeSocialProvider, setActiveSocialProvider] = useState(null);
  const router = useRouter();
  const resolver = useYupValidationResolver(validationSchema);
  const { mutate: registerUser, isPending: isLoadingRegisterUser } = useMutateRegisterUser();
  const { mutate: socialLogin, isPending: isLoadingSocialLogin } = useMutateSocialLogin();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      termsAcceptedPolicy: false,
      termsAcceptedServices: false,
    },
  });

  useEffect(() => {
    setValue('code', COUNTRY_CODES[0]);
  }, [setValue]);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  const handleSocialError = useCallback((message) => {
    setActiveSocialProvider(null);
    toast.error(message);
  }, []);

  const handleSocialAuth = useCallback(
    (provider, token) => {
      setActiveSocialProvider(provider);
      socialLogin(
        { provider, token },
        {
          onSettled: () => setActiveSocialProvider(null),
        },
      );
    },
    [socialLogin],
  );

  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    scope: 'openid email profile',
    onSuccess: (tokenResponse) => {
      if (!tokenResponse?.access_token) {
        handleSocialError('No pudimos conectar con Google. Intentalo nuevamente.');
        return;
      }
      handleSocialAuth('google', tokenResponse.access_token);
    },
    onError: () => handleSocialError('No pudimos conectar con Google. Intentalo nuevamente.'),
  });

  useEffect(() => {
    if (!facebookAppId || typeof window === 'undefined') {
      return;
    }

    const initFacebook = () => {
      if (window.FB) {
        window.FB.init({
          appId: facebookAppId,
          cookie: true,
          xfbml: false,
          version: 'v18.0',
        });
      }
    };

    if (window.FB) {
      initFacebook();
      return;
    }

    window.fbAsyncInit = initFacebook;

    if (document.getElementById('facebook-jssdk')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => {
      console.error('Facebook SDK failed to load.');
    };
    document.body.appendChild(script);
  }, [facebookAppId]);

  const handleFacebookLogin = useCallback(() => {
    if (!facebookAppId) {
      toast.error('Configura NEXT_PUBLIC_FACEBOOK_APP_ID para habilitar Facebook Sign-In.');
      return;
    }

    if (typeof window === 'undefined' || !window.FB) {
      handleSocialError('Facebook SDK no esta listo. Intentalo nuevamente.');
      return;
    }

    setActiveSocialProvider('facebook');

    window.FB.login(
      (response) => {
        if (response?.authResponse?.accessToken) {
          handleSocialAuth('facebook', response.authResponse.accessToken);
        } else {
          handleSocialError('No pudimos conectar con Facebook. Intentalo nuevamente.');
        }
      },
      { scope: 'email,public_profile' },
    );
  }, [facebookAppId, handleSocialAuth, handleSocialError]);

  function handleFormSubmit(value) {
    const sanitizedPhone = value.phone.replace(/\D/g, '');
    const callingCode = value.code.split(' ').pop();

    const payload = {
      email: value.email,
      username: value.username,
      password: value.password,
      cPassword: value.cPassword,
      termsAcceptedPolicy: value.termsAcceptedPolicy,
      termsAcceptedServices: value.termsAcceptedServices,
      phone: `${callingCode}${sanitizedPhone}`,
      dateOfBirth: value.dateOfBirth,
    };

    registerUser(payload);
  }

  const isProviderLoading = (provider) => isLoadingSocialLogin && activeSocialProvider === provider;

  return (
    <div className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-100'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-[999px] bg-orange-500/40 blur-3xl' />
        <div className='absolute bottom-0 left-0 h-64 w-64 rounded-[999px] bg-blue-500/30 blur-[140px]' />
      </div>

      <div className='relative z-10 mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-2 lg:px-12'>
        <div className='relative flex min-h-[500px] flex-col justify-end overflow-hidden rounded-3xl border border-neutral-700/30 bg-slate-900/50 p-2 shadow-2xl backdrop-blur ring-1 ring-neutral-700/10 lg:min-h-[600px]'>
          <div className='absolute inset-0 overflow-hidden rounded-3xl bg-slate-900/80'>
            <ThreeDMarquee
              images={[
                '/assets/images/property1.png',
                '/assets/images/property2.png',
                '/assets/images/property3.png',
                '/assets/images/property4.png',
                '/assets/images/property5.png',
                '/assets/images/property6.png',
                '/assets/images/property7.png',
                '/assets/images/property8.png',
                '/assets/images/property9.png',
                '/assets/images/MarketPlaceGridImgOne.png',
                '/assets/images/MarketPlaceGridImgTwo.png',
                '/assets/images/MarketPlaceGridImgThree.png',
              ]}
              duration={40}
              pauseOnHover={true}
            />
          </div>
          <div className='absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/70 to-slate-900/90' />
          <div className='relative z-10 space-y-5 p-8 text-white lg:p-10'>
            <span className='inline-flex items-center rounded-[999px] border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/90 backdrop-blur-sm'>
              Coin Estate
            </span>
            <h2 className='text-3xl font-semibold leading-tight sm:text-4xl'>Invierte en bienes raices tokenizados</h2>
            <p className='text-sm text-white/80'>Fortalece tu portafolio inmobiliario con tecnologia blockchain y accede a oportunidades globales desde un solo lugar.</p>
            <div className='flex flex-wrap gap-3 text-xs text-white/70'>
              <span className='inline-flex items-center gap-2 rounded-[999px] bg-white/10 px-3 py-2 backdrop-blur-sm'>
                <span className='h-1.5 w-1.5 rounded-[999px] bg-emerald-400' />
                Registro seguro
              </span>
              <span className='inline-flex items-center gap-2 rounded-[999px] bg-white/10 px-3 py-2 backdrop-blur-sm'>
                <span className='h-1.5 w-1.5 rounded-[999px] bg-blue-400' />
                Acceso 24/7
              </span>
              <span className='inline-flex items-center gap-2 rounded-[999px] bg-white/10 px-3 py-2 backdrop-blur-sm'>
                <span className='h-1.5 w-1.5 rounded-[999px] bg-violet-400' />
                Experiencia premium
              </span>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='w-full max-w-md rounded-2xl border border-black bg-white/85 p-8 shadow-xl backdrop-blur-lg md:p-10'>
            <header className='space-y-2'>
              <p className='text-xs font-semibold uppercase tracking-[0.45em] text-orange-500'>Unete hoy</p>
              <h1 className='text-3xl font-semibold text-slate-900'>Crea tu cuenta</h1>
              <p className='text-sm text-slate-500'>Elige tu metodo favorito para comenzar y completa tu perfil en minutos.</p>
            </header>

            <div className='mt-7 grid gap-3 sm:grid-cols-2'>
              <button
                type='button'
                onClick={() => {
                  if (!googleClientId) {
                    toast.error('Configura NEXT_PUBLIC_GOOGLE_CLIENT_ID para habilitar Google Sign-In.');
                    return;
                  }
                  googleLogin();
                }}
                className='group relative flex items-center justify-between gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:-translate-y-0.5 hover:border-black hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60'
                disabled={isProviderLoading('google')}
              >
                <span className='flex h-9 w-9 items-center justify-center rounded-[999px] border border-black bg-white text-slate-600 transition group-hover:border-black group-hover:text-orange-500'>
                  {isProviderLoading('google') ? <Spinner /> : <GoogleIcon />}
                </span>
                <span className='flex-1 text-left'>Google</span>
                <span className='text-xs text-slate-400'>OAuth</span>
              </button>

              <button
                type='button'
                onClick={handleFacebookLogin}
                className='group relative flex items-center justify-between gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm font-medium text-slate-600 transition hover:-translate-y-0.5 hover:border-black hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60'
                disabled={isProviderLoading('facebook')}
              >
                <span className='flex h-9 w-9 items-center justify-center rounded-[999px] border border-black bg-white text-slate-600 transition group-hover:border-black group-hover:text-orange-500'>
                  {isProviderLoading('facebook') ? <Spinner /> : <FacebookIcon />}
                </span>
                <span className='flex-1 text-left'>Facebook</span>
                <span className='text-xs text-slate-400'>OAuth</span>
              </button>
            </div>

            <div className='mt-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400'>
              <span className='h-px flex-1 bg-slate-200' />
              <span>o con tu correo</span>
              <span className='h-px flex-1 bg-slate-200' />
            </div>

            <form className='mt-7 space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='sm:col-span-2'>
                  <Input
                    Label='Nombre completo'
                    placeholder='Tu nombre y apellidos'
                    type='text'
                    error={errors?.username}
                    className='placeholder:text-slate-400'
                    register={register('username')}
                  />
                </div>

                <div className='sm:col-span-2'>
                  <Input
                    Label='Email'
                    placeholder='nombre@correo.com'
                    type='email'
                    error={errors?.email}
                    className='placeholder:text-slate-400'
                    register={register('email')}
                  />
                </div>

                <div>
                  <CustomSelect
                    label='Codigo'
                    name='code'
                    options={COUNTRY_CODES}
                    control={control}
                    errors={errors?.code}
                    setValue={setValue}
                    className='border-black'
                  />
                </div>
                <div>
                  <Input
                    Label='Telefono'
                    placeholder='3123456789'
                    type='text'
                    error={errors?.phone}
                    className='placeholder:text-slate-400'
                    register={register('phone')}
                    maxLength={10}
                  />
                </div>

                <div className='sm:col-span-2'>
                  <label className='mb-1 block text-sm font-medium text-slate-600'>Fecha de nacimiento</label>
                  <Controller
                    name='dateOfBirth'
                    control={control}
                    render={({ field }) => (
                      <input
                        type='date'
                        {...field}
                        className={clsxm(
                          'w-full rounded-lg border border-black bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-black focus:ring-2 focus:ring-orange-200',
                          errors?.dateOfBirth ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : '',
                        )}
                      />
                    )}
                  />
                  {errors.dateOfBirth && <p className='mt-1 text-xs text-red-500'>{errors.dateOfBirth.message}</p>}
                </div>

                <div>
                  <p className='mb-1 text-sm font-medium text-slate-600'>Contrasena</p>
                  <div className={clsxm('flex items-center rounded-lg border border-black bg-white px-3 py-2 shadow-sm', errors?.password ? 'border-red-400' : '')}>
                    <Input
                      className='border-none bg-transparent p-0 text-slate-700'
                      placeholder='********'
                      type={showPassword ? 'text' : 'password'}
                      register={register('password')}
                    />
                    <button type='button' onClick={() => setShowPassword((prev) => !prev)} className='text-slate-400 transition hover:text-slate-600'>
                      {showPassword ? <StyledImage src='/assets/svg/EyeIcon.svg' className='h-4 w-4' /> : <StyledImage src='/assets/svg/HideEyeIcon.svg' className='h-4 w-4' />}
                    </button>
                  </div>
                  {errors?.password?.message && <span className='text-xs text-red-500'>{errors?.password?.message}</span>}
                </div>

                <div>
                  <p className='mb-1 text-sm font-medium text-slate-600'>Repetir contrasena</p>
                  <div className={clsxm('flex items-center rounded-lg border border-black bg-white px-3 py-2 shadow-sm', errors?.cPassword ? 'border-red-400' : '')}>
                    <Input
                      className='border-none bg-transparent p-0 text-slate-700'
                      placeholder='********'
                      type={showConfirmPassword ? 'text' : 'password'}
                      register={register('cPassword')}
                    />
                    <button type='button' onClick={() => setShowConfirmPassword((prev) => !prev)} className='text-slate-400 transition hover:text-slate-600'>
                      {showConfirmPassword ? <StyledImage src='/assets/svg/EyeIcon.svg' className='h-4 w-4' /> : <StyledImage src='/assets/svg/HideEyeIcon.svg' className='h-4 w-4' />}
                    </button>
                  </div>
                  {errors?.cPassword?.message && <span className='text-xs text-red-500'>{errors?.cPassword?.message}</span>}
                </div>
              </div>

              <div className='space-y-3'>
                <label className='flex items-start gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm text-slate-600 shadow-sm'>
                  <input
                    type='checkbox'
                    id='termsAcceptedServices'
                    {...register('termsAcceptedServices')}
                    className='mt-1 h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500'
                  />
                  <span>He leido y acepto las condiciones de uso del servicio.</span>
                </label>

                <label className='flex items-start gap-3 rounded-lg border border-black bg-white px-4 py-3 text-sm text-slate-600 shadow-sm'>
                  <input
                    type='checkbox'
                    id='termsAcceptedPolicy'
                    {...register('termsAcceptedPolicy')}
                    className='mt-1 h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500'
                  />
                  <span>He leido y acepto la politica de tratamiento de datos.</span>
                </label>
                {(errors?.termsAcceptedPolicy || errors?.termsAcceptedServices) && (
                  <p className='text-xs text-red-500'>Debes aceptar las politicas y condiciones para continuar.</p>
                )}
              </div>

              <button
                type='submit'
                className='flex w-full items-center justify-center gap-3 rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70'
                disabled={isLoadingRegisterUser}
              >
                {isLoadingRegisterUser ? <Spinner variant='light' /> : null}
                {isLoadingRegisterUser ? 'Creando tu cuenta...' : 'Crear cuenta'}
              </button>
            </form>

            <div className='mt-8 flex items-center justify-between rounded-lg border border-black bg-orange-50 p-4 text-sm text-orange-700'>
              <div>
                <p className='font-semibold'>Ya formas parte?</p>
                <p className='text-xs text-orange-600/70'>Inicia sesion para continuar explorando tus inversiones.</p>
              </div>
              <button
                type='button'
                onClick={() => router.push('/auth/log-in')}
                className='rounded-lg border border-black px-4 py-2 text-xs font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-black hover:text-orange-600'
              >
                Inicia sesion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


