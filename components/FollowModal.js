import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiOutlineSearch, AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'

function FollowModal({ followers }) {

    const router = useRouter()


    console.log(followers)

    let [isOpen, setIsOpen] = useState(false)



    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }







    return (

        <>




            <div className=' border border-gray-300 px-4 p-2 rounded-full hover:border-pink-500 transition-all ease-in-out duration-300 cursor-pointer' onClick={openModal}>


                <span className='text-pink-500 font-semibold  text-base flex items-center gap-2'>{followers.FollowedBy?.length} <span className='text-gray-400 text-xs'>{followers && followers.FollowedBy?.length > 1 ? 'Followers' : 'Follower'}</span> </span>

            </div>



            <Transition appear show={isOpen} as={Fragment}>
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

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[800px] transform overflow-hidden rounded text-left align-middle transition-all bg-white">

                                    <div className='p-4 border-b border-gray-300 flex items-center justify-between'>
                                        <h2 className='text-gray-800/80 font-sans text-lg font-semibold'>Followers</h2>

                                        <AiOutlineClose size={26} className='text-pink-500 cursor-pointer' onClick={closeModal} />
                                    </div>



                                    <div className="  w-full">
                                        <div className='flex flex-col'>
                                            {followers && followers.FollowedBy?.map((m) => (
                                                <div className='p-4 border-b border-gray-300 flex flex-row justify-between items-center cursor-pointer hover:bg-gray-200/60 transition-all duration-500 ease-in-out' key={m.userid}>
                                                    <div className='flex flex-row gap-4 flex-1 items-center'>
                                                        <div className=''>
                                                            <img src='https://i.pravatar.cc/150?img=3' className='object-cover w-[85px] h-[80px] rounded-full'></img>
                                                        </div>
                                                        <div className='text-pink-600 font-semibold'>
                                                            <Link href={`${router.basePath}/profiles/${m.userid}`} >
                                                                <a> {m.username} </a>
                                                            </Link>
                                                        </div>

                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default FollowModal