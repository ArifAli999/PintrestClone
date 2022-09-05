import { useRouter } from 'next/router'
import { collection, query, limit, where, doc, getDoc, onSnapshot } from "firebase/firestore";
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
import Link from 'next/link';
import PostDropDown from '../../components/PostDropDown';
import SavePost from '../../components/SavePost';
import { format, compareAsc } from 'date-fns'
import RelatedPosts from '../../components/RelatedPosts';

const Post = ({ postid }) => {

    const queryClient = useQueryClient()
    const [poster, setPost] = useState()

    const router = useRouter()


    useEffect(() => {
        const sub = dataFetch()

        return () => {
            sub
        }
    }, [])

    const [pageparm, setParam] = useState()
    const { userProfile } = useAuthStore()



    async function dataFetch() {
        const unsub = onSnapshot(doc(db, "posts", postid), (doc) => {

            return setPost(doc.data())
        })

    }











    return (
        <div className='w-full  '>

            {poster && (
                <div className='flex md:flex-col flex-col w-full mt-6  gap-4 rounded md:p-0 p-6 bg-white'>

                    <div className=' md:w-[100%]  flex items-center justify-center rounded-md border border-gray-300 shadow-md  '>
                        <img className='w-full  max-h-[600px] min-h-[300px] block cursor-pointer rounded  object-cover  ' src={poster.imgUrl} />
                    </div>



                    <div className='flex flex-col mb-4 gap-0 border  border-gray-600'>

                        <div className=' h-full bg-stone-50  flex flex-col justify-between flex-1'>
                            <div className='flex flex-col gap- '>
                                <div className='w-full border-b border-gray-200 mt-0 flex flex-row justify-between items-center p-4'>


                                    <h2 className='md:text-3xl text-xl font-sans font-bold text-pink-600 uppercase '>{poster.content}</h2>



                                    <SavePost postid={poster.postid} imgUrl={poster && poster.imgUrl} content={poster.content} username={poster.user} userid={poster.useruid} />

                                </div>
                                {poster && poster.description ? <div className='p-4'>
                                    <p className='text-gray-700 text-base'>{poster.description && poster.description}</p>
                                </div> : null}


                            </div>

                            <div className='p-4 w-full border-t border-gray-300 flex justify-between items-center'>
                                <div className=''>
                                    <Link href={`${router.basePath}/profiles/${poster.useruid}`} >
                                        <a href={`${router.basePath}/profiles/${poster.useruid}`} className='text-sm font-sans  text-bold text-gray-800 rounded'>

                                            Posted By : {poster.user}
                                            <span className='text-sm font-sans text-light text-gray-400 mr-2'> &nbsp; @ {poster.createdAt.toDate().toDateString()}</span>
                                        </a>
                                    </Link>
                                </div>

                                <div className=''>
                                    <PostDropDown userid={poster.useruid} />

                                </div>



                            </div>


                        </div>

                        <div className='w-full bg-black flex  md:flex- gap-2 justify-between items-center pr-6 pl-6 pt-4 pb-4 md:pr-6 md:pl-6 '>
                            <AiOutlineUser size={24} className='text-white cursor-pointer' />
                            <FaComments size={24} className='text-white cursor-pointer' />

                            {poster.likedBy && poster.likedBy.find(x => x === userProfile.uid) ? <UnlikeSlug postid={poster.postid} imgUrl={poster.imgUrl} content={poster.content} username={poster.user} userid={poster.useruid} likedBy={poster.likedBy}
                                queryClient={queryClient} /> : <LikeSlug postid={poster.postid} imgUrl={poster.imgUrl} content={poster.content} username={poster.user} userid={poster.useruid} likedBy={poster.likedBy} queryClient={queryClient} />}

                        </div>




                    </div>


                    <RelatedPosts poster={poster} />

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