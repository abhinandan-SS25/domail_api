import React from "react";
import "./email.css";
import {BiArrowBack} from "react-icons/bi"

const Email = (props) => {

    fetch(`https://mailmanapi.herokuapp.com/emails/${props.email.id}`, {
        method: 'POST',
        body: JSON.stringify({
            read: true,
            email:props.back.props.user.username,
            password:props.back.props.user.password
        })
      })

    const [archiveState, setArchiveState] = React.useState(props.email.archived)

    function changeArchiveState() {
        fetch(`https://mailmanapi.herokuapp.com/emails/${props.email.id}`, {
            method: 'POST',
            body: JSON.stringify({
                archived: archiveState?false:true,
                email:props.back.props.user.username,
                password:props.back.props.user.password
            })
        }).then(setArchiveState(prev=>!prev))
    }

    function raise_reply_compose() {
        props.raiseCompose(prev => {
            return {
            preBody:`On ${props.email.timestamp}, ${props.email.sender} wrote: \n\n${props.email.body}\n\n----------Replying to it-----------\n\n`,
            preSubject:`Re: ${props.email.subject}`, 
            preImportant:props.email.important, 
            visible:true,
            preRecipients:props.email.sender}
        })
    }

    return (
        <div className="mails" id="email_mail">
            <div className="mail">
                <div className="top_navigation">
                    <div onClick={()=>props.changeview(props.back)} className="back">
                        <BiArrowBack size="36"/> Back to {props.back.type.name}
                    </div>
                    <div className="actions">
                        <span onClick={changeArchiveState} id="archive_action">{archiveState?"Unarchive Mail":"Archive Mail"}</span>
                        <span onClick={raise_reply_compose} id="reply_action">Reply</span>
                    </div>
                </div>
                <div className="email">
                    <div className="email_subject">
                        {props.email.subject}
                    </div>
                    <div className="email_sent">
                        <div className="email_sender">
                            {props.email.sender}
                        </div>
                        <div className="email_stamp">
                            {props.email.timestamp}
                        </div>
                    </div>
                    <hr/>
                    <div className="email_body">
                        {props.email.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Email