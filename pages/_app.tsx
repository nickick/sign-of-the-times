/* eslint-disable react/jsx-props-no-spreading */

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import Head from 'next/head';
import theme from '../src/theme';
import Layout from '../src/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta property="og:image" content="https://replaceme.xyz/og-image.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Replace me" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Replace me" />
        <meta property="og:title" content="Replace me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
