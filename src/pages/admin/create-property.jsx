import GoogleMapAdmin from '@/components/Admin/GoogleLocation';
import Input from '@/components/Input';
import Previews from '@/components/PreviewSec';
import CustomSelect from '@/components/Select';
import { useMutateCreateERC884ProPerty } from '@/hooks/contract/mutateContract';
import { useMutateCreateProperty, useMutateUploadFiles, useMutateUploadMultiFiles } from '@/hooks/mutation';
import { useQueryGetUser } from '@/hooks/query';
import Layout from '@/layout/admin';
import { useYupValidationResolver } from '@/utils/helper';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import * as yup from 'yup';

const validationSchemaProperty = yup.object({
  name: yup.string(),
  totalInvestmentPrice: yup.number(),
  description: yup.string(),
  bedRoom: yup.number(),
  bathRoom: yup.number(),
  roomSize: yup.number(),
  constructionYear: yup.string(),
  propertyMaintenance: yup.number(),
  // saleStatus: yup.string(),
  // houseType: yup.string(),
  // location: yup.string(),
  netAnualIncome: yup.number(),
  propertyType: yup.string(),
  tokenPrice: yup.number(),
  expectedIncome: yup.number(),
  roiExpected: yup.number(),
  // availableTokens: yup.number(),
  expectedAnnual: yup.number(),
  averageDollar: yup.number(),
  totalReturn: yup.number(),
  attractive: yup.string(),
  //======================= finance price================================
  propertyPrice: yup.number(),
  renovations: yup.number(),
  tokenizationCosts: yup.number(),
  commercialCosts: yup.number(),
  legalCosts: yup.number(),
  dueDiligence: yup.number(),
  financialReserves: yup.number(),
  difference4x: yup.number(),
  supplyFee: yup.number(),
  marketingPlan: yup.number(),
  grossIncome: yup.number(),
  management: yup.number(),
  taxes: yup.number(),
  insurance: yup.number(),
  SPVMaintenance: yup.number(),
  vacancyReserve: yup.number(),
  SPVCreation: yup.number(),
  closingCosts: yup.number(),
  documents: yup.string(),
  listingPrice: yup.number(),
});

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const resolver = useYupValidationResolver(validationSchemaProperty);
  const { address } = useAccount();
  const { data: user } = useQueryGetUser();
  const [selected, setSelected] = useState();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver,
  });

  // const { mutate: approveChange, isPending: isLoadingApprove } = useMutateApprove()

  const { mutate: createProperty, isPending: isLoadingCreateNfts } = useMutateCreateProperty();
  const { mutate: mutateUploadMainFile, data: mainImageData, isPending: isLoadingMain } = useMutateUploadFiles();
  const {
    mutate: mutateMultiImages,
    isPending: isUploadingMultiFiles,
    data: multiFilesList,
  } = useMutateUploadMultiFiles();

  const onSuccess = () => {
    const defaultValues = {
      ...selected,
      image: mainImageData?.IpfsHash || 'QmTsTAMASbvwfGUxhqdV48h8HG55v3PT4eGVjLYQ8SCE1R',
      subImages: multiFilesList || ['QmVVEGcA8S7k5ewTdEf33hXnecQYT3YRTyH828VrJ7YwZU'],
      email: user?.email || 'demo@gmail.com',
      address: address,
      location: selectedLocation ? JSON.stringify(selectedLocation) : null,
    };
    createProperty(defaultValues);
  };
  const { mutate: createNftProperty, isPending: isLoadingCreateNftProperty } = useMutateCreateERC884ProPerty(onSuccess);

  function handleFormSubmit(value) {
    if (!address) {
      toast.error('Please connect your wallet');
    } else {
      setSelected(value);
      createNftProperty({ name: value?.name, symbols: value?.documents });
    }
  }

  const step = '0.001';
  const buttonState = isLoadingCreateNftProperty || isLoadingCreateNfts ? 'Loading...' : 'Submit';

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
            {/* <button onClick={() => approveNft()}>{isLoadingApprove ? "Loading..." : 'ApproveNft'}</button> */}
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
              <Previews onChange={(values) => mutateMultiImages(values)} />
              {isUploadingMultiFiles && 'Uploading To Server ...'}
            </div>

            <form className='w-full'>
              <div className='w-full'>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                    error={errors?.listingPrice}
                    register={register('listingPrice')}
                    className='py-2'
                  />
                  
                </div>

                {/* ================================== main token Price ================================= */}

                <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
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

                  {/* <Input
                    type='number'
                    step={step}
                    Label={'Available Tokens'}
                    placeholder='Available Tokens'
                    error={errors?.availableTokens}
                    register={register('availableTokens')}
                    className='py-2'
                  /> */}

                  <CustomSelect
                    label={'Property Type'}
                    setValue={setValue}
                    error={errors.propertyType}
                    control={control}
                    name='propertyType'
                    options={['Financing', 'In Operation']}
                  />
                  <Input
                    type='number'
                    step={step}
                    Label={'Listing Price'}
                    placeholder='Listing Price'
                    error={errors?.totalInvestmentPrice}
                    register={register('totalInvestmentPrice')}
                    className='py-2'
                  />
                </div>

                {/* ====================== field old changes ======================== */}

                <div className='w-full mt-3'>
                  <div>
                    <label>Description</label>
                    <textarea
                      {...register('description')}
                      className={`outline-none border border-gray-light bg-[transparent] rounded-lg p-3 w-full ${
                        errors.textArea ? 'border-red' : ''
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
                      className={`outline-none border border-gray-light bg-[transparent] rounded-lg p-3 w-full ${
                        errors.attractive ? 'border-red' : ''
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
                <hr className='text-yellow mb-4' />
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
                  <div className='col-span-2'>
                    <GoogleMapAdmin selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
                  </div>
                  {/* <Input
                    Label={'Location'}
                    type='text'
                    placeholder='6503 Castor Dr, Madison, AL 35757'
                    error={errors?.location}
                    register={register('location')}
                  /> */}

                  {/* <div className='w-full'> */}
                  {/* <CustomSelect
                      setValue={setValue}
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
                  </div> */}
                </div>
              </div>

              {/* ====================== finance old change ================ */}
              <p className='font-bold uppercase mt-4 text-20 text-yellow'>Financial</p>
              <hr className='text-yellow' />
              <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                  inputmode='decimal'
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
                <Input
                  type='text'
                  // step={step}
                  Label={'Documents Link'}
                  placeholder='Enter...'
                  error={errors?.documents}
                  register={register('documents')}
                  className='py-2'
                />
              </div>

              {/* ===================== end finance section ============ */}

              <div className='w-full max-w-[500px] mt-8 mx-auto'>
                <button
                  className='text-13 md:text-16 px-4 md:px-5 py-3 mt-4 w-full text-black font-bold uppercase rounded-lg border'
                  type='submit'>
                  {buttonState}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}
