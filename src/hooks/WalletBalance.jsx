import { useEffect, useState } from "react";
import { ethers } from "ethers";

function useWalletBalance(address) {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  const checkBalance = async () => {
    try {
      setError("");
      setBalance(null);

      if (!address || !ethers.utils.isAddress(address)) {
        setError("Invalid wallet address.");
        return;
      }

      // Connect to Alchemy or Infura provider
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-amoy.g.alchemy.com/v2/352r-cLBBgiYpchoxYaA5lNvID3iEgGT"
      );

      // Fetch balance
      const balanceWei = await provider.getBalance(address);

      // Convert balance from Wei to Ether
      const balanceEther = ethers.utils.formatEther(balanceWei);
      setBalance(balanceEther);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Failed to fetch balance. Please try again.");
    }
  };

  useEffect(() => {
    if (address)
      checkBalance(address)
  }, [address])

  return {
    address,
    balance,
    error
  };
}

export default useWalletBalance;
