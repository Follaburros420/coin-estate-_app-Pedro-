import BracketSuggestionInput from '@/components/Admin/SuggestionInput';
import { useMutationCreateDocument } from '@/hooks/mutation';
import Layout from '@/layout/admin';
import { useYupValidationResolver } from '@/utils/helper';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export const validationSchemaDocument = yup.object({
  agreement_purpose: yup.string().required('purpose of agreement is required'),
  contribution_payment: yup.string().required('contribution & payment is required'),
  contribution_payment1: yup.string().required('contribution & payment is required'),
  management_administration: yup.string().required('management & administration is required'),
  management_administration1: yup.string().required('management & administration is required'),
  profit_distribution: yup.string().required('profit distribution is required'),
  profit_distribution1: yup.string().required('profit distribution is required'),
  duration_termination: yup.string().required('duration & termination is required'),
  duration_termination1: yup.string().required('duration & termination is required'),
  responsibility_risks: yup.string().required('responsibility & risks is required'),
  responsibility_risks1: yup.string().required('responsibility & risks is required'),
  data_protection: yup.string().required('data protection & confidentiality is required'),
  data_protection1: yup.string().required('data protection & confidentiality is required'),
  governing_law: yup.string().required('governing law & dispute resolution is required'),
  governing_law1: yup.string().required('governing law & dispute resolution is required'),
  acceptance_signature: yup.string().required('acceptance & signature is required'),
  acceptance_signature1: yup.string().required('acceptance & signature is required'),
});

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const resolver = useYupValidationResolver(validationSchemaDocument);
  // const { mutate: mutateUploadMainFile, data: mainImageData, isPending: isLoadingMain } = useMutateUploadFiles();

  const { mutate: createDocument, isPending: isLoadingDocument } = useMutationCreateDocument();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver,
  });

  function handleFormSubmit(value) {
    createDocument({ ...value, propertyId: id });
  }
  return (
    <Layout>
      <div className='pt-20 p-12'>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className=' w-full px-8  mx-auto mb-20 bg-black-600 max-w-[1290px] py-8 rounded-lg  '>
          <p className='text-2xl font-bold text-center'>Participation Agreement</p>
          {/* <BracketSuggestionInput placeholder='heading' error={errors?.heading} register={register('heading')} /> */}
          <div className='grid grid-cols-2 gap-4 mt-5'>
            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Purpose of the Agreement</label>
              <Controller
                name='agreement_purpose'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Purpose of the Agreement'
                    error={errors?.agreement_purpose}
                  />
                )}
              />
            </div>
            <div className=''>
              <label className='text-white text-14 sm:text-md capitalize'>Contribution & Payment</label>
              <Controller
                name='contribution_payment'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Contribution & Payment'
                    error={errors?.contribution_payment}
                  />
                )}
              />
              <Controller
                name='contribution_payment1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Contribution & Payment'
                    error={errors?.contribution_payment1}
                  />
                )}
              />
            </div>

            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Management & Administration</label>
              <Controller
                name='management_administration'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Management & Administration'
                    error={errors?.management_administration}
                  />
                )}
              />
              <Controller
                name='management_administration1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Management & Administration'
                    error={errors?.management_administration1}
                  />
                )}
              />
            </div>

            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Profit Distribution</label>
              <Controller
                name='profit_distribution'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Profit Distribution'
                    error={errors?.profit_distribution}
                  />
                )}
              />
              <Controller
                name='profit_distribution1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Profit Distribution'
                    error={errors?.profit_distribution1}
                  />
                )}
              />
            </div>
            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Duration & Termination </label>
              <Controller
                name='duration_termination'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Duration & Termination'
                    error={errors?.duration_termination}
                  />
                )}
              />
              <Controller
                name='duration_termination1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Duration & Termination'
                    error={errors?.duration_termination1}
                  />
                )}
              />
            </div>
            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Responsibility & Risks</label>
              <Controller
                name='responsibility_risks'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Responsibility & Risks'
                    error={errors?.responsibility_risks}
                  />
                )}
              />
              <Controller
                name='responsibility_risks1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Responsibility & Risks'
                    error={errors?.responsibility_risks1}
                  />
                )}
              />
            </div>
            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Data Protection & Confidentiality</label>
              <Controller
                name='data_protection'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Data Protection & Confidentiality'
                    error={errors?.data_protection}
                  />
                )}
              />
              <Controller
                name='data_protection1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Data Protection & Confidentiality'
                    error={errors?.data_protection1}
                  />
                )}
              />
            </div>
            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Governing Law & Dispute Resolution </label>
              <Controller
                name='governing_law'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Governing Law & Dispute Resolution'
                    error={errors?.governing_law}
                  />
                )}
              />
              <Controller
                name='governing_law1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Governing Law & Dispute Resolution'
                    error={errors?.governing_law1}
                  />
                )}
              />
            </div>
            <div>
              <label className='text-white text-14 sm:text-md capitalize'>Acceptance & Signature</label>
              <Controller
                name='acceptance_signature'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Acceptance & Signature'
                    error={errors?.acceptance_signature}
                  />
                )}
              />
              <Controller
                name='acceptance_signature1'
                control={control}
                render={({ field }) => (
                  <BracketSuggestionInput
                    {...field}
                    placeholder='Enter Acceptance & Signature'
                    error={errors?.acceptance_signature1}
                  />
                )}
              />
            </div>
          </div>
          {/* <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Submit</button> */}
          <div className=' w-full max-w-[500px] mx-auto mt-8'>
            <button
              className=' text-13 md:text-16 px-4 text-black-100 bg-yellow md:px-5 py-3 mt-4 w-full  text-black font-bold uppercase rounded-lg'
              type='submit'>
              {isLoadingDocument ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Page;
