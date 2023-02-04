import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import RootLayout from '~/layouts/rootLayout'
function App() {
  const { i18n } = useTranslation()

  return (
    <BrowserRouter basename='/'>
      <Helmet defaultTitle='Shopee Clone by me' htmlAttributes={{ lang: i18n.language }}>
        <meta name='description' content='Shopee Clone by me' />
      </Helmet>
      <RootLayout />
    </BrowserRouter>
  )
}

export default App
