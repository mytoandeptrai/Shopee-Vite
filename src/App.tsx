import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ButtonScrollToTop } from '~/components/ButtonCustomize'
import { Fallback } from '~/components/Fallback'
import RootLayout from '~/layouts/rootLayout'
function App() {
  const { i18n } = useTranslation()

  return (
    <Suspense fallback={<Fallback />}>
      <BrowserRouter>
        <Helmet defaultTitle='Shopee Clone by me' htmlAttributes={{ lang: i18n.language }}>
          <meta name='description' content='Shopee Clone by me' />
        </Helmet>
        <ButtonScrollToTop />
        <ToastContainer />
        <RootLayout />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
