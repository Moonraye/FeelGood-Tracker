import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
