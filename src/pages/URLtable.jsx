import { useEffect } from 'react';
import Header from '../components/Header'


export default function URLTABLE(){

    const data = JSON.parse(sessionStorage.getItem("url"));

    useEffect(() => {
        console.log(data);
    })


    return (
        <>
            <Header/>



        
        </>
    );


}