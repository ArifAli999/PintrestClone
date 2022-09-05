import React, { useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from '../firebase/firebase.config'

function RelatedPosts({ poster }) {

    const [related, setRelated] = useState([])

    useEffect(() => {
        async function getRelatedPosts() {


            const q = query(collection(db, "posts"), where("useruid", "==", poster.useruid), limit(8));

            const querySnapshot = await getDocs(q);
            const posts = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                posts.push(doc.data())
                setRelated(posts)
                console.log(posts)

            });
        }

        getRelatedPosts()
    }, [])







    return (
        <div className='border border-gray-500 mb-6 p-4 rounded flex flex-col gap-6'>
            <div className='flex items-center gap-2 mt-2'>
                <p className='text-gray-600 text-lg font-light'>
                    More content from <span className=' '> {poster.user}</span>

                </p>


            </div>

            {related ?

                <div className='grid grid-cols-4 gap-4 p-4 items-center justify-items-center '>

                    {related.map((m) => (

                        <div className='mb-4 w-[]' key={m.postid}>
                            <img className=' w-[400px] h-[280px]  block cursor-pointer rounded  object-cover  ' src={m.imgUrl} />

                        </div>

                    ))}


                </div> : null}

        </div>
    )
}

export default RelatedPosts