import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web';

function SearchModal() {


    let [isOpen, setIsOpen] = useState(false)
    const [showHits, setShowHits] = useState(false);

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }


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


    function Hit({ hit }) {
        return (
            <article>
                {hit.path.replace('posts/', '')}
            </article>
        );
    }




  return (
      <><AiOutlineSearch size={24} onClick={openModal} /><Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                      >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                  as="div"
                                  className="text-lg p-4 border-b border-gray-300 font-medium leading-0 text-pink-500"
                              >
                                  SEARCH
                              </Dialog.Title>
                          

<div className="p-4 rounded w-full">
                                  <InstantSearch
                                      indexName="data" 
                                      searchClient={searchClient}
                                  >
                                      <SearchBox placeholder="Search for products" searchAsYouType={true}
                                      className='w-full h-full   rounded-md'
                                          onFocus={() => setShowHits(true)} onBlur={() => setShowHits(false)}
                                      />


                                      {showHits ? <Hits hitComponent={Hit} /> : null}


                                  </InstantSearch>
</div>


                          </Dialog.Panel>
                      </Transition.Child>
                  </div>
              </div>
          </Dialog>
      </Transition></>
  )
}

export default SearchModal