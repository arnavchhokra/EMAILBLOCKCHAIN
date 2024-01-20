import type { AppProps } from 'next/app'

import { AuthProvider, SaasProvider } from '@saas-ui/react'
import { Layout } from 'components/layout'
import "../src/output.css"
import theme from '../theme'
import mailReducer from './mail/reducer';
import {initialState} from "./mail/reducer"
import store from "./mail/store"
import React, { createContext, useContext, useReducer } from 'react';

export const MailContext = createContext();

const MailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mailReducer, initialState);

  return (
    <MailContext.Provider value={{ state, dispatch }}>
      {children}
    </MailContext.Provider>
  );
};

export const useMail = () => {
  const context = useContext(MailContext);
  if (!context) {
    throw new Error('useMail must be used within a MailProvider');
  }
  return context;
};



function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header,  } = pageProps

  return (
    <SaasProvider theme={theme}>
      <AuthProvider>
      <MailProvider>
        <Layout
          announcementProps={announcement}
          headerProps={header}
        >
          <Component class='mt-4' {...pageProps} />
        </Layout>
        </MailProvider>
      </AuthProvider>
    </SaasProvider>
  )
}

export default MyApp
