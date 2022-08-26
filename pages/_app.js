import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';



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
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </QueryClientProvider>
  )
}

