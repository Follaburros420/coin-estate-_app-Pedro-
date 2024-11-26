import { CHAIN_ID, abis, honiAddress, swapAddress } from '@/contract';
import { useGlobalStates } from '@/store/useGlobalStates';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { useCallback } from 'react';

const useWalletConnector = () => {
  const { address: account } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider()
  const contactDetails = useGlobalStates((state) => state.contactDetails);
  // eip155:97
  // const provider = useProvider();

  const onConnect = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(walletProvider)
      const signer = provider.getSigner();
      const chainId = await signer?.getChainId();
      const isChainId = chainId ===  CHAIN_ID;

      if (account && isChainId) {
        // instantiate contract instance and assign to component ref variable

        const SWAPCONTRACT = new ethers.Contract(swapAddress, abis.swapContractAbi, signer);
        const HONICONTRACT = new ethers.Contract(honiAddress, abis.honiContractAbi, signer);

        contactDetails({
          SWAPCONTRACT,
          HONICONTRACT,
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
  }, [account, contactDetails, walletProvider]);

  return {
    onConnect,
  };
};

export default useWalletConnector;
