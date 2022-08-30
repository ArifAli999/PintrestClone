import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-hooks-web';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SearchModal() {


    let [isOpen, setIsOpen] = useState(false)
    const [showHits, setShowHits] = useState(false);
    const [hostName, setHost] = useState('');

    const router = useRouter()


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
            <article className='w-full ounded hover:cursor-pointer '>
                <Link href={`${router.basePath}/posts/${hit.path.replace('posts/', '')}`} >
                    <div className='flex  w-full  gap-2'>

                        <div className='rounded-md max-h-[150px] max-w-[200px]'>
                            <img src={hit.imgUrl} className=" p-2  w-[200px] h-[150px] object-cover rounded-md " />
                        </div>


                        <div className='flex flex-col w-full min-h-[150px] p-4 justify-between relative'>
                            <div className=''>
                                <a className='font-semibold text-base mt-4 text-gray-400 hover:text-pink-500' >
                                    {hit.content}
                                </a>
                                <p className='text-gray-400 font-light text-xs mt-6'>
                                    Here comes a short description of each text.
                                </p>
                            </div>

                            <div className='absolute right-2 bottom-0' onClick={() => setIsOpen(false)}>
                                <AiOutlineArrowRight size={26} className='text-pink-600 hover:text-pink-400 transition-all ease-in-out duration-500 hover:translate-x-2' />
                            </div>

                        </div>



                    </div>
                </Link>

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
                    <div className="fixed inset-0 bg-black bg-opacity-80" />
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
                            <Dialog.Panel className="w-full max-w-[800px] transform overflow-hidden rounded-2xl  text-left align-middle transition-all">



                                <div className="p-4  w-full">
                                    <InstantSearch
                                        indexName="data"
                                        searchClient={searchClient}
                                    >
                                        <SearchBox placeholder="What are you looking for? " searchAsYouType={true}
                                            classNames={{
                                                root: 'p-3 shadow-sm',
                                                form: 'relative',
                                                input: 'block w-full !w-[300px] pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 ',
                                                submitIcon: 'hidden',

                                            }}

                                        />


                                        <Hits hitComponent={Hit} />


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