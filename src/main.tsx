import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router'
import { AuthProvider } from './context/AuthContext.tsx'

import {QueryClient,QueryClientProvider} from '@tanstack/react-query'




const client=new QueryClient()
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
    <Router>  
      
    <App />
    </Router>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
