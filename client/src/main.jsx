import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from './moon-ui/Toast'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
