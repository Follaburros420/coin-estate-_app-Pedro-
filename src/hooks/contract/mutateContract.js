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


export const useMutateTransfer = () => {
  const { data: user } = useQueryGetUser()

  const mutationFn = async ({ address }) => {
    const config = {
      method: "POST", // Use DELETE method for deletion
      url: `${endPoint}/userInstants/store`, // Update to the correct deletion endpoint
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      // data: {
      //   recipient: address,
      //   amount: '0.05',
      //   email: user?.email
      // }, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    enabled: !!user?.email,
    onError: (res) => {
      console.log({ res })
      toast.error(`Error: ${res?.message}`)
    },
    onSuccess: (res) => {
      toast.success(`Purchased`)
    },
  });
};