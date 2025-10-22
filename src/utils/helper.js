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
  '/admin/create-document',
];

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
  name: yup.string(),
  totalInvestmentPrice: yup.number(),
  description: yup.string(),
  bedRoom: yup.number(),
  bathRoom: yup.number(),
  roomSize: yup.number(),
  constructionYear: yup.string(),
  propertyMaintenance: yup.number(),
  saleStatus: yup.string(),
  houseType: yup.string(),
  location: yup.string(),
  netAnualIncome: yup.number(),
  propertyType: yup.string(),
  tokenPrice: yup.number(),
  expectedIncome: yup.number(),
  roiExpected: yup.number(),
  availableTokens: yup.number(),
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
});

export const validationSchemaBlog = yup.object({
  heading: yup.string(),
  items: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      text_details: yup.string(),
    }),
  ),
  blogStatus: yup.string(),
  details: yup.string(),
  description: yup.string(),
  subheading: yup.string(),
});


