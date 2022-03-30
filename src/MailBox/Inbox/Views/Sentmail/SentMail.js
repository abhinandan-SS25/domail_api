import React from "react";
import Email from "../../Email/email";
import "../../allmail.css";

const SentMail = (props) => {

    const [emails, setEmails] = React.useState([])

    React.useEffect( () => {
        fetch("https://mailmanapi.herokuapp.com/emails/sent", {
            method:"POST",
            body: JSON.stringify({
                email:props.user.username,
                password:props.user.password
        })
    } ).then(
        response => response.json()
        ).then(response => setEmails(response))
    }, [])

    const email_list = emails.map(email=>{
        return (
            <div onClick={()=>props.changeview(<Email raiseCompose={props.raiseCompose} email={email} changeview={props.changeview} back={<SentMail raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user}/>} />)} style={{backgroundColor:email.read?"#dedede":"white", borderColor:email.important?"yellow":"rgb(211,211,211)"}} id={email.id} className="email_rep">
                <div className="email_info_rep">
                    <div className="email_sender_rep">
                        {email.sender}
                    </div>
                    <div className="email_sent_time_rep">
                        {email.timestamp.split(",")[1]}
                    </div>
                </div>
                <div className="email_info_2_rep">
                    <div className="email_body_rep">
                        <span id="email_subject_rep">{email.subject}:</span> {email.body}
                    </div>
                    <div className="email_sent_date_rep">
                        {email.timestamp.split(",")[0]}
                    </div>
                </div>
                
            </div>
        )}
    )

    function name_search () {
    
        var input, filter;
        input = document.querySelector("#name_search");
        filter = input.value.toUpperCase();
        document.querySelectorAll(".email_sender_rep").forEach( function(name) {
            var val = name.innerHTML.toUpperCase();
            if (val.indexOf(filter) > -1){
                name.parentElement.parentElement.style.display="";
            }
            else {
                name.parentElement.parentElement.style.display="none";
            }
        } )
    }

    function subject_search () {
    
        var input, filter;
        input = document.querySelector("#subject_search");
        filter = input.value.toUpperCase();
        document.querySelectorAll(".email_body_rep").forEach( function(name) {
            var val = name.innerHTML.toUpperCase();
            if (val.indexOf(filter) > -1){
                name.parentElement.parentElement.style.display="";
            }
            else {
                name.parentElement.parentElement.style.display="none";
            }
        } )
    }

    const [noE, setNoE] = React.useState("")

    window.setTimeout(()=>{
        if (emails.length===0) {
            setNoE("No emails to show in this category")
        }
        else {
            setNoE("")
        }
        },10000)

    return (
        <div className="mails" id="sentmail">
            <div className="mailbox_name">
                Sent Mails
            </div>
            <div id="search">
                <div className="left_div">
                    Search:                        
                </div>
                <div className="right_div">
                    <div className="searchbar">
                        <input type="text" onChange={name_search} id="name_search" name="name_search" autoComplete="off" autoSave="off" placeholder="&#x1F50E;&#xFE0E;Search for name"/>
                    </div>
                    <hr/>
                    <div className="searchbar">
                        <input type="text" onChange={subject_search} id="subject_search" name="subject_search" autoComplete="off" autoSave="off" placeholder="&#x1F50E;&#xFE0E;Search for content"/>
                    </div>
                </div> 
            </div>
            <div className="email_list">
                {email_list}
            </div>
            {noE}
        </div>
    )
}

export default SentMail