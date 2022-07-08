import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { uid } from 'uid';
import { Timestamp, doc, setDoc, } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAuthStore from '../store/authStore'
import { db, storage } from "../firebase/firebase.config";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#fff',
    outline: 'none',
    focus: 'none',
    border: '0',
    boxShadow: 24,
    p: 0,
    mb: '4rem',
    borderRadius: '10px',
};


function CreatePost() {

    const { userProfile } = useAuthStore();

    const [img, setImg] = useState();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setImg(null); setTitle(null) };

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
        const [file] = event.target.files;
        if (file) {
            setImg(URL.createObjectURL(file));
        }

    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const uidd = uid();
        const storageRef = ref(storage, `/useruploads/${userProfile.uid}_${uidd}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addToDb(url)
                    handleClose()
                    setTitle(null)
                    console.log(url);
                });
            }
        );
    };


    const addToDb = (url) => {
        const uidd = uid();
        const dtref = Timestamp.now()
        setDoc(doc(db, `posts`, `${uidd}`), {
            content: title,
            useruid: `${userProfile.uid}`,
            createdAt: dtref,
            user: `${userProfile.email}`,
            postid: `${uidd}`,
            imgUrl: url,


        }).then(() => {
            alert("Posted");
        }).catch((err) => {
            alert(err.message);
        })


    };



    return (
        <><AiOutlinePlus size={24} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='relative md:w-1/2 w-full min-h-5/6'>
                    <div className='p-4 border-b border-gray-300 flex justify-between items-center'>
                        <div>Create a post</div>
                        <AiOutlineClose size={24} className='cursor-pointer text-gray-400  hover:text-pink-500 duration-300 auto '
                            onClick={handleClose} />


                    </div>
                    <div>
                        <div class="flex  p-6 flex-col items-center gap-4 justify-between  ">
                            <div className='flex gap-2 w-full'>
                                <label className='text-xs text-gray-500 w-full mb-4'>TITLE
                                    <textarea type="text" id="username" name="username" required className="mt-2 border border-gray-300 shadow-gray-500/30 pl-3 w-full py-3 shadow-sm rounded text-sm focus:outline-none focus:border-pink-500 bg-transparent placeholder-gray-300 text-pink-600 " placeholder="Describe your image"
                                        value={title} onChange={(e) => setTitle(e.target.value)}>
                                    </textarea>
                                </label>

                            </div>

                            <div class="w-full rounded-lg ">
                                <label className='text-xs text-gray-500 w-full mb-4'>FILE
                                    <div className="mt-2 rounded border border-gray-300 ">

                                        <div className="flex items-center justify-center w-full ">

                                            <label
                                                className="flex flex-col w-full h-full mt-6 justify-center">

                                                <div className="flex flex-col items-center justify-center pt-0 mb-4 w-full">
                                                    {img ? (<img src={img} alt="" className="w-full max-h-60 object-contain " />) : (<>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink-400 group-hover:text-pink-50"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p className="pt-4 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                            Attach an image
                                                        </p></>)}


                                                </div>
                                                <input type="file" className="opacity-0 bg-gray-400" onChange={handleChange} accept="/image/*" />


                                            </label>
                                        </div>
                                    </div>
                                </label>

                            </div>

                            <div class="flex justify-center p-2 mt-4  bottom-4 items-center w-full">
                                <button class="w-4/5 px-4 py-2 bg-pink-500 border border-pink-400 text-white rounded shadow-xl" onClick={handleUpload}>Create</button>
                            </div>
                        </div>

                    </div>
                </Box>
            </Modal></>
    )
}

export default CreatePost