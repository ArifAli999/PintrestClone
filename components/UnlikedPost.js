import React, { useEffect } from 'react';
import { AiFillHeart, } from 'react-icons/ai';
import useAuthStore from '../store/authStore';
import { uid } from "uid";
import { app, auth, db } from "../firebase/firebase.config";
import { collection, Timestamp, addDoc, setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

function UnlikePost({ postid, imgUrl, content, username, userid, likedBy }) {

    const { userProfile } = useAuthStore();



    let [isOpen, setIsOpen] = useState(false)
    const [list, setList] = useState([])
    const [selectedList, setSelectedList] = useState([]);
    const [showInputBox, setshowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');





    function closeModal() {
        setIsOpen(false)
        setshowInput(false)
    }



    function openModal() {
        setIsOpen(true)

    }

    function LikeHandler() {

        const dtref = Timestamp.now()
        updateDoc(
            doc(db, "posts", postid),
            {
                likedBy: arrayRemove(`${userProfile.uid}`)
            }
        ).then(() => {
            alert('Unliked') // replace with toasts.
        }).catch((err) => {
            alert(err.message);
        })
    }








    return (
        <>

            <AiFillHeart className='text-pink-500' size={30} onClick={() => LikeHandler()} />



        </>
    )

}
export default UnlikePost