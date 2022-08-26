import { useState } from "react";
import toast from "react-hot-toast";


export const sendToast = (message) => {

    toast.success(`${message}`, {

        position: 'top-right',
        duration: 1000,
        style: {
            borderBottom: '1px solid pink',
            padding: '10px',
            color: '#fff',
            backgroundColor: '#000',

        },
        iconTheme: {
            primary: 'white',
            secondary: 'red',
        },
    });


};