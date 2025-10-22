import AuthProvider, { wagmiAdapter } from '@/context/Provider';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';
import { arbitrum, bscTestnet, mainnet, polygonAmoy } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { cookieToInitialState, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'c27cea2ac282b1d3b59d8ff302544d24';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [bscTestnet, polygonAmoy],
  defaultNetwork: bscTestnet,
  metadata,
  features: {
    analytics: true,
  },
});

const NumberFormatContext = createContext();

const NumberFormatProvider = ({ children }) => (
  <NumberFormatContext.Provider value={(num) => num?.toLocaleString('en-IN') || '0'}>
    {children}
  </NumberFormatContext.Provider>
);

export const useNumberFormat = () => useContext(NumberFormatContext);

export default function App({ Component, pageProps }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig);
  const [isClient, setIsClient] = useState(false);
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'missing-google-client-id';

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const appShell = (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <ThemeProvider>
        <NumberFormatProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider />
            <ToastContainer
              position='bottom-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='dark'
            />
            <Component {...pageProps} />
          </QueryClientProvider>
        </NumberFormatProvider>
      </ThemeProvider>
    </WagmiProvider>
  );

  return <GoogleOAuthProvider clientId={googleClientId}>{appShell}</GoogleOAuthProvider>;
}


