import React from "react";
import "./compose.css";
import {RiSendPlaneFill} from "react-icons/ri";
import Draggable from "react-draggable";

const Compose =({raiseCompose,preBody, preSubject, preImportant, preRecipients, nosave, nosavename, user}) => {

    const [n_s, setn_s] = React.useState(false)
    
    const [composeData, setComposeData] = React.useState({
        mail_subject:preSubject===undefined?"":preSubject,
        mail_recipients:preRecipients===undefined?"":preRecipients,
        important:preImportant===undefined?false:preImportant,
        mail_body:preBody===undefined?"":preBody
    })

    function handleComposeData (event) {
        setMessage({view_m:false, message:""})
        setComposeData((prev) => {
            return {...prev, 
            [event.target.name]:event.target.type==="checkbox"?event.target.checked:event.target.value}
        })
    }

    function closeEmail () {
        let userdata = JSON.parse(localStorage.getItem(`${user.username}`))
        let user_drafts = userdata.drafts
        let user_contacts = userdata.contacts

        if ((composeData.mail_subject==="") && (composeData.mail_body==="")) {
        }else {
            
            if (nosave){
                user_drafts = user_drafts.filter((value, index, arr)=>{return value.name!==nosavename})
                localStorage.setItem(`${user.username}`, JSON.stringify({
                    drafts:user_drafts,
                    contacts:user_contacts
                }
                ))
            } else {
                if (n_s){

                }else{let l_u_d = user_drafts.length
                user_drafts.push({name:"Draft"+String(l_u_d), subject:composeData.mail_subject, recipients:composeData.mail_recipients, important:composeData.important, body:composeData.mail_body})
                localStorage.setItem(`${user.username}`, JSON.stringify({
                    drafts:user_drafts,
                    contacts:user_contacts
                }
                ))}
            }
            
        }

        raiseCompose(prev=> {
            return{
            preBody:"",
            preSubject:"", 
            preImportant:false, 
            preRecipients:"",
            visible:false}
        })
    }

    function send_mail() {
        if ((composeData.mail_subject==="") || (composeData.mail_body==="") || (composeData.mail_recipients==="")){
            setMessage({view_m:true, message:"Please fill subject, recipient and body"})
        }else{
            setn_s(true)
            setMessage({view_m:true, message:"Sending Mail"})
            fetch('https://mailmanapi.herokuapp.com/emails', {
            method: 'POST',
            body: JSON.stringify({
            email:user.username,
            password:user.password,
            recipients: composeData.mail_recipients,
            subject: composeData.mail_subject,
            body: composeData.mail_body,
            important: composeData.important
            })
            })
            .then(response => response.json())
            .then(response => {
                if (response.error===undefined) {
                    closeEmail()
                    setn_s(false)
                }
                else {
                    setMessage({view_m:true, message:response.error})
                }
            })}
    }

    const [message, setMessage] = React.useState({view_m:false, message:""})
    
    return (
        <Draggable>
            <div id="compose_email">
                <div id="email_declare">
                    Compose Email
                    <span onClick={closeEmail} id="close">Close</span>
                </div>
                <form id="compose">
                    <hr/>
                    <input value={composeData.mail_subject} onChange={handleComposeData} id="email_subject" name="mail_subject" type="text" autoComplete="off" placeholder="Subject of email" />
                    <hr/>
                    <input value={composeData.mail_recipients} onChange={handleComposeData} id="email_recipients" name="mail_recipients" type="text" placeholder="Enter email recipients seperated with , " />
                    <hr/>
                    <label>Mark as Important <input onChange={handleComposeData} type="checkbox" name="important" id="important" checked={composeData.important} /></label>
                    <hr/>
                    <textarea value={composeData.mail_body} id="email_body" onChange={handleComposeData} name="mail_body" placeholder="Type message..." />
                    <div onClick={send_mail} id="send_email"><RiSendPlaneFill /></div>
                </form>
                {message.view_m && <div id="message_toggle">
                    {message.message}
                </div>}
            </div>
        </Draggable>
    )
}

export default Compose