import { useRouter } from 'next/router'
import { collection, query, limit, where, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase.config'
import { useFirestoreDocument } from "@react-query-firebase/firestore";


const Post = ({ postid }) => {
    const router = useRouter()

    const [pageparm, setParam] = useState()


    console.log(postid)


    const ref = doc(db, "posts", postid);
    const product = useFirestoreDocument(["posts", postid], ref);



    if (product.isLoading) {
        return <div>Loading...</div>;
    }

    const snapshot = product.data; // DocumentSnapshot

    const data = snapshot.data(); // DocumentData

    console.log(snapshot.data())











    return (
        <div className='w-full h-full'>
            <div className='flex md:flex-row flex-col w-full mt-4   border-t border-b border-gray-300  bg-white'>
                <div className='p- w-fit flex items-center justify-center border-r border-gray-300'>
                    <img className='w-full max-h-[550px] block cursor-pointer border border-gray-300' src={data.imgUrl} />
                </div>
                <div className='w-1/2'>

                </div>

            </div>
        </div>
    )
}



export default Post

export const getServerSideProps = async ({ params }) => {
    console.log(params)
    const postid = params.postid;
    return {
        props: { postid }
    }
}