import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'



export default function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient()
  queryClient.invalidateQueries()


  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (


    <QueryClientProvider client={queryClient}>

      <Layout>
        <Component {...pageProps} />
      </Layout>

    </QueryClientProvider>
  )
}

