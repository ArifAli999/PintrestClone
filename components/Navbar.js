import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import useAuthStore from '../store/authStore'
import Signout from './Signout';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineManageAccounts } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa'
import CreatePost from './CreatePost'
import Link from 'next/link';






function Navbar() {

    const { userProfile, userDetails } = useAuthStore();


    return (
        <div className='  p-2 flex justify-between items-center  mt-4 '>




            {userProfile ? (
                <><div className='flex gap-4  items-center '>
                    <div className='text-black text-bold  p-2 rounded-full cursor-pointer hover:text-pink-500 transition-all duration-300 ease-in-out'>
                        <Link href='/'>
                            <AiOutlineHome size={24} />
                        </Link>
                    </div>

                </div>
                    <div className="flex gap-6 items-center  ">
                        <div className='text-black text-bold  p-2 rounded-full cursor-pointer group hover:bg-pink-600 transition-all duration-300 ease-in-out flex gap-1 bg  items-center border border-pink-400'>
                            <Link href={`/profiles/${userProfile.uid}`}>
                                <p className='text-base font-normal ml-2  mr-2 text-gray-600 group-hover:text-white'>{userDetails && userDetails.username}</p>
                            </Link>
                            <Link href={`/profiles/${userProfile.uid}`}>
                                <AiOutlineUser size={24} className='text-pink-300 group-hover:text-pink-100' />
                            </Link>
                        </div>
                        <div className='text-black cursor-pointer hover:text-pink-500 transition-all duration-300 ease-in-out'>
                            <CreatePost />
                        </div>

                        <Signout />
                    </div>
                </>)
                : (
                    null
                )}


        </div>
    )
}

export default Navbar