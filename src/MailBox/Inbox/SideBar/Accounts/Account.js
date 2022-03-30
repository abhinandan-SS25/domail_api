import React from "react";
import "../sidebar.css";
import {IoSend} from "react-icons/io5"

const Account = ({firstname,lastname,email,raiseCompose}) => {

    function raise_compose_email () {
        raiseCompose(prev => {
            return {
            preBody:"",
            preSubject:"", 
            preImportant:false, 
            visible:true,
            preRecipients:email}
        })
    }

    return(
        <div className="account">
            <div className="account_name">
                <p>{firstname} {lastname}</p> <span className="account_email"> {email}</span>
            </div>
            <div onClick={raise_compose_email}  className="account_mail">
                <IoSend color="#6fc3d6"/>
            </div>
        </div>
    )
}

export default Account