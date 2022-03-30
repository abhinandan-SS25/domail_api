import React from 'react';
import "./auth.css"
import {BsChevronCompactDown, BsChevronCompactUp} from "react-icons/bs"

const Travel = ({text}) => {
    return (
        <div className='travel'>
            {text} 
            {text === "Register for a new account" && <BsChevronCompactDown size="30" />}
            {text === "Login to your account" && <BsChevronCompactUp size="30" />}
        </div>
    )
}

export default Travel;

