import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { AiFillHeart, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import useAuthStore from '../store/authStore'
import { uid } from "uid";
import { app, auth, db } from "../firebase/firebase.config"
import { collection, Timestamp, addDoc, } from 'firebase/firestore';
import SavePost from './SavePost';
import LikePost from './LikePost';
import UnlikePost from './UnlikedPost';
import toast from 'react-hot-toast';
import { sendToast } from '../util/sendToast';


const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
}));



export default function PostGrid({ posts }) {

    const { userProfile, userDetails } = useAuthStore();



    function addToList(postid, imgUrl, content, user, useruid, listName) {


        const dtref = Timestamp.now()
        listName = "Test"
        addDoc(
            collection(db, "users", userProfile.uid, listName),
            {
                content: content,
                imgUrl: imgUrl,
                postid: postid,
                user: user,
                useruid: useruid,
            }
        ).then(() => {
            sendToast('Post Liked')


        }).catch((err) => {
            alert(err.message);
        })

    }



    return (
        <div className='p-4 ml-4 mt-0'>


            <Box sx={{ width: '100%', minHeight: 829 }}>
                <Masonry columns={{ xs: 1, sm: 1, md: 4 }} spacing={4}
                    style={{
                        margin: 0,

                    }}>
                    {posts && posts.map((item, index) => (
                        <div key={item.postid} className='p-0  m-10 group cursor-pointer relative group '>
                            <div className='text-white w-[35px] h-[35px] p-[3%] items-center  rounded-full font-sans font-light text-xs   absolute right-0 top-3 mr-2  hidden group-hover:flex z-50 bg-black '>
                                {item.likedBy && item.likedBy.find(x => x === userProfile.uid) ? <UnlikePost postid={item.postid} imgUrl={item.imgUrl} content={item.content} username={item.user} userid={item.useruid} likedBy={item.likedBy} /> : <LikePost postid={item.postid} imgUrl={item.imgUrl} content={item.content} username={item.user} userid={item.useruid} likedBy={item.likedBy} />}


                            </div>
                            <div className='text-white w-[35px] h-[35px] p-[3%] items-center  rounded-full font-sans font-light text-xs   absolute left-0 bottom-3 ml-2  hidden group-hover:flex z-50 bg-black '>

                                <SavePost postid={item.postid} imgUrl={item.imgUrl} content={item.content} username={item.user} userid={item.useruid} />
                            </div>

                       {item.useruid === userProfile.uid ? (
                                <div className='text-white w-[35px] h-[35px] p-[3%] items-center  rounded-full font-sans font-light text-xs   absolute right-0 bottom-3 mr-2  hidden group-hover:flex z-50 bg-black '>

                                    <AiOutlineSetting size={30} />
                                </div>
                       ): null} 

                         
                            <Link href={{
                                pathname: "/posts/" + `${item.postid}`,
                                query: { id: `${item.postid}` },
                            }} as={`/posts/${item.postid}`}>

                                <a>
                                    <img

                                        srcSet={`${item.imgUrl}`}
                                        alt={item.content}
                                        loading="lazy"
                                        style={{
                                            borderBottomLeftRadius: 4,
                                            borderBottomRightRadius: 4,
                                            display: 'block',
                                            width: '100%',
                                            maxHeight: '600px',


                                        }}
                                        className=' border-gray-400 rounded-md shadow-md shadow-gray-400/60 hover:shadow-lg hover:shadow-gray-400/80 transition-all duration-300 ease-in-out  hover:border-pink-500'
                                    />
                                </a>
                            </Link>
                            <Link href={{
                                pathname: "/posts/" + `${item.postid}`,
                                query: { id: `${item.postid}` },
                            }} as={`/posts/${item.postid}`}>
                                <a>
                                    <div
                                        className="absolute top-0 left-0 w-full  flex flex-col justify-center items-center bg-pink-400/60 opacity-0 h-full group-hover:opacity-100 group-hover:rounded-md duration-500">
                                    </div></a>
                            </Link>
                        </div>
                    ))}
                </Masonry>
            </Box>
        </div>
    );
}

