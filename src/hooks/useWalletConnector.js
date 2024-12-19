import { CHAIN_ID, FactoryAbi, beaconAbi, beaconAddress, factoryAddress, tokenAbi, tokenAddress } from '@/contract';
import { useGlobalStates } from '@/store/useGlobalStates';
import { ethers } from 'ethers';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useEthersSigner } from './ethers';

const useWalletConnector = () => {
  const { address: account, chainId } = useAccount();
  const signer = useEthersSigner(CHAIN_ID)
  const setContactDetails = useGlobalStates((state) => state.setContactDetails);
  // eip155:97
  // const provider = useProvider();

  const onConnect = useCallback(async () => {
    try {
      const chainId = await signer?.getChainId();
      const isChainId = chainId === CHAIN_ID;

      if (account && isChainId) {
        const BEACON_CONTRACT = new ethers.Contract(beaconAddress, beaconAbi, signer);
        const TOKEN_CONTRACT = new ethers.Contract(tokenAddress, tokenAbi, signer);
        const FACTORY_CONTRACT = new ethers.Contract(factoryAddress, FactoryAbi, signer);
        setContactDetails({
          BEACON_CONTRACT,
          FACTORY_CONTRACT,
          TOKEN_CONTRACT,
          address: account,
          chainId,
        });
      } else {
        if (account) {
          // notify('Change Network Mumbai Testnet 80001');
        }
        console.log('network is not connected');
      }
    } catch (error) {
      console.log(error);
    }
  }, [account, setContactDetails, signer]);

  return {
    onConnect,
  };
};

export default useWalletConnector;
