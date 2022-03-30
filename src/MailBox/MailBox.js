import React from 'react';
import Inbox from "./Inbox/Inbox";
import Welcome from "./Inbox/Welcome";
import {useLocation} from "react-router-dom";
import Account from "./Inbox/SideBar/Accounts/Account";
import Group from "./Inbox/SideBar/Groups/Group";
import "./mailbox.css"

const MailBox = () => {

    const location = useLocation()

    const [wel_visible, setWel_visible] = React.useState(true)

    React.useEffect(()=>{
        window.setTimeout(() => {
            setWel_visible(false)
        }, 5000)
    },[])

    if (localStorage.getItem(`${location.state.username}`)===null) {
        localStorage.setItem(`${location.state.username}`, JSON.stringify({
            contacts:[],
            drafts:[]
        }))
    } else {

    }

    const [sesuser, setSesuser] = React.useState([])

    React.useEffect( () => {fetch("https://mailmanapi.herokuapp.com/accounts", {
            method:"POST",
            body:JSON.stringify({
                username:location.state.username
            })
        }).then(
            response => response.json()
        ).then(
            response=> {
                const p = response.map( (profile) => {
                    return  <div id="logger">
                                <p id="profile_name">{profile.firstname} {profile.lastname}</p>
                                <p id="profile_email">{profile.email}</p>
                            </div>
                })
                setSesuser(p)
            }
            )
        },[])

    const [contacts, setContacts] = React.useState([])

    React.useEffect(()=>{let contact_items = JSON.parse(localStorage.getItem(`${location.state.username}`))
    const contact_element = contact_items.contacts.map((contact) => {
        return <Account firstname={contact.name} lastname={""} raiseCompose={setComposeVisible} email={contact.email} />
    })
    setContacts(contact_element)}, [])

    const [accounts, setAccounts] = React.useState([])

    React.useEffect( () => {
        fetch("https://mailmanapi.herokuapp.com/account/contacted", {
        method: "POST",
        body: JSON.stringify(
            {
                email:location.state.username,
                password:location.state.password,
                mailbox:location.state.mailbox
            }
        )}).then(
            response =>response.json()
        ).then(
            response => {
                const ac = response.map((account) => {
                    return <Account raiseCompose={setComposeVisible} firstname={account.firstname} lastname={account.lastname} email={account.email} />
                })
                setAccounts(ac)
            })
    }, [])

    const [groups, setGroups] = React.useState([])

    React.useEffect( () => {
        fetch("https://mailmanapi.herokuapp.com/account/your_groups", {
            method: "POST",
        body: JSON.stringify(
            {
                email:location.state.username,
                password:location.state.password,
                operation:""
            }
        )}).then(
            response => response.json()
        ).then(
            response => {
                const ag = response.map((group) => {
                    return <Group raiseCompose={setComposeVisible} groupname={group.name} creator={location.state.username === group.creator ? true : false} members={group.members} />
                })
                setGroups(ag)
            })
        }, [])

    const [composeVisible, setComposeVisible] = React.useState({visible:false,preBody:"", preSubject:"", preImportant:false, preRecipients:""})
   
    return (
        <div id="mailbox">
            {wel_visible && <Welcome f_n={location.state.f_n} l_n={location.state.l_n} email={location.state.username} />}
            <Inbox composeVisible={composeVisible} setComposeVisible={setComposeVisible} contacts={contacts} contacted={accounts} groups={groups} profile={sesuser} user={{username:location.state.username, password:location.state.password, firstname:location.state.firstname, lastname:location.state.lastname}}/>
        </div>
    )
}

export default MailBox