import { create } from 'zustand';

export const useGlobalStates = create((set) => ({
  contract: {
    FACTORY_CONTRACT:null,
    TOKEN_CONTRACT:null,
    chainId: null,
    address: null,
  },

  setContactDetails: (abis) =>
    set({
      contract: abis,
    }),
}));


// useMutationInitiatePayment