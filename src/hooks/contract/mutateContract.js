import { useGlobalStates } from "@/store/useGlobalStates";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useQueryGetUser } from "../query";
import { toast } from "react-toastify";

// purchaseWMP (0x74724ce8)
export const useMutateCreateERC884ProPerty = (onSuccess) => {
  const { address } = useAccount();
  const {  FACTORY_CONTRACT, TOKEN_CONTRACT, } = useGlobalStates((state) => state.contract);
  // console.log("🚀 ~ useMutateCreateERC884ProPerty ~ FACTORY_CONTRACT:", FACTORY_CONTRACT)

  const mutationFn = async ({ name, symbols }) => {
    const tx = await FACTORY_CONTRACT.createERC884(name, symbols);
    return tx?.wait();
  };

  return useMutation({
    mutationFn,
    enabled: !!address && !!FACTORY_CONTRACT && !!TOKEN_CONTRACT,
    onError: (res) => {
      console.log({ res })
      toast.error(`Error: ${res?.reason}`)
    },
    onSuccess: (res) => {
      console.log({ res });
      onSuccess()
      toast.success(`Purchased`)
    },
  });
};


export const useMutateMintNft = (onSuccess) => {
  const { address } = useAccount();
  const {  FACTORY_CONTRACT, TOKEN_CONTRACT, } = useGlobalStates((state) => state.contract);

  const mutationFn = async ({ tokenAddress,amount }) => {
    console.log({ tokenAddress,amount })
    const tx = await TOKEN_CONTRACT.mint(tokenAddress, amount);
    return tx?.wait();
  };

  return useMutation({
    mutationFn,
    enabled: !!address && !!FACTORY_CONTRACT && !!TOKEN_CONTRACT,
    onError: (res) => {
      console.log({ res })
      toast.error(`Error: ${res?.reason}`)
    },
    onSuccess: (res) => {
      console.log({ res });
      onSuccess()
      toast.success(`${res}`)
    },
  });
};


// export const useMutateApprove = (onSuccess) => {
//   const { address } = useAccount();
//   const { BEACON_CONTRACT, FACTORY_CONTRACT, TOKEN_CONTRACT, } = useGlobalStates((state) => state.contract);
//   console.log({ FACTORY_CONTRACT })

//   const mutationFn = async () => {
//     const tx = await TOKEN_CONTRACT.approve('0x50119354Aa81d47AF73CF75594069aFdFc95299c', 22);
//     return tx?.wait();
//   };

//   return useMutation({
//     mutationFn,
//     enabled: !!address && !!FACTORY_CONTRACT && !!BEACON_CONTRACT,
//     onError: (res) => {
//       console.log({ res })
//       toast.error(`Error: ${res?.message}`)
//     },
//     onSuccess: (res) => {
//       console.log({ res });
//       onSuccess()
//       toast.success(`Purchased`)
//     },
//   });
// };


