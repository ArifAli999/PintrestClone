import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { AiFillHeart, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';

function ListGrid({ saves }) {
    return (
        <div className='p-4 ml-4 mt-0'>
            <Box sx={{ width: '100%', minHeight: 829 }}>
                <Masonry columns={{ xs: 1, sm: 1, md: 4 }} spacing={4}
                    style={{
                        margin: 0,

                    }}>
                    {saves && saves.map((item, index) => (
                        <div key={item.postid} className='p-0  m-10 group cursor-pointer relative group '>


                            <div className='text-white w-[35px] h-[35px] p-[3%] items-center  rounded-full font-sans font-light text-xs   absolute right-0 bottom-3 mr-2  hidden group-hover:flex z-50 bg-black '>

                                <AiOutlineSetting size={30} />
                            </div>
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
    )
}

export default ListGrid