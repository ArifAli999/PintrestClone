import React from 'react'
import { ref, uploadBytesResumable, getDownloadURL, list } from "firebase/storage";
import { useState, useEffect, } from "react";
import { render } from 'react-dom';
import { app, auth, db, storage } from "../firebase/firebase.config";
import { uid } from "uid";
import useAuthStore from '../store/authStore'

function ViewPost() {
    const { userProfile } = useAuthStore();
    const [images, setImages] = useState()


    async function pageTokenExample() {

        const listRef = ref(storage, `${userProfile.uid}`);

        // Fetch the first page of 100.
        const firstPage = await list(listRef, { maxResults: 100 });



        if (firstPage.items) {
            for (const i = 0; i < firstPage.items.length; i++) {


                getDownloadURL(ref(storage, firstPage.items[i].fullPath))
                    .then((url) => {

                        const xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = (event) => {
                            const blob = xhr.response;
                        };
                        xhr.open('GET', url);
                        xhr.send();


                        console.log(url)
                        setImages(url)
                    })
                    .catch((error) => {
                        // Handle any errors
                    });
            }
        }

        if (firstPage.nextPageToken) {
            const secondPage = await list(listRef, {
                maxResults: 100,
                pageToken: firstPage.nextPageToken,
            });

        }
    }
    return (

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={pageTokenExample}>
            View Posts </button>

    )
}

export default ViewPost