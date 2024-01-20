import type { AppProps } from 'next/app'

import { AuthProvider, SaasProvider } from '@saas-ui/react'
import { Layout } from 'components/layout'
import "../src/output.css"
import theme from '../theme'
import mailReducer from '../reducer';
import {initialState} from "../reducer"
import store from "../store"
import React, { createContext, useContext, useReducer, ReactNode } from 'react';


export interface YourStateType {
  mailContent: string;
  mailSender: string;
  // Add other properties as needed
}
interface MailContextProps {
  state: YourStateType;
  dispatch: React.Dispatch<any>; // Update this with your actual action types
}


export const MailContext = createContext<MailContextProps | undefined>(undefined);

interface MailProviderProps {
  children: ReactNode;
}



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
