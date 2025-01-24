import WalletPage from '@/components/Dashboard/Wallet/WalletPage';
import { useQueryGetActiveResults } from '@/hooks/query';
import Layout from '@/layout/Dashboard';
import React from 'react';

export default function adminWallet() {
  const { data: userData, refetch } = useQueryGetActiveResults();
  console.log('🚀 ~ adminWallet ~ userData:', userData);
  return (
    <div>
      <Layout>
        <div className='my-10'>
          <button onClick={()=>refetch()}>Click me</button>
          <WalletPage />
        </div>
      </Layout>
    </div>
  );
}
