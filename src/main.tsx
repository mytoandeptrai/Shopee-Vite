import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/** libraries */
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'

/** styles */
import '~/assets/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'sweetalert2/src/sweetalert2.scss'
import 'swiper/css'
import 'react-quill/dist/quill.snow.css'

/** Initialize languages */
import '~/locales/i18n'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
)
