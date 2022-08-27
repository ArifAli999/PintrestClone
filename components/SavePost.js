import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa'
import useAuthStore from '../store/authStore';
import { uid } from "uid";
import { app, auth, db } from "../firebase/firebase.config";
import { collection, Timestamp, addDoc, doc, setDoc, } from 'firebase/firestore';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";
import { useQuery } from 'react-query';
import { sendToast } from '../util/sendToast';
function SavePost({ postid, imgUrl, content, username, userid, favs }) {

    const { userProfile } = useAuthStore();





    let [isOpen, setIsOpen] = useState(false)
    const [list, setList] = useState([])
    const [selectedList, setSelectedList] = useState([]);
    const [showInputBox, setshowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const { isLoading, isError, data, error, refetch } = useQuery('todos', Cloud, {
        enabled: false,
    })

    if (isLoading) {
        return <FaSpinner size={20} className='text-white' />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }






    function closeModal() {
        setIsOpen(false)
        setshowInput(false)
    }

    function openModal() {
        setIsOpen(true)

    }

    function addToList(listName) {

        const dtref = Timestamp.now()



        if (inputValue) {

            addDoc(
                collection(db, "users", userProfile.uid, listName),
                {
                    content: content,
                    imgUrl: imgUrl,
                    postid: postid,
                    user: username,
                    useruid: userid,
                }
            ).then(() => {
                sendToast('Success')
                setInputValue('')
                refetch()
            }).catch((err) => {
                alert(err.message);
            })
        }
        else if (listName) {

            setDoc(
                doc(db, "users", userProfile.uid, listName, `${userProfile.uid}_${postid}`),
                {
                    content: content,
                    imgUrl: imgUrl,
                    postid: postid,
                    user: username,
                    useruid: userid,
                    state: doc(db, 'posts/' + postid),
                }
            ).then(() => {
                alert('saved')
                refetch() // replace with toasts.
            }).catch((err) => {
                alert(err.message);
            })
        }
        else {
            sendToast('Please select a list first')
        }
    }




    async function Cloud() {

        const res = await fetch(`/api/posts/${userProfile.uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json();
        return data

    }

    function showInput() {
        setshowInput(true)
    }



    return (
        <>
            <AiOutlinePlus size={30} onClick={() => { refetch(); openModal() }} />

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 overflow-scroll" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-90" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-scroll ">
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
                                <Dialog.Panel className="w-[90%]  transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="div"
                                        className="text-lg p-4 border-b border-gray-300 font-medium leading-0 text-pink-500 mb-4 flex justify-between items-center"
                                    >
                                        <div className=''>
                                            ADD TO YOUR LIST
                                        </div>

                                        <div className='text-white bg-black rounded-full p-1.5 hover:bg-black/60 transition-all ease-in-out duration-300'>
                                            <AiOutlineClose size={20} onClick={closeModal} className='0.5' />
                                        </div>
                                    </Dialog.Title>
                                    <div className=" flex flex-col gap-0  items-center justify-center p-0 text-black">
                                        <div className='flex items-center gap-2 border-gray-300 border-b w-full '>
                                            <div className='w-[20%]  p-4'>
                                                <img src={imgUrl} alt="post" className="w-full max-h-[300px] rounded-lg shadow-lg" />
                                            </div>
                                            <div className='w-[60%]'>
                                                <p>Saving post by {username} </p>
                                            </div>
                                        </div>
                                        <div className='grid md:grid-cols-4 gap-4 group w-full  border-gray-200 p-4  border-b  ' >
                                            {data && data.posts && data.posts.map((item, index) => (

                                                <div className='flex p-4 w-full border border-gray-300 rounded justify-between items-center hover:border-pink-500 transition-all duration-300 ease-linear ' key={item}>
                                                    <div className=''>
                                                        <p className='text-base text-black font-medium rota'>{item}
                                                        </p>
                                                    </div>

                                                    <div className=''>
                                                        <button className='bg-pink-500 text-white rounded-full  px-2 py-2 hover:bg-pink-400 hover:text-pink-50 transition-all duration-300 ease-in-out group'
                                                            onClick={() => addToList(item)}>
                                                            <AiOutlinePlus size={20} className='group-hover:rotate-90 transition-all duration-500 ease-in-out group' />
                                                        </button>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>








                                    </div>

                                    <div className='flex flex-col w-full border-b  border-gray-300   '>
                                        <div className='bg-gray-200 flex justify-between w-full items-center'>
                                            {showInputBox ?
                                                (
                                                    <input type='text' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }}
                                                        className='w-full p-4  bg-transparent outline-none' placeholder='New list name -' /
                                                    >) :
                                                <h2 className='bg-gray-200 p-4 text-base text-gray-500  font-bold uppercase'>New list</h2>}



                                            {showInputBox ? (<div className='p-4' onClick={() => addToList(inputValue)}>
                                                <button className='bg-red-500 text-white rounded-full  px-2 py-2 hover:bg-red-600 hover:text-pink-50 transition-all duration-300 ease-in-out group'>
                                                    <AiOutlineCheck size={20} className='group-hover:rotate-45 transition-all duration-500 ease-in-out group' />
                                                </button>
                                            </div>) : (<div className='p-4' onClick={() => setshowInput(!showInputBox)}>
                                                <button className='bg-gray-500 text-white rounded-full  px-2 py-2 hover:bg-pink-400 hover:text-pink-50 transition-all duration-300 ease-in-out group'>
                                                    <AiOutlinePlus size={20} className='group-hover:rotate-90 transition-all duration-500 ease-in-out group' />
                                                </button>
                                            </div>)}


                                        </div>

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





export default SavePost