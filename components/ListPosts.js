import React from 'react'
import { useQuery } from 'react-query';
import useAuthStore from '../store/authStore';
import { app, auth, db } from "../firebase/firebase.config";
import { getDocs, collection, } from 'firebase/firestore';
import { query } from 'firebase/firestore';

function ListPosts({ profileid }) {
    const { userProfile } = useAuthStore();


    const { isLoading, isError, data, error, refetch } = useQuery('todos', Cloud)

    if (isLoading) {
        return 'loading'
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }



    console.log(data)

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

        let commentRef = collection(db, "users", profileid, item);
        const q = query(commentRef);
        getDocs(q)
            .then((response) => {
                const x = response.docs.map((item) => {
                    return item.data();
                })

                if (!x.length > 0) {

                }
                else {
                    console.log(x)
                }



            }).catch((err) => {
                alert(err.message);
            })


    }


    return (
        <div className='grid md:grid-cols-4 gap-4 group w-full mt-5  '>
            {data && data.posts.map((list, index) => (
                <div className='w-full p-6 border-gray-200   border shadow-md shadow-gray-300/60 hover:shadow-sm transition-all duration-300 ease-linear cursor-pointer hover:text-pink-500' key={index}
                    onClick={() => fetchUserList(list)}>
                    {list}
                </div>
            ))}

        </div>
    )
}




export default ListPosts