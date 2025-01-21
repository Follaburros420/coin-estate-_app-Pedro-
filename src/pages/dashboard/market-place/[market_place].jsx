import HeaderSection from '@/components/Dashboard/MarketPlace/HeaderSection';
import Tabs from '@/components/Dashboard/MarketPlace/Tabs';
import { useQueryGetNftsFromContract } from '@/hooks/contract/query';
import { useQueryGetMintedTokenlist, useQueryGetProperty } from '@/hooks/query';
import Layout from '@/layout/Dashboard';
import { useParams } from 'next/navigation';
import React from 'react';

export default function MarketPlace() {
  const { data: getPropertyList } = useQueryGetProperty();
  const params = useParams();
  const { data:mintedNftsList } = useQueryGetMintedTokenlist();
  const selectedNFT = getPropertyList?.filter((item) => item.id === params?.market_place)?.[0];

  const mintedToken = mintedNftsList?.filter((item) => item.tokenId === selectedNFT?.id)?.[0];
  return (
    <div>
      <Layout>
        <div className='px-6 lg:px-10 '>
          <div className='w-full max-w-[1161px] mx-auto my-10 '>
            <HeaderSection tokenAddress={mintedToken?.tokenAddress} selectedNFT={selectedNFT} />
            <Tabs selectedNFT={selectedNFT} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
