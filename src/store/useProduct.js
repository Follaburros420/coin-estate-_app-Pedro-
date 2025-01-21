import { create } from 'zustand';

export const usePropertyStates = create((set) => ({
  initailPropert: null,
  setInitailPropert: (value) =>
    set({
      initailPropert: value,
    }),
}));
