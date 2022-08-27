import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { uid } from 'uid';
import { Timestamp, doc, setDoc, } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAuthStore from '../store/authStore'
import { db, storage } from "../firebase/firebase.config";
import { sendToast } from '../util/sendToast';
import FileUploader from './FileUploader';




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
    const [description, setDescriptions] = useState("");
    const [screenTwo, setScreenTwo] = useState(false);

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

    const newScreen = () => {

        
            

            if(title.length > 3 && description.length> 5) {
                setScreenTwo(true)
            }
   

    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        else if (file) {
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
                    // download url and add to db, clear all the fields and reset the screen of the modal.
                    
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        addToDb(url)
                        handleClose()
                        setTitle('')
                        setDescriptions('')
                        setScreenTwo(false)
                       
                    });
                }
            );
        }
    };


    const addToDb = (url) => {
        const uidd = uid();
        const dtref = Timestamp.now()
        setDoc(doc(db, `posts`, `${uidd}`), {
            tweetid: uidd,
            content: title,
            useruid: `${userProfile.uid}`,
            createdAt: dtref,
            user: `${userProfile.email}`,
            postid: `${uidd}`,
            imgUrl: url,
            description: description,


        }).then(() => {
            sendToast('Post Liked')
        }).catch((err) => {
            sendToast('Error')
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
                <Box sx={style} className='relative md:w-[40%] w-full min-h-5/6'>
                    <div className='p-4 border-b border-gray-300 flex justify-between items-center'>
                        <div>Create a post</div>
                        <AiOutlineClose size={24} className='cursor-pointer text-gray-400  hover:text-pink-500 duration-300 auto '
                            onClick={handleClose} />


                    </div>

                    {screenTwo ? (<FileUploader img={img} handleChange={handleChange} />) : (
                        <div>
                            <div className="flex  p-6 flex-col items-center gap-4 justify-between  ">
                                <div className='flex gap-2 w-full'>
                                    <label className='text-xs text-gray-500 w-full mb-4'>Title
                                        <input type="text" id="username" name="username" required className="mt-2 border border-gray-300 shadow-gray-500/30 pl-3 w-full py-3 shadow-sm rounded text-sm focus:outline-none focus:border-pink-500 bg-transparent placeholder-gray-300 text-pink-600 " placeholder="Describe your image"
                                            value={title} onChange={(e) => setTitle(e.target.value)} />

                                    </label>

                                </div>


                                <div className='flex gap-2 w-full'>
                                    <label className='text-xs text-gray-500 w-full mb-4'>Description
                                        <textarea type="text" id="username" name="username" required className="mt-2 border border-gray-300 shadow-gray-500/30 pl-3 w-full py-3 shadow-sm rounded text-sm focus:outline-none focus:border-pink-500 bg-transparent placeholder-gray-300 text-pink-600 " placeholder="Describe your image"
                                            value={description} onChange={(e) => setDescriptions(e.target.value)} />

                                    </label>

                                </div>




                             
                            </div>

                        </div>
                    )}

                    <div className="flex justify-center p-4 gap-2 mt-4  bottom-4 items-center w-full">
                        {screenTwo ? <button className="w-4/5 px-4 py-2 bg-pink-500 border border-pink-400 text-white rounded shadow-xl" onClick={handleUpload} >Create</button> : null} 
                      

                        {screenTwo ? (<button className="w-4/5 px-4 py-2  border border-pink-400 text-pink-500 rounded shadow-xl" onClick={() => setScreenTwo(false)}>Back</button>) : <button className="w-4/5 px-4 py-2 bg-pink-500 border border-pink-400 text-white rounded shadow-xl" onClick={() => newScreen()}>Continue</button> }
                       
                    </div>

                </Box>
            </Modal></>
    )
}

export default CreatePost