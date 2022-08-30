import { useRouter } from 'next/router'
import { collection, query, limit, where, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase.config'
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FaComments, FaSpinner } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc'
import LikePost from '../../components/LikePost';
import useAuthStore from '../../store/authStore';
import UnlikePost from '../../components/UnlikedPost';
import { useQuery, useQueryClient } from 'react-query';
import UnlikeSlug from '../../components/UnlikeSlug'
import LikeSlug from '../../components/LikeSlug'

const Post = ({ postid }) => {

    const queryClient = useQueryClient()


    const router = useRouter()

    const [pageparm, setParam] = useState()
    const { userProfile } = useAuthStore()

    const { isLoading, isError, data, error } = useQuery(['todos'], () => fetchProduct())

    async function fetchProduct() {
        const querySnapshot = await getDoc(doc(db, "posts", postid));
        return querySnapshot.data()
    }


    // console.log(data)




    if (isLoading) {
        return (<div className='flex items-center w-full h-full justify-center'>

            <FaSpinner size={50} className='text-pink-600' />
        </div>)
    }

    if (error) {
        return (<div className='flex items-center w-full h-full justify-center'>

            <p className='text-red-400 font-serif font-light text-2xl'>
                Sorry an error occured, please try again later
            </p>
        </div>)
    }






















    return (
        <div className='w-full  '>

            {data && (
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

                                <div className='mt-4 p-4'>
                                    <p className='text-gray-700 text-base'>{data.description && data.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className='md:w-[10%] h-full bg-black flex md:flex-col gap-2 justify-between items-center pr-6 pl-6 pt-6 pb-6 md:pr-0 md:pl-0'>
                            <AiOutlineUser size={24} className='text-white' />
                            <FaComments size={24} className='text-white' />

                            {data.likedBy && data.likedBy.find(x => x === userProfile.uid) ? <UnlikeSlug postid={data.postid} imgUrl={data.imgUrl} content={data.content} username={data.user} userid={data.useruid} likedBy={data.likedBy}
                                queryClient={queryClient} /> : <LikeSlug postid={data.postid} imgUrl={data.imgUrl} content={data.content} username={data.user} userid={data.useruid} likedBy={data.likedBy} queryClient={queryClient} />}

                        </div>

                    </div>

                </div>
            )}
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