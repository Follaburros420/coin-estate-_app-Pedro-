import { useCallback } from 'react';
import * as yup from 'yup';
import Input from '@/components/Input';
import Previews from '@/components/PreviewSec';
import CustomSelect from '@/components/Select';
import { useMutateCreateProperty, useMutateUploadFiles, useMutateUploadMultiFiles } from '@/hooks/mutation';
import Layout from '@/layout/admin';
import { useForm } from 'react-hook-form';

const validationSchema = yup.object({
  name: yup.string().required('House Type is required'),
  totalInvestmentPrice: yup.number().required('total investment price is required'),
  description: yup
    .string()
    .required('Description is mandatory')
    .min(1, 'Description must be at least 20 characters')
    .max(200, 'Description must be at most 200 characters'),
  bedRoom: yup.number().required('bedRoom required'),
  bathRoom: yup.number().required('bathRoom required'),
  roomSize: yup.number().required('roomSize required'),
  constructionYear: yup.string().required('constructionYear required'),
  propertyMaintenance: yup.number().required('propertyMaintenance required'),
  // attributes: yup
  //   .array()
  //   .of(yup.boolean())
  //   .test('atLeastOne', 'At least one feature must be selected', (value) => value.filter((val) => val).length > 0),
  saleStatus: yup.string().required('please select an option'),
  houseType: yup.string().required('location is required'),
  location: yup.string().required('location is required'),
  netAnualIncome: yup.number().required('net anual income is required'),
  propertyType: yup.string().required('please select Property Type an option'),
  tokenPrice: yup.number().required('token price is required'),
  expectedIncome: yup.number().required('expected income is required'),
  roiExpected: yup.number().required('roi expected income is required'),
  availableTokens: yup.number().required('available tokens income is required'),
  expectedAnnual: yup.number().required('expected annual is required'),
  averageDollar: yup.number().required('average dollar is required'),
  totalReturn: yup.number().required('total return is required'),
  attractive: yup.string().required('attractive is required'),
  //======================= finance price================================
  propertyPrice: yup.number().required('property price is required'),
  renovations: yup.number().required('renovations is required'),
  tokenizationCosts: yup.number().required('tokenization costs is required'),
  commercialCosts: yup.number().required('commercial costs is required'),
  legalCosts: yup.number().required('legal costs is required'),
  dueDiligence: yup.number().required('due diligence is required'),
  financialReserves: yup.number().required('financial reserves is required'),
  difference4x: yup.number().required('difference 4x1000 is required'),
  supplyFee: yup.number().required('supplyFee is required'),
  marketingPlan: yup.number().required('marketing plan is required'),
  grossIncome: yup.number().required('gross income is required'),
  management: yup.number().required('management is required'),
  taxes: yup.number().required('taxes is required'),
  insurance: yup.number().required('insurance is required'),
  SPVMaintenance: yup.number().required('SPV Maintenance is required'),
  vacancyReserve: yup.number().required('vacancy reserve is required'),
  SPVCreation: yup.number().required('SPVCreation is required'),
  closingCosts: yup.number().required('closing costs is required'),
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

export default function Home({ options }) {
  const resolver = useYupValidationResolver(validationSchema);
  const { mutate: mutateUploadMainFile, data: mainImageData, isPending: isLoadingMain } = useMutateUploadFiles();
  const {
    mutate: mutateMultiImages,
    isPending: isUploadingMultiFiles,
    data: multiFilesList,
  } = useMutateUploadMultiFiles();
  const { mutate: createProperty, isPending: isLoadingCreateNfts } = useMutateCreateProperty();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver,
  });

  function handleFormSubmit(value) {
    // if (mainImageData?.IpfsHash && multiFilesList?.length > 0) {
      const defaultValues = {
        ...value,
        image: mainImageData?.IpfsHash || 'QmTsTAMASbvwfGUxhqdV48h8HG55v3PT4eGVjLYQ8SCE1R',
        subImages: multiFilesList || ['QmVVEGcA8S7k5ewTdEf33hXnecQYT3YRTyH828VrJ7YwZU'],
        email: 'demo@gmail.com',
      };
      createProperty(defaultValues);
    // }else{
      // toast.error('data is missing')
    // }
  }

  const step = '0.001'

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
              Create Property
            </p>
            <div className='mt-10 font-medium text-18 leading-5 mb-[9px] text-start w-full mx-auto'>
              Main Image
              <Previews
                onChange={(file) => {
                  mutateUploadMainFile(file[0]);
                }}
              />
              {isLoadingMain && 'Uploading...'}
            </div>
            <div className='font-medium text-18 leading-5 mb-[9px] text-start w-full mx-auto'>
              SubImages
              <Previews
                onChange={(values) => mutateMultiImages(values)}
              />
              {isUploadingMultiFiles && 'Uploading To Server ...'}
            </div>

            <form className='w-full'>
              <div className='w-full'>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                    className='py-2'
                    type='text'
                    Label={'Title'}
                    placeholder='House Style'
                    error={errors?.name}
                    register={register('name')}
                  />

                  <Input
                    type='number'
                    step={step}
                    Label={'Total investment price'}
                    placeholder='total investment price'
                    error={errors?.totalInvestmentPrice}
                    register={register('totalInvestmentPrice')}
                    className='py-2'
                  />
                </div>


                {/* ================================== main token Price ================================= */}

                <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                    className='py-2'
                    type='number'
                    step={step}
                    Label={'Token Price'}
                    placeholder='Token Price'
                    error={errors?.tokenPrice}
                    register={register('tokenPrice')}
                  />

                  <Input
                    type='number'
                    step={step}
                    Label={'Expected Income'}
                    placeholder='Expected Income'
                    error={errors?.expectedIncome}
                    register={register('expectedIncome')}
                    className='py-2'
                  />

                  <Input
                    className='py-2'
                    type='number'
                    step={step}
                    Label={'ROI Expected'}
                    placeholder='ROI Expected'
                    error={errors?.roiExpected}
                    register={register('roiExpected')}
                  />
                  <Input
                    className='py-2'
                    type='number'
                    step={step}
                    Label={'Expected Annual'}
                    placeholder='Expected Annual'
                    error={errors?.expectedAnnual}
                    register={register('expectedAnnual')}
                  />

                  <Input
                    className='py-2'
                    type='number'
                    step={step}
                    Label={'Average Dollar'}
                    placeholder='Average Dollar'
                    error={errors?.averageDollar}
                    register={register('averageDollar')}
                  />

                  <Input
                    className='py-2'
                    type='number'
                    step={step}
                    Label={'Total Return'}
                    placeholder='TotalReturn'
                    error={errors?.totalReturn}
                    register={register('totalReturn')}
                  />

                  <Input
                    type='number'
                    step={step}
                    Label={'Available Tokens'}
                    placeholder='Available Tokens'
                    error={errors?.availableTokens}
                    register={register('availableTokens')}
                    className='py-2'
                  />

                  <CustomSelect
                    label={'Property Type'}
                    error={errors.propertyType}
                    control={control}
                    name='propertyType'
                    options={['Financing', 'In Operation']}
                  />
                </div>



                {/* ====================== field old changes ======================== */}

                <div className='w-full mt-3'>
                  <div>
                    <label>Description</label>
                    <textarea
                      {...register('description')}
                      className={`outline-none border border-gray-light bg-[transparent] rounded-lg p-3 w-full ${errors.textArea ? 'border-red' : ''
                        }`}
                      rows={8}
                      placeholder='Type your Description'
                    />
                    {errors?.description && <p>{errors?.description?.message}</p>}
                  </div>

                  <div>
                    <label>Why is it attractive?</label>
                    <textarea
                      {...register('attractive')}
                      className={`outline-none border border-gray-light bg-[transparent] rounded-lg p-3 w-full ${errors.attractive ? 'border-red' : ''
                        }`}
                      rows={8}
                      placeholder='Type your Description'
                    />
                    {errors?.attractive && <p>{errors?.attractive?.message}</p>}
                  </div>

                </div>
              </div>
              {/* ========dropdown====== */}

              <div className='rounded-lg outline-none'>
                {/* ====================== Projections section ================ */}
                <p className='font-bold uppercase mt-4 text-20 text-yellow'>Projections</p>
                <hr className='text-yellow' />
                <div className='grid grid-cols-2 gap-4 '>
                  <Input
                    Label={'NO Of BedRoom'}
                    placeholder='2'
                    type='number'
                    step={step}
                    error={errors?.bedRoom}
                    register={register('bedRoom')}
                  />
                  <Input
                    Label={'NO Of BathRoom'}
                    placeholder='4'
                    type='number'
                    step={step}
                    error={errors?.bathRoom}
                    register={register('bathRoom')}
                  />
                  <Input
                    Label={'Room Size'}
                    type='number'
                    step={step}
                    placeholder='1000sfq'
                    error={errors?.roomSize}
                    register={register('roomSize')}
                  />
                  <Input
                    Label={'Construction Year'}
                    placeholder='2010..'
                    type='number'
                    step={step}
                    error={errors?.constructionYear}
                    register={register('constructionYear')}
                  />

                  {/* new Fields */}

                  <Input
                    Label={'net anual income'}
                    type='number'
                    step={step}
                    placeholder='32 eth'
                    error={errors?.netAnualIncome}
                    register={register('netAnualIncome')}
                  />
                  <Input
                    Label={'Location'}
                    type='text'
                    placeholder='6503 Castor Dr, Madison, AL 35757'
                    error={errors?.location}
                    register={register('location')}
                  />

                  <div className='w-full'>
                    <CustomSelect
                      label={'Status'}
                      error={errors.saleStatus}
                      control={control}
                      name='saleStatus'
                      options={['sold', 'for sale', 'for rent']}
                    />
                  </div>

                  <div className='w-full'>
                    <CustomSelect
                      label={'Select House'}
                      error={errors.houseType}
                      control={control}
                      name='houseType'
                      options={['new', 'old', 'refurnished']}
                    />
                  </div>
                </div>
              </div>

              {/* ====================== finance old change ================ */}
              <p className='font-bold uppercase mt-4 text-20 text-yellow'>Financial</p>
              <hr className='text-yellow' />
              <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Property Price'}
                  placeholder='Property Price'
                  error={errors?.propertyPrice}
                  register={register('propertyPrice')}
                />

                <Input
                  type='number'
                  step={step}
                  Label={'Renovations'}
                  placeholder='Renovations'
                  error={errors?.renovations}
                  register={register('renovations')}
                  className='py-2'
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Tokenization Costs'}
                  placeholder='Tokenization Costs'
                  error={errors?.tokenizationCosts}
                  register={register('tokenizationCosts')}
                />
                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Commercial Costs'}
                  placeholder='Commercial Costs'
                  error={errors?.commercialCosts}
                  register={register('commercialCosts')}
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Legal Costs'}
                  placeholder='Legal Costs'
                  error={errors?.legalCosts}
                  register={register('legalCosts')}
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Due Diligence'}
                  placeholder='Due Diligence'
                  error={errors?.dueDiligence}
                  register={register('dueDiligence')}
                />

                <Input
                  type='number'
                  step={step}
                  Label={'Financial Reserves'}
                  placeholder='Financial Reserves'
                  error={errors?.financialReserves}
                  register={register('financialReserves')}
                  className='py-2'
                />

                {/* new list 9 */}
                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'4X1000'}
                  placeholder='4X1000'
                  error={errors?.difference4x}
                  register={register('difference4x')}
                />

                <Input
                  type='number'
                  step={step}
                  Label={'Supply Fee'}
                  placeholder='Supply Fee'
                  error={errors?.supplyFee}
                  register={register('supplyFee')}
                  className='py-2'
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Marketing Plan'}
                  placeholder='Marketing Plan'
                  error={errors?.marketingPlan}
                  register={register('marketingPlan')}
                />
                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Gross Income'}
                  placeholder='Gross Income'
                  error={errors?.grossIncome}
                  register={register('grossIncome')}
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Management'}
                  placeholder='Management'
                  error={errors?.management}
                  register={register('management')}
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Taxes'}
                  placeholder='Taxes'
                  error={errors?.taxes}
                  register={register('taxes')}
                />

                <Input
                  type='number'
                  step={step}
                  Label={'Insurance'}
                  placeholder='Insurance'
                  error={errors?.insurance}
                  register={register('insurance')}
                  className='py-2'
                />

                <Input
                  type='number'
                  step={step}
                  Label={'Property Maintenance'}
                  placeholder='Property Maintenance'
                  error={errors?.propertyMaintenance}
                  register={register('propertyMaintenance')}
                  className='py-2'
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'SPV Maintenance'}
                  placeholder='SPV Maintenance'
                  error={errors?.SPVMaintenance}
                  register={register('SPVMaintenance')}
                />

                <Input
                  className='py-2'
                  type='number'
                  step={step}
                  Label={'Vacancy Reserve'}
                  placeholder='Vacancy Reserve'
                  error={errors?.vacancyReserve}
                  register={register('vacancyReserve')}
                />

                <Input
                  type='number'
                  step={step}
                  inputmode="decimal"
                  Label={'SPV Creation'}
                  placeholder='SPV Creation'
                  error={errors?.SPVCreation}
                  register={register('SPVCreation')}
                  className='py-2'
                />

                <Input
                  type='number'
                  step={step}
                  Label={'Closing Costs'}
                  placeholder='Closing Costs'
                  error={errors?.closingCosts}
                  register={register('closingCosts')}
                  className='py-2'
                />

              </div>


              {/* ===================== end finance section ============ */}
              {/* <p className='font-bold uppercase mt-4 text-20 text-yellow'>Options</p>
              <hr className='text-yellow' /> */}
              {/* <div className={clsxm('grid grid-cols-1 xsm:grid-cols-2 gap-3 md:grid-cols-4  mx-auto ')}>
                {featureData.map((items, idx) => {
                  return (
                    <div key={items.id} className={clsxm()}>
                      <div className='flex gap-[6px] md:gap-[10px] py-2 md:py-[13px] items-center'>
                        <label className='w-6 h-6 rounded-[100%] overflow-hidden bg-blue-300 flex items-center justify-center border '>
                          <input
                            type='checkbox'
                            {...register(`attributes.${idx}`)}
                            className='w-[32px] h-[32px] rounded-[100%] overflow-hidden outline-none'
                          />

                        </label>

                        <p className='text-white leading-[30px] md:leading-7 font-normal text-16 font-Poppins'>
                          {items.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div> */}
              <div className='w-full max-w-[500px] mt-16 mx-auto'>
                <button
                  className=' text-13 md:text-16 px-4 md:px-5 py-3 mt-4 w-full  text-black font-bold uppercase rounded-lg border'
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
