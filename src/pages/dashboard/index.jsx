import WalletPage from '@/components/Dashboard/Wallet/WalletPage';
import Layout from '@/layout/Dashboard';

export default function adminWallet() {
  return (
    <div>
      <Layout>
        <div className='my-10'>
          <WalletPage />
        </div>
      </Layout>
    </div>
  );
}
