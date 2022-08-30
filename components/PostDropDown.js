import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { BsThreeDots, BsPen, BsTrash2, BsBookmarkPlus } from 'react-icons/bs'
import { MdReport } from 'react-icons/md'
import React from 'react';
import useAuthStore from '../store/authStore';




function PostDropDown({ userid}) {

    const {userProfile} = useAuthStore()

   


    







    return (
        <div className="z-30">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md  text-sm font-medium text-pink-500 hover:bg-opacity-30 focus:outline-none ">
                        <BsThreeDots size={20} className='text-black cursor-pointer hover:text-pink-600 transition-all duration-300 ease-in-out' />

                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right border border-gray-300 rounded shadow-sm shadow-black/40  bg-white  focus:outline-none">
                        <div className=" ">



                            {userid === userProfile.uid ? (
                                    <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button

                                                className='hover:bg-darkgray transition-all duration-300 ease-linear text-gray-400 rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm group gap-2'


                                            >

                                                <BsPen
                                                    className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                                    aria-hidden="true"

                                                />

                                                Edit

                                               
                                            </button>
                                        )}
                                    </Menu.Item>


                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className='hover:bg-darkgray transition-all duration-300 ease-linear text-gray-400 rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm gap-2'
                                                onClick={() => {

                                                }}
                                            >
                                                <BsTrash2
                                                    className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                                    aria-hidden="true"


                                                />
                                                Delete
                                            </button>
                                        )}
                                    </Menu.Item>
                                    </>
                            ) : null}
                            


                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className='hover:bg-darkgray transition-all duration-300 ease-linear text-gray-400 rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm gap-2'
                                    
                                    >
                                        <BsBookmarkPlus
                                            className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                            aria-hidden="true"

                                        />
                                        Bookmark
                                      
                                    </button>
                                )}
                            </Menu.Item>


                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className='hover:bg-darkgray transition-all duration-300 ease-linear text-gray-400 rounded-none border-b border-darkgray
                                        group flex w-full items-center px-2 py-2 text-sm gap-2'
                                    >
                                        <MdReport
                                            className="mr-2  text-purple-white group-hover:text-pink-500 transition-all duration-300 ease-in-out"
                                            aria-hidden="true"

                                        />
                                        Report
                                    </button>
                                )}
                            </Menu.Item>



                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default PostDropDown