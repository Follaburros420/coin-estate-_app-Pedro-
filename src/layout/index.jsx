import { useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useQueryGetTokenCopPrice } from '@/hooks/query';
import { useMutationSendExchangeRate } from '@/hooks/mutation';

function Layout({ children }) {
  

  return (
    <div className='  flex-col min-h-screen'>
      <div className='flex-1 w-full bg-white'>
        <Navbar />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
