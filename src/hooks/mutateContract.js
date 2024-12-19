import { useGlobalStates } from "@/store/useGlobalStates";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

// purchaseWMP (0x74724ce8)
export const useMutateApproveNft = () => {
  const { address } = useAccount();
  const { BEACON_CONTRACT, FACTORY_CONTRACT, TOKEN_CONTRACT, } = useGlobalStates((state) => state.contract);
  console.log({BEACON_CONTRACT, TOKEN_CONTRACT})

  const mutationFn = async (id) => {
    const tx = await TOKEN_CONTRACT.approve(address, id, 1, 0);
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