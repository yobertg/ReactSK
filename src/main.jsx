import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './Pages/Context/AuthContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
     <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Toaster position="top-right" />
        <App />
      </AuthProvider>
       
     </QueryClientProvider>
   
  </StrictMode>,
)
