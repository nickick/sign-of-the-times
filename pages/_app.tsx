/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import Head from 'next/head';
import theme from '../src/theme';
import Layout from '../src/Layout';
import ContractContextProvider from '../src/ContractContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta property="og:image" content="https://replaceme.xyz/the-beginning-is-near.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="760" />
        <meta property="og:image:alt" content="Signs of the Times" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Signs of the Times NFT Open Edition drop by Brendan North" />
        <meta property="og:title" content="Signs of the Times" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContractContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContractContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
