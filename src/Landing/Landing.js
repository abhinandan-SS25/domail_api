import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./auth.css";
import "./landing.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import MailBox from "../MailBox/MailBox";

const Landing = () => {    
    return(
        <div id='landing'>
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/register" element={<Register />} exact />
                <Route path="/emails/inbox" element={<MailBox />} exact />
            </Routes>
        </div>
    )
}

export default Landing;
