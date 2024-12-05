import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill-new/dist/quill.snow.css';// Or 'quill.bubble.css'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AuthProvider from "@/context/Provider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
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
  );
}
