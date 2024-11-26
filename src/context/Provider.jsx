'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Provider({ children }) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
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
        {children}
      </QueryClientProvider>
    </div>
  )
}
