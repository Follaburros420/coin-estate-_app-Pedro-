import { useGlobalStates } from "@/store/useGlobalStates";
import { useQueryGetUser } from "../query";
import { queryKeys } from "../queryContants";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const useQueryGetNftsFromContract = () => {
  const { address } = useAccount()
  const { data: user } = useQueryGetUser()
  const queryKey = [queryKeys.getNftsFromContract, user?.email, address];
  const { FACTORY_CONTRACT, } = useGlobalStates((state) => state.contract);

  const queryFn = async () => {
    const tx = await FACTORY_CONTRACT.getAllERC884Contracts()
    return tx;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log(res);
    },
  });
};