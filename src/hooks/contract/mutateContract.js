import { useGlobalStates } from "@/store/useGlobalStates";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

// purchaseWMP (0x74724ce8)
export const useMutateApproveNft = () => {
  const { address } = useAccount();
  const { BEACON_CONTRACT, FACTORY_CONTRACT, TOKEN_CONTRACT, } = useGlobalStates((state) => state.contract);

  const mutationFn = async (address) => {
    const tx = await TOKEN_CONTRACT.mint(address, 10);
    return tx?.wait();
  };

  return useMutation({
    mutationFn,
    enabled: !!address && !!FACTORY_CONTRACT && !!BEACON_CONTRACT,
    onError: (res) => {
      console.log({ res })
      toast.error(`Error: ${res?.message}`)
    },
    onSuccess: (res) => {
      toast.success(`Purchased`)
    },
  });
};