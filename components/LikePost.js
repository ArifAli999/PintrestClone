import React, { useEffect } from 'react';
import { AiFillHeart, } from 'react-icons/ai';
import useAuthStore from '../store/authStore';
import { uid } from "uid";
import { app, auth, db } from "../firebase/firebase.config";
import { collection, Timestamp, addDoc, setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import toast from 'react-hot-toast';
import { sendToast } from '../util/sendToast';

function LikePost({ postid, imgUrl, content, username, userid, likedBy, queryClient }) {

    const { userProfile } = useAuthStore();



    let [isOpen, setIsOpen] = useState(false)
    const [list, setList] = useState([])
    const [selectedList, setSelectedList] = useState([]);
    const [showInputBox, setshowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');







    async function LikeHandler() {

        const dtref = Timestamp.now();
        updateDoc(
            doc(db, "posts", postid),
            {
                likedBy: arrayUnion(`${userProfile.uid}`)
            }
        ).then(() => {

            sendToast('Post Liked')
            queryClient.invalidateQueries(['todos']);


        }).catch((err) => {
            alert(err.message);
        })
    }






    async function Cloud() {

        const res = await fetch(`/api/posts/${userProfile.uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        console.log(data)
        setList(data)

    }

    function showInput() {
        setshowInput(true)
    }



    return (
        <>

            <AiFillHeart size={30} className='text-white' onClick={() => LikeHandler()} />



        </>
    )

}
export default LikePost