import { create } from 'zustand';

export const useGlobalStates = create((set) => ({
  activeTab: null,
  secSelectedToken: null,
  selectedToken: null,
  isOpenModal: false,
  simulator: {
    PropertyValueWithTime: [],
    projectsOnInterest: null,
    chartData: null,
  },
  setToken: (value) =>
    set({
      selectedToken: value,
    }),
  setSecToken: (value) =>
    set({
      secSelectedToken: value,
    }),
  setActiveTab: (value) =>
    set({
      activeTab: value,
    }),

  setModal: (value) =>
    set({
      isOpenModal: value,
    }),
  setModal: (value) =>
    set({
      isOpenModal: value,
    }),
  setSimulator: (value) =>
    set({
      simulator: value,
    }),
}));
