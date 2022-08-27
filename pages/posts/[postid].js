import { useRouter } from 'next/router'
import { collection, query, limit, where, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase.config'
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa';


const Post = ({ postid }) => {
    const router = useRouter()

    const [pageparm, setParam] = useState()


    console.log(postid)


    const ref = doc(db, "posts", postid);
    const product = useFirestoreDocument(["posts", postid], ref);



    if (product.isLoading) {
        return (
            <div className='flex items-center w-full h-full justify-center'>

                <FaSpinner size={50} className='text-pink-600' />
            </div>
        );
    }

    const snapshot = product.data; // DocumentSnapshot

    const data = snapshot.data(); // DocumentData

    console.log(snapshot.data())











    return (
        <div className='w-full  '>
            <div className='flex md:flex-row flex-col w-full mt-6   border border-gray-300 rounded  bg-white'>
                <div className=' md:w-[50%]  flex items-center justify-center border-r border-gray-300 '>
                    <img className='w-full  max-h-[600px] min-h-[300px] block cursor-pointer  object-fit  ' src={data.imgUrl} />
                </div>
                <div className='w-full flex md:flex-row flex-col gap-0'>
                    <div className=' w-[90%] h-full bg-stone-50'>
                        <div className='flex flex-col gap-4  p-4'>
                            <div className='w-full border-b border-gray-200 mt-4'>
                                <h2 className='md:text-3xl text-xl font-sans font-bold text-black mb-3'>{data.content}</h2>
                            </div>

                            <div className='mt-10 p-4'>
                                <p className='text-gray-700 text-base'>Here is a short description of each post that is yet to be implemented</p>
                            </div>
                        </div>
                    </div>

                    <div className='md:w-[10%] h-full bg-pink-400 flex md:flex-col gap-2 justify-between items-center pr-6 pl-6 pt-6 pb-6 md:pr-0 md:pl-0'>
                        <AiOutlineUser size={24} className='text-white' />
                        <AiOutlineUser size={24} className='text-white' />
                        <AiOutlineUser size={24} className='text-white' />
                    </div>

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