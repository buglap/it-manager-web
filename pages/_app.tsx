import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, from, HttpLink, ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import PrivateLayout from 'layout/PrivateLayout';
import { WidgetLoader } from 'react-cloudinary-upload-widget';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new HttpLink({
      uri: 'https://it-manager-web.vercel.app/api/graphql',
    }),
  ]),
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <WidgetLoader />
        <Head>
          <title>{pageProps.name} | IT-Manager</title>
        </Head>
        <PrivateLayout pageAuth={pageProps.auth}>
          <Component {...pageProps} />
        </PrivateLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;