import Layout from '@/layout';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { GoogleAnalytics } from 'nextjs-google-analytics';
import Head from 'next/head';

const queryClient = new QueryClient();

const emotionCache = createCache({
  key: 'emotion-css-cache',
  prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Santos Imóveis | Imobiliária em Belém | Compra e Venda Imóveis</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Layout>
              <GoogleAnalytics
                trackPageViews
                gaMeasurementId={process.env.NEXT_PUBLIC_GA_ID}
              />
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </QueryClientProvider>
      </CacheProvider>
    </>
  );
}
