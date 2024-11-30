
import { useCallback, useEffect } from 'react';
import * as yup from 'yup';

import Input from '@/components/Input';
import Previews from '@/components/PreviewSec';
// import QuillEditor from '@/components/QuillEditor';
import { useMutateCreateBlog, useMutateUpdateBlog, useMutateUploadFiles } from '@/hooks/mutation';
import Layout from '@/layout/admin';
import clsxm from '@/utils/clsxm';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import dynamic from "next/dynamic";
import { useQueryGetBlogList } from '@/hooks/query';
import { useSearchParams } from 'next/navigation';

const QuillEditor = dynamic(() => import('@/components/QuillEditor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const validationSchema = yup.object({
  heading: yup.string().required('heading is required'),
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Name is required'),
      text_details: yup.string().required('Details are required'),
    })
  ),
  details: yup.string().required('Details is required'),
  description: yup
    .string()
    .required('Description is mandatory'),
  subheading: yup.string().required('constructionYear required')
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

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')
  const resolver = useYupValidationResolver(validationSchema);
  const { mutate: mutateUploadMainFile, data: mainImageData, isPending: isLoadingMain } = useMutateUploadFiles();

  const { mutate: createBlog, isPending: isLoadingCreateNfts } = useMutateUpdateBlog();
  const { data: blogList } = useQueryGetBlogList()

  const selectedBlog = blogList?.filter((item) => item.id === id)?.[0];


  const initalValues = {
    ...selectedBlog
  }

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      items: [{ name: '', text_details: '' }],
    },
  });


  useEffect(() => {
    reset(initalValues)
  }, [selectedBlog])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  function handleFormSubmit(value) {
    createBlog({ ...value, image: mainImageData?.IpfsHash || selectedBlog?.image })
  }

  return (
    <div>
      <Layout>
        <div className='pt-20 p-12'>

          <div
            onSubmit={handleSubmit((data) => {
              handleFormSubmit(data);
            })}
            className=' w-full px-8  mx-auto mb-20 bg-black-600 max-w-[1290px] py-8 rounded-lg  '>
            <p className='mt-[20px] text-white text-center  uppercase text-30 md:text-48 font-semibold leading-9 md:leading-[58px]'>
              Create Blog
            </p>
            <form className=' w-full '>
              <div className=' w-full '>
                <Input
                  className='py-4'
                  type='text'
                  Label={'Heading'}
                  placeholder='heading'
                  error={errors?.heading}
                  register={register('heading')}
                />
                <div className='mt-3'>
                  <label>Description</label>
                  <textarea
                    {...register('description')}
                    className={`outline-none border bg-[transparent] border-gray-light rounded-lg p-3 w-full ${errors.textArea ? 'border-red' : ''}`}
                    rows={8}
                    placeholder='Type your Description'
                  />
                  {errors?.description && <p>{errors?.description?.message}</p>}
                </div>
              </div>
              <hr className='text-gray-hover my-6' />
              <div className='grid grid-cols-2 gap-4'>

                <div className=' w-full '>
                  <Input
                    className='py-4'
                    type='text'
                    Label={'Subheading'}
                    placeholder='subheading'
                    error={errors?.subheading}
                    register={register('subheading')}
                  />
                  <div className='mt-3'>
                    <label>Details</label>
                    <textarea
                      {...register('details')}
                      className={`outline-none border border-gray-light bg-[transparent] rounded-lg p-3 w-full ${errors.details ? 'border-red' : ''}`}
                      rows={8}
                      placeholder='Type your Description'
                    />
                    {errors?.details && <p>{errors?.details?.message}</p>}
                  </div>
                </div>

                <div
                  className=''
                >
                  <p className=' font-medium text-18 leading-5 mb-[9px] text-start w-full mx-auto '>
                    Image
                  </p>

                  <Previews
                    onChange={(file) => {
                      mutateUploadMainFile(file[0]);
                    }}
                  />
                  {isLoadingMain && 'Uploading...'}
                </div>

              </div>
              <hr className='text-gray-hover my-6' />
              {/* ========dropdown====== */}

              <div className='rounded-lg outline-none'>
                <p className=' text-18 py-2 font-semibold mt-10'>Blog Details</p>
                <div className=''>
                  {fields?.map((item, index) => (
                    <div key={item?.name} className="input-group relative bg-white p-4 mb-5 rounded-lg">
                      <label
                        className={clsxm(
                          "text-[#000] text-14 sm:text-md font-bold",
                          errors?.items?.[index]?.name ? "text-[red] " : "text-[#000] font-bold",
                        )}
                      >
                        Title
                      </label>
                      <Input
                        register={{ ...register(`items[${index}].name`) }}
                        placeholder="Name"
                        className={clsxm('w-full p-2 text-black-100 my-2 rounded-[8px]',
                          errors?.items?.[index]?.name ? 'border border-red-100' : ' border border-gray-light'
                        )}
                        error={errors?.items?.[index]?.name}
                      />

                      <Controller
                        name={`items[${index}].text_details`}
                        control={control}
                        defaultValue={item?.text_details || ''}
                        render={({ field }) => (
                          <QuillEditor
                            {...field}
                            placeholder="Enter details..."
                            style={{ color: '#000' }}
                          />
                        )}
                      />

                      <button
                        className='absolute z-20 top-2 right-4 bg-yellow p-1 flex justify-center items-center rounded-lg'
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <img src="/assets/svg/close.svg" alt="" className='w-6 h-6' />
                      </button>
                    </div>
                  ))}
                </div>
                <button className='bg-yellow p-3 ml-auto mt-4 rounded-lg flex justify-between items-center gap-2' type="button" onClick={() => append({ name: '', value: '' })}>
                  <img src="/assets/svg/add.svg" alt="" /> Add More
                </button>
              </div>

              <div className=' w-full max-w-[500px] mx-auto '>
                <button
                  className=' text-13 md:text-16 px-4 bg-yellow md:px-5 py-3 mt-4 w-full  text-black font-bold uppercase rounded-lg'
                  type='submit'>
                  {isLoadingCreateNfts ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </Layout>
    </div>
  );
}
