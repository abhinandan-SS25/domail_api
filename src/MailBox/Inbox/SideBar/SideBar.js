import React from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import Account from "./Accounts/Account";

const SideBar = ({contacted, groups, profile, Contacts, raiseCompose, user}) => {
    
    const [nav, setNav] = React.useState(true)

    function logout_user () {
        fetch("https://mailmanapi.herokuapp.com/logout").then(
            response => response.text()
        ).then(response => {
            if (response==="Logout successful") {
                navigate()
            }}
        )
    }

    const [height, setHeight] = React.useState(true)
    const [heightCon, setHeightCon] = React.useState(false)

    window.setTimeout(() => {
        const name = document.querySelector("#profile").querySelector("#profile_name").innerText.split(" ")
        const email = document.querySelector("#profile").querySelector("#profile_email").innerText
        localStorage.setItem("domail_user", JSON.stringify({
            firstname:name[0],
            lastname:name[1],
            email:email,
        }))
    },5000)

    let n = useNavigate()

    function navigate() {
        nav && n("/")
    }

    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    function save_contact() {
        const name = document.querySelector("#contactname").value;
        const email = document.querySelector("#contactemail").value;

        if ((name.length===0)||(email.length===0)){

        }else{
            document.querySelector("#save_con").style.backgroundColor="blue";
            const user_name = user.username
            let contact_list = JSON.parse(localStorage.getItem(`${user_name}`)).contacts
            let draft_list = JSON.parse(localStorage.getItem(`${user_name}`)).drafts
            contact_list.push({
                name: name,
                email: email
            })
            localStorage.setItem(`${user_name}`, JSON.stringify({
                drafts:draft_list,
                contacts: contact_list
            }))
            Contacts.push(<Account firstname={name} lastname="" email={email} raiseCompose={raiseCompose} />)
            forceUpdate();
            document.querySelector("#save_con").style.backgroundColor="rgb(111, 195, 214)";
            document.querySelector("#contactname").value="";
            document.querySelector("#contactemail").value="";
    }
    }

    return (
        <div id="sidebar_layer">

        <div id="sidebar">
            <p>Quick mailing</p>
            <div className="declare" onClick={()=>{setHeightCon(prev=>!prev)}}>
                Important Contacts
            </div>
            <div id="imp_contacts" style={{height:heightCon?"30vh":"0", opacity:heightCon?"1":"0"}}>
                Create a new contact
                {heightCon && <div id="create_contact">
                    <div id="contact_info">
                        <input id="contactname" name="contactname" type="text" placeholder="Name" />
                        <input id="contactemail" name="contactemail" type="text" placeholder="Email" />
                    </div>
                    <div id="save_contact" onClick={()=>{save_contact()}}>
                        <button id="save_con">Save Contact</button>
                    </div>
                </div>
                }
                {heightCon && <div id="important_contacts">
                        {Contacts}
                    </div>}
            </div>
            <div className="declare" id="r_con" onClick={()=>{setHeight(prev=>!prev)}}>
                Recently Contacted
            </div>
            <div id="contacts" style={{height:height?"35vh":"0", opacity:height?"1":"0"}}>
                {height && contacted}
            </div>
            <div className="declare">
                Your Groups
            </div>
            <div id="groups">
                {groups}
            </div>
            <div id="profile">
                <div id="profile_log">
                    <span id="logged_in">Logged in</span>
                    <button id="logout" onClick={logout_user}>Log Out</button>
                </div>
                <hr id="hr"/>
                {profile}
            </div>
        </div>

        </div>
    )
}

export default SideBar;