import React from "react";
import "./topbar.css";
import {FiEdit3} from "react-icons/fi"

const Drafts =(props) => {

    function raise_draft_edit (subject, recipients, important, body, name) {
        props.raiseCompose(prev=>{
            return { 
                visible:true,
                preBody:body,
                preSubject:subject, 
                preImportant:important, 
                preRecipients:recipients,
                nosave:true,
                nosavename:name
            }
        })
    }

    let drafts = JSON.parse(localStorage.getItem(`${props.user.username}`)).drafts

    drafts = drafts.map(draft=>{
        return <div className="draft">
            <div className="draft_name">
                {draft.name}
            </div>
            <div className="draft_subject">
                {draft.subject}
            </div>
            <span onClick={()=>raise_draft_edit(draft.subject, draft.recipients, draft.important, draft.body, draft.name)} className="draft_edit">
                <FiEdit3 size="20px" />
            </span>
        </div>
    })

    return (
        <div id="drafts">
            <div id="declare_draft">Drafts</div>
            {drafts}
        </div>
    )
}

export default Drafts