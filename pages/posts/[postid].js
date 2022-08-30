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
                <div className='flex md:flex-row flex-col w-full mt-6   border border-gray-300 rounded  bg-white'>
                    <div className=' md:w-[50%]  flex items-center justify-center border-r border-gray-300 '>
                        <img className='w-full  max-h-[600px] min-h-[300px] block cursor-pointer  object-fit  ' src={poster.imgUrl} />
                    </div>
                    <div className='w-full flex md:flex-row flex-col gap-0'>
                        <div className=' w-[90%] h-full bg-stone-50 flex flex-col justify-between'>
                            <div className='flex flex-col gap-4 '>
                                <div className='w-full border-b border-gray-200 mt-4 flex flex-row justify-between items-center p-4'>


                                    <h2 className='md:text-3xl text-xl font-sans font-bold text-black '>{poster.content}</h2>

                                   
                                  
                                    <SavePost postid={poster.postid} imgUrl={poster && poster.imgUrl} content={poster.content} username={poster.user} userid={poster.useruid} />
                                 
                                </div>

                                <div className='mt-4 p-4'>
                                    <p className='text-gray-700 text-base'>{poster.description && poster.description}</p>
                                </div>
                        
                            </div>

                            <div className='p-4 w-full border-t border-gray-300 flex justify-between items-center'>
                            <div className=''>
                                    <Link href={`${router.basePath}/profiles/${poster.useruid}`} >
                                        <a href={`${router.basePath}/profiles/${poster.useruid}`} className='text-sm font-sans uppercase text-bold text-gray-800 rounded'>
                                       
                                            {poster.user} 
                                        <span className='text-sm font-sans text-light text-gray-400 mr-2'> &nbsp; @ </span>
                                            </a>
                                </Link>
                                </div>

                                <div className=''>
                                    <PostDropDown userid={poster.useruid} />
                                   
                                </div>



                            </div>


                        </div>

                        <div className='md:w-[10%] h-full bg-black flex md:flex-col gap-2 justify-between items-center pr-6 pl-6 pt-6 pb-6 md:pr-0 md:pl-0'>
                            <AiOutlineUser size={24} className='text-white' />
                            <FaComments size={24} className='text-white' />

                            {poster.likedBy && poster.likedBy.find(x => x === userProfile.uid) ? <UnlikeSlug postid={poster.postid} imgUrl={poster.imgUrl} content={poster.content} username={poster.user} userid={poster.useruid} likedBy={poster.likedBy}
                                queryClient={queryClient} /> : <LikeSlug postid={poster.postid} imgUrl={poster.imgUrl} content={poster.content} username={poster.user} userid={poster.useruid} likedBy={poster.likedBy} queryClient={queryClient} />}

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