import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web';
import 'instantsearch.css/themes/satellite.css';

export default function MyApp({ Component, pageProps }) {
  
  
  const [showHits, setShowHits] = useState(false);

  const queryClient = new QueryClient()
  queryClient.invalidateQueries()


  

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);




  if (isSSR) return null;
  return (


    <QueryClientProvider client={queryClient}>

      <Toaster />
      <Layout>

        <Component {...pageProps} />
      </Layout>

    </QueryClientProvider>
  )
}

