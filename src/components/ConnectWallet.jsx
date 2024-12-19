import { CHAIN_ID } from '@/contract'
import { useEthersSigner } from '@/hooks/ethers'
import useWalletConnector from '@/hooks/useWalletConnector'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'




export default function ConnectWallet() {
  const { address } = useAccount()
  const { onConnect } = useWalletConnector()
  const signer = useEthersSigner(CHAIN_ID)

  useEffect(() => {
    if (address) {
      onConnect()
    }
  }, [address, onConnect, signer?._address]);

  return (
    <div>
      <appkit-button />
    </div>
  )
}
