import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import React, { useState } from 'react';
import { app, auth, db } from "../firebase/firebase.config"
import { uid } from "uid";
import { Timestamp, query, where, collection, onSnapshot } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import useAuthStore from './../store/authStore';
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

import {
    createUserWithEmailAndPassword,
} from "firebase/auth";


const Register = () => {


    const { userProfile, addUser, addUserDets } = useAuthStore();


    let [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }


    const handleSignUp = (e) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // registered and signed in
                alert("registered");

                const uidd = uid();
                const dtref = Timestamp.now()
                setDoc(doc(db, `users`, `${auth.currentUser.uid}`), {
                    username: username,
                    useruid: auth.currentUser.uid,
                    Joined: dtref,
                    email: email,
                }).then(() => {
                    // get user data and add it to state.
                    addUser(auth.currentUser)



                    const dbRef = collection(db, "users")
                    const q = query(dbRef, where("useruid", "==", `${auth.currentUser.uid}`))


                    onSnapshot(q, snap => {
                        if (!snap.empty) {
                            const data = snap.docs[0].data();
                            addUserDets(data)
                        } else {
                            console.log("No user found with given id")
                        }
                    })

                    console.log(auth)

                }).catch((err) => {
                    alert(err.message);
                })


                setIsOpen(false);

            })
            .catch((error) => {
                console.log(error.message)
                // ..
            });
    };



    return (
        <>
            <div className="">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    H
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="text-lg p-4 border-b border-gray-300 font-medium leading-0 text-pink-500 mb-4"
                                    >
                                        REGISTER
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col gap-4 items-center justify-center p-4">
                                        <div className='flex flex-col w-full '>
                                            <label htmlFor="username" className="pb-2 text-xs font-md text-gray-800 dark:text-gray-400">
                                                USERNAME
                                            </label>
                                            <input type="text" id="username" name="username" required className="border border-gray-400 shadow-gray-500/30 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-pink-500 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="@example"
                                                value={username} onChange={handleUsername} />
                                        </div>
                                        <div className='flex flex-col w-full '>
                                            <label htmlFor="username" className="pb-2 text-xs font-md text-gray-800 dark:text-gray-400">
                                                EMAIL
                                            </label>
                                            <input type="text" id="username" name="username" required className="border border-gray-400 shadow-gray-500/30 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-pink-500 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="@example"
                                                value={email} onChange={handleEmail} />
                                        </div>


                                        <div className='flex flex-col w-full '>
                                            <label htmlFor="username" className="pb-2 text-xs font-md text-gray-800 dark:text-gray-400">
                                                PASSWORD
                                            </label>
                                            <input type="text" id="username" name="username" required className="border border-gray-400 shadow-gray-500/30 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-pink-500 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="@example"
                                                value={password} onChange={handlePassword} />
                                        </div>

                                    </div>

                                    <div className="mt-4 p-6 flex justify-center ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-pink-400 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600  shadow-black/60 hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleSignUp}
                                        >
                                            Register
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Register
