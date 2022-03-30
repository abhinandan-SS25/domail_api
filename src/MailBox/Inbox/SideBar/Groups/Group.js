import React from "react";
import "../sidebar.css";
import {IoSend} from "react-icons/io5"

const Group = ({groupname,creator,members, raiseCompose}) => {

    const m = members.map(member => {
        return <p>{member}</p>
    })

    function raise_compose_email () {
        raiseCompose(prev => {
            return {
            preBody:"",
            preSubject:"", 
            preImportant:false, 
            visible:true,
            preRecipients:members}
        })
    }

    return(
        <div className="group">
            <div className="group_name">
                <div className="name">
                    {groupname}<span style={{marginLeft:"10px", color:"#f2edaa", fontSize:"10px"}}>{creator?"(C)":""}</span>
                </div>
                <div onClick={raise_compose_email} className="account_mail">
                    <IoSend color="#6fc3d6"/>
                </div>
            </div>
            <div className="group_members">
                <div className="members">
                    Members:
                    {m}
                </div>
            </div>
        </div>
    )
}

export default Group