import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web';


export default function MyApp({ Component, pageProps }) {
  const [showHits, setShowHits] = useState(false);

  const queryClient = new QueryClient()
  queryClient.invalidateQueries()


  const algoliaClient = algoliasearch('24TKP5PN1N', 'e4eb3c37819946a48ff9e2a0e0ad053b');



 const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);


  function Hit({ hit }) {
    return (
      <article>
     
        <h1>
        
     
        </h1>
        {hit.content}
      </article>
    );
  }

  if (isSSR) return null;
  return (


    <QueryClientProvider client={queryClient}>
      <InstantSearch
        indexName="data"
        searchClient={searchClient}
      >
        <SearchBox placeholder="Search for products" searchAsYouType={true} 
          onFocus={() => setShowHits(true)} onBlur={() => setShowHits(false)}
          />


        {showHits ? <Hits hitComponent={Hit} /> : null}


      </InstantSearch>
      <Toaster />
      <Layout>

        <Component {...pageProps} />
      </Layout>

    </QueryClientProvider>
  )
}

