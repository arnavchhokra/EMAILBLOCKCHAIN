import type { AppProps } from 'next/app'

import { AuthProvider, SaasProvider } from '@saas-ui/react'
import { Layout } from 'components/layout'
import "../src/output.css"
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header,  } = pageProps

  return (
    <SaasProvider theme={theme}>
      <AuthProvider>
        <Layout
          announcementProps={announcement}
          headerProps={header}
        >
          <Component class='mt-4' {...pageProps} />
        </Layout>
      </AuthProvider>
    </SaasProvider>
  )
}

export default MyApp
