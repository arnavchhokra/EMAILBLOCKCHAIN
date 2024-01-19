import type { AppProps } from 'next/app'

import { AuthProvider, SaasProvider } from '@saas-ui/react'
import { Layout } from 'components/layout'
import "../src/output.css"
import theme from '../theme'
import { Provider } from 'react-redux';
import store from "./mail/store"

function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header,  } = pageProps

  return (
    <SaasProvider theme={theme}>
      <AuthProvider>
        <Provider store={store}>
        <Layout
          announcementProps={announcement}
          headerProps={header}
        >
          <Component class='mt-4' {...pageProps} />
        </Layout>
        </Provider>
      </AuthProvider>
    </SaasProvider>
  )
}

export default MyApp
