import React from 'react'
import {
    signOut
} from "firebase/auth";
import useAuthStore from './../store/authStore';
import { app, auth, db } from "../firebase/firebase.config"
import { AiOutlineLogout } from 'react-icons/ai'
import { sendToast } from '../util/sendToast';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';


function Signout() {
    const router = useRouter();
    const { userProfile, addUser } = useAuthStore();

    const handleSignOut = () => {
        router.push('/')
            .then(() => {
                signOut(auth)
            })
            .then(() => {
                sendToast('Success')
                addUser(null)

            })
            .catch((error) => {
                toast(error.message);
                // ..
            });
    };


    return (
        <button className='bg-white  hover:text-pink-500 transition-all duration-300 ease-in-out '
            onClick={handleSignOut}>
            <AiOutlineLogout size={24} />
        </button>
    )
}

export default Signout