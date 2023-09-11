// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Redux Import
import { persistor, store } from '@/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import ProtectedRoute from '@/components/ProtectedRoute'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from '@/theme/ThemeComponent'
import Notification from '@/components/Notification'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from '@/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from '@/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

// Date Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali'
import { faIR } from '@mui/x-date-pickers/locales'

// ** Wagmi Imports
import { WagmiProvider } from '@/components/wagmi/providers'

const persianLocale = faIR.components.MuiLocalizationProvider.defaultProps.localeText

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout =
    Component.getLayout ??
    (page => (
      <WagmiProvider>
        <ProtectedRoute>
          <UserLayout>
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali} localeText={persianLocale}>
              {page}
            </LocalizationProvider>
            <Notification />
          </UserLayout>
        </ProtectedRoute>
      </WagmiProvider>
    ))

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`${themeConfig.templateName}`}</title>
            <meta name='description' content={`${themeConfig.templateName}`} />
            <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>

          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => {
                return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
