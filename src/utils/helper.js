import crypto from 'crypto';
import { useCallback } from 'react';
import * as yup from 'yup';


export const handleFormateTime = (dateString) => {
  if (!dateString) return '__';
  const date = new Date(dateString);
  const day = date.getUTCDate(); // Get the day
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getUTCMonth()]; // Get the month name
  // const year = date.getUTCFullYear() + 10; // Add 10 to the year
  const year = date.getUTCFullYear(); // Add 10 to the year

  return `${day} ${month} ${year}`;
};

export const handleFormate = (email) => {
  return;
};

export const routerPaths = [
  'admin',
  'dashboard',
  '/dashboard',
  '/dashboard/my-properties',
  '/dashboard/market-place',
  '/admin/dashboard',
  '/admin/create-property',
  '/admin/create-blog',
];

// const ENCRYPTION_KEY = crypto.createHash('sha256').update(process.env.ENCRYPTION_KEY).digest(); // Derive 32-byte key
// const IV_LENGTH = 16;
// function encrypt(text) {
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// function decrypt(text) {
//   const [iv, encrypted] = text.split(':');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
//   let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }


export const useYupValidationResolver = (validationSchema) =>
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

export const validationSchemaProperty = yup.object({
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



export const validationSchemaBlog = yup.object({
  heading: yup.string().required('heading is required'),
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Name is required'),
      // text_details: yup.string().required('Details are required'),
      text_details: yup.string()
        .required('Text details are required')
        .matches(/<\/?[a-z][\s\S]*>/i, 'Invalid content') // Validate HTML if necessary

    })
  ),
  blogStatus: yup.string().required('blogStatus is required'),
  details: yup.string().required('Details is required'),
  description: yup
    .string()
    .required('Description is mandatory'),
  subheading: yup.string().required('constructionYear required')
});
