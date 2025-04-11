// import React from 'react';

// export default function UserProfile() {
//   return (
//     <div>
//       <h3>Helo world</h3>
//     </div>
//   );
// }

import Input from '@/components/Input';
import { useMutateUploadFiles, useMutationUpdateUserProfile } from '@/hooks/mutation';
import { useQueryGetUser } from '@/hooks/query';
import Layout from '@/layout/Dashboard';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('El nombre de usuario es requerido'),
  dateOfBirth: Yup.date().required('Fecha de nacimiento es requerida'),
  nationality: Yup.string().required('Nacionalidad es requerida'),
  phone: Yup.string()
    .matches(/^[0-9+\s()-]*$/, 'Teléfono inválido')
    .required('Teléfono es requerido'),
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

// type FormData = Yup.InferType<typeof validationSchema>;

export default function ProfilePage() {
  const { mutate: mutateUploadMainFile, data: mainImageData, isPending: isLoadingMain } = useMutateUploadFiles();
  console.log("🚀 ~ ProfilePage ~ mainImageData:", mainImageData)
  const { mutate: updateProfile, isPending: isLoadingUpdate } = useMutationUpdateUserProfile();
  const { data: user } = useQueryGetUser();

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      email: '',
      dateOfBirth: '',
      phone: '',
      username: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email || '',
        dateOfBirth: user.dateOfBirth || '',
        phone: user.phone || '',
        username: user.username || '',
      });
    }
  }, [user, reset]);

  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    const userDetails = {
      ...data,
      dateOfBirth: `${data?.dateOfBirth}`,
      image: mainImageData?.IpfsHash,
    };
    updateProfile(userDetails);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    mutateUploadMainFile(file);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Layout>
        <div className='min-h-screen bg-black text-yellow-400 flex items-center justify-center p-6'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-yellow-50 text-black w-full max-w-xl p-6 rounded-xl glass shadow-2xl space-y-6'>
            <h2 className='text-2xl font-bold text-center text-yellow-600'>Perfil de Usuario</h2>

            {/* Profile Image Upload */}
            {/* <div className='flex justify-center'>
              <label htmlFor='profilePic' className='cursor-pointer'>
                <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 shadow'>
                  <img
                    src={imagePreview || mainImageData || '/assets/images/images.jpeg'}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
              </label>
              <input id='profilePic' type='file' accept='image/*' onChange={handleImageChange} className='hidden' />
            </div> */}
            <div className='flex justify-center'>
              <label htmlFor='profilePic' className='cursor-pointer relative group'>
                <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 shadow relative'>
                  <img
                    src={imagePreview || mainImageData || '/assets/images/images.jpeg'}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                  {/* Hover Overlay with Camera Icon */}
                  <div className='absolute bg-[#202020c2]  inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <img src='/assets/svg/camera.svg' className='text-yellow-300 text-3xl' />
                  </div>
                </div>
              </label>
              <input id='profilePic' type='file' accept='image/*' onChange={handleImageChange} className='hidden' />
            </div>

            {/* Email */}
            <div>
              <label className='block font-semibold mb-1'>Correo electrónico</label>
              <Input
                type='email'
                readOnly
                value={user?.email}
                className='w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
              />
              {errors?.email && <p className='text-red-600 text-sm mt-1'>{errors?.email?.message}</p>}
            </div>

            {/* Username */}
            <div>
              <label className='block font-semibold mb-1'>Nombre de usuario</label>
              <Input
                type='text'
                register={register('username')}
                className='w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
              />
              {errors.username && <p className='text-red-600 text-sm mt-1'>{errors.username.message}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className='block font-semibold mb-1'>Fecha de nacimiento</label>
              <Input
                type='date'
                register={register('dateOfBirth')}
                className='w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
              />
              {errors.dateOfBirth && <p className='text-red-600 text-sm mt-1'>{errors.dateOfBirth.message}</p>}
            </div>

            {/* Nationality */}
            <div>
              <label className='block font-semibold mb-1'>Nacionalidad</label>
              <Input
                type='text'
                register={register('nationality')}
                className='w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
              />
              {errors.nationality && <p className='text-red-600 text-sm mt-1'>{errors.nationality.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className='block font-semibold mb-1'>Teléfono</label>
              <Input
                type='tel'
                register={register('phone')}
                className='w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
              />
              {errors.phone && <p className='text-red-600 text-sm mt-1'>{errors.phone.message}</p>}
            </div>

            {/* Submit */}
            <button
              type='submit'
              className=' text-13 md:text-16 px-4 bg-yellow md:px-5 py-3 mt-4 w-full  text-black font-bold uppercase rounded-lg'>
              {isLoadingUpdate ? 'Loading...' : 'Guardar Perfil'}
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}
