import React, { useState } from 'react'
import { useQuery } from 'react-query';
import useAuthStore from '../store/authStore';
import { app, auth, db } from "../firebase/firebase.config";
import { getDocs, collection, } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { BiArrowBack } from 'react-icons/bi';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { AiFillHeart, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import ListGrid from './ListGrid';

function ListPosts({ profileid }) {
    const { userProfile } = useAuthStore();
    const [listItems, setListItems] = useState(true);
    const [saves, setSaves] = useState([]);
    const [currList, setCurrList] = useState('');


    const { isLoading, isError, data, error, refetch } = useQuery('todos', Cloud)

    if (isLoading) {
        return (<div className='flex items-center w-full h-full justify-center'>

            <FaSpinner size={50} className='text-pink-600' />
        </div>)
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }





    async function Cloud() {

        const res = await fetch(`/api/posts/${userProfile.uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        return data

    }

    async function fetchUserList(item) {

        setCurrList(item);

        let commentRef = collection(db, "users", profileid, item);
        const q = query(commentRef);
        getDocs(q)
            .then((response) => {
                const x = response.docs.map((item) => {
                    return item.data()

                })
                setSaves(x)
                if (!x.length > 0) {

                }
                else {

                }



            }).catch((err) => {
                alert(err.message);
            })


    }


    return (
        <><div className='grid md:grid-cols-4 gap-4 group w-full mt-5  '>
            {listItems ? (
                data && data.posts.map((list, index) => (
                    <div className='w-full p-6 border-gray-200   border shadow-md shadow-gray-300/60 hover:shadow-sm transition-all duration-300 ease-linear cursor-pointer hover:text-pink-500' key={index}
                        onClick={() => {
                            fetchUserList(list);
                            setListItems(current => !current);
                        }}>
                        {list}
                    </div>
                ))
            ) : null}
        </div>
            <div className='flex flex-col gap-4 w-full h-full'>
                {saves && listItems ? null : (

                    <div className='flex justify-between w-full bg-gray-100 items-center p-1 rounded  border border-bordergray'>
                        <div className='flex-1 p-2'>
                            <p className='font-os text-lg font-bold text-gray-800 uppercase'> {currList} </p>
                        </div>

                        <div className='p-2'>
                            <button
                                onClick={() => { setSaves([]); setListItems(true) }} className='text-gray-400 bg-gray-300 w-10 h-10 flex items-center hover:text-white hover:bg-gray-600 transition-all duration-300 ease-linear  px-2 py-4 rounded-full'>
                                <BiArrowBack size={30} />

                            </button>
                        </div>

                    </div>

                )}



                <ListGrid saves={saves} />

            </div>

        </>

    )
}




export default ListPosts