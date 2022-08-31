import { useRouter } from 'next/router'
import { collection, query, limit, where, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase.config'
import { useFirestoreDocument, useFirestoreQueryData } from "@react-query-firebase/firestore";
import PostGrid from '../../components/PostGrid';
import useAuthStore from '../../store/authStore';
import ProfileTabs from '../../components/ProfieTabs';
import { FaSpinner } from 'react-icons/fa';
const Post = ({ profileid }) => {
    const router = useRouter()



    const [followers, setFollowers] = useState([])
    const [followed, setFollowed] = useState(false)
    const { userDetails } = useAuthStore();

    const { userProfile} = useAuthStore()




    useEffect(() => {
        const fetchNames = async () => {
          
            try {
                const unsub = onSnapshot(doc(db, "users", profileid), (doc) => {
                 
            
                   setFollowers(doc.data())
                });



            } catch (error) {
                console.log("error", error);
            }

    
           

        };



        fetchNames();
    }, []);
    


    const ref = query(
        collection(db, "posts"),
        where("useruid", "==", profileid),
    );


    const followUser =  () => {    
        followers.FollowedBy && followers.FollowedBy.find(x => x.userid === userProfile.uid) ? console.log('followed') : console.log('not followed')
    }


    const ref2 = query(
        collection(db, "posts"),
        where("likedBy", 'array-contains', profileid),
    );

    const ref3= query(
        collection(db, "users"),
        where("useruid", "==", profileid),
    );

    const data2 = useFirestoreQueryData(["userFavs", profileid], ref2, {
        subscribe: true,
    });

    const data = useFirestoreQueryData(["userProfile", profileid], ref, {
        subscribe: true,
    });

    const data3 = useFirestoreQueryData(["userDetails", profileid], ref3, {
        subscribe: true,
    });





    if (data.isLoading) {
        return (
            <div className='flex items-center w-full h-full justify-center'>

                <FaSpinner size={50} className='text-pink-600' />
            </div>
        );
    }

    const snapshot = data.data;
    const userlikes = data2.data
    const user = data3.data











    return (
        <div className='w-full h-full'>

            <div className='flex flex-col'>
                <div className='mt-5 mb-0 py-2.5 ml-6 mr-6 flex items-center justify-between border-b border-gray-300 '>
                    <div className='flex-1 mb-2'>
                        <h2 className='md:text-4xl text-xl text-black font-bold'>{user && user.map((m)=> m.username)}</h2>
                    </div>
                    <div className='flex gap-2 mb-2'>

                        {userProfile.uid === user && user.map((m) => m.useruid) ? <button className="bg-white text-pink-500 border border-pink-400 hover:bg-pink-500 transition-all duration-300 ease-linear hover:text-white rounded  font-bold py-2 px-4 ">
                            Edit
                        </button> : 
                        
                 

                            followers.FollowedBy && followers.FollowedBy.find(x => x.userid === userProfile.uid) ? <button className='text-white bg-pink-500 border border-pink-600 rounded-full p-2  px-4'>Unfollow</button> : <button className='text-pink-600 border border-pink-600 rounded-full p-2 px-4'>Unfollow</button> 

                    
                         
                        }
   



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