import React from 'react'
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect, } from "react";
import { app, auth, db, storage } from "../firebase/firebase.config";
import { uid } from "uid";
import useAuthStore from '../store/authStore'
import { sendToast } from '../util/sendToast';




function AddPost() {
    const { userProfile } = useAuthStore();



    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }


        const uidd = uid();
        const storageRef = ref(storage, `/useruploads/${userProfile.uid}_${uidd}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
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

                    console.log(url);
                });
            }
        );
    };


    const addToDb = (url) => {
        const uidd = uid();
        const dtref = Timestamp.now()
        setDoc(doc(db, `posts`, `${uidd}`), {
            content: 'image tite',
            useruid: `${userProfile.uid}`,
            createdAt: dtref,
            user: `${userProfile.email}`,
            postid: `${uidd}`,
            imgUrl: url

        }).then(() => {
            sendToast('Posted')
        }).catch((err) => {
            sendToast(err.message)
        })


    };


    return (

        <><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
            onClick={handleUpload}>
            Post </button>
            <input type="file" onChange={handleChange} accept="/image/*" className='border-pink-500 border-2
            ' />



        </>

    )
}

export default AddPost