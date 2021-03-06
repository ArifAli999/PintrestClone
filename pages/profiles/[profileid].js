import { useRouter } from 'next/router'
import { collection, query, limit, where, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase.config'
import { useFirestoreDocument, useFirestoreQueryData } from "@react-query-firebase/firestore";
import PostGrid from '../../components/PostGrid';
import useAuthStore from '../../store/authStore';
import ProfileTabs from '../../components/ProfieTabs';
const Post = ({ profileid }) => {
    const router = useRouter()

    const { userDetails } = useAuthStore();


    const ref = query(
        collection(db, "posts"),
        where("useruid", "==", profileid),
    );

    const ref2 = query(
        collection(db, "posts"),
        where("likedBy", 'array-contains', profileid),
    );

    const data2 = useFirestoreQueryData(["userFavs", profileid], ref2, {
        subscribe: true,
    });

    const data = useFirestoreQueryData(["userProfile", profileid], ref, {
        subscribe: true,
    });



    if (data.isLoading) {
        return <div>Loading...</div>;
    }

    const snapshot = data.data;
    const userlikes = data2.data
    console.log(userlikes)










    return (
        <div className='w-full h-full'>

            <div className='flex flex-col'>
                <div className='mt-5 mb-0 py-2.5 ml-6 mr-6 flex items-center justify-between border-b border-gray-300 '>
                    <div className='flex-1 mb-2'>
                        <h2 className='md:text-4xl text-xl text-black font-bold'>{userDetails.username}</h2>
                    </div>
                    <div className='flex gap-2 mb-2'>
                        <button className="bg-white text-pink-500 border border-pink-400 hover:bg-pink-500 transition-all duration-300 ease-linear hover:text-white rounded  font-bold py-2 px-4 ">
                            Edit
                        </button>



                    </div>
                </div>


                <div className='flex flex-col'>
                    <div>
                        <ProfileTabs posts={snapshot} likes={userlikes} profileid={profileid} />
                    </div>


                </div>
            </div>
        </div>
    )
}



export default Post

export const getServerSideProps = async ({ params }) => {
    console.log(params)
    const profileid = params.profileid;
    return {
        props: { profileid }
    }
}