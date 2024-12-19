import AuthProvider, { wagmiAdapter } from "@/context/Provider";
import "@/styles/globals.css";
import { arbitrum, bscTestnet, mainnet } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-quill-new/dist/quill.snow.css'; // Or 'quill.bubble.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { cookieToInitialState, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "c27cea2ac282b1d3b59d8ff302544d24"

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
  name: 'appkit-example',
  description: 'AppKit Example',
  url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [bscTestnet],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export default function App({ Component, pageProps }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig)

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}>
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
    </WagmiProvider>
  );
}
