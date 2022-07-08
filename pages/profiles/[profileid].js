import { useRouter } from 'next/router'
import { collection, query, limit, where, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase.config'
import { useFirestoreDocument, useFirestoreQueryData } from "@react-query-firebase/firestore";
import PostGrid from '../../components/PostGrid';
import useAuthStore from '../../store/authStore';
const Post = ({ profileid }) => {
    const router = useRouter()

    const { userDetails } = useAuthStore();


    const ref = query(
        collection(db, "posts"),
        where("useruid", "==", profileid),
    );
    const data = useFirestoreQueryData(["userProfile", profileid], ref, {
        subscribe: true,
    });

    if (data.isLoading) {
        return <div>Loading...</div>;
    }

    const snapshot = data.data;










    return (
        <div className='w-full h-full'>

            <div className='w'>
                <PostGrid posts={snapshot} />

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