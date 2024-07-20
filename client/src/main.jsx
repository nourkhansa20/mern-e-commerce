import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from './moon-ui/Toast'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContextProvider } from './context/useAuthContext'
import { CartContextProvider } from './context/CartContext'
import { LocalStorageContextProvider } from './context/LocalStorageContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthContextProvider>
          <LocalStorageContextProvider>
            <CartContextProvider>
              <ToastProvider>
                <RouterProvider router={router} />
              </ToastProvider>
            </CartContextProvider>
          </LocalStorageContextProvider>
        </AuthContextProvider>
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode >
)
