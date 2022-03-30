import React from "react";
import "./topbar.css";
import {IoMailOutline, IoArchiveOutline} from "react-icons/io5";
import {IoIosSend} from "react-icons/io";
import {MdLabelImportantOutline, MdOutlineGroups, MdOutlineConnectWithoutContact, MdOutlineDrafts} from "react-icons/md";
import {AiTwotoneMail} from "react-icons/ai";
import {HiOutlineChevronDoubleRight} from "react-icons/hi"
import InboxMail from "../Inbox/Views/Inboxmail/Inboxmail";
import AllMail from "../Inbox/Views/Allmail/AllMail";
import SentMail from "../Inbox/Views/Sentmail/SentMail";
import ArchivedMail from "../Inbox/Views/Archivedmail/ArchivedMail";
import ImportantMail from "../Inbox/Views/ImportantMail/ImportantMail";
import NetworkMail from "../Inbox/Views/Networkmail/NetworkMail";
import GroupMail from "../Inbox/Views/Groupmail/GroupMail";
import Drafts from "./Drafts"

const TopBar = (props) => {

    React.useEffect(()=>{
        props.changeview(<AllMail raiseCompose={props.raiseCompose} user={props.user} changeview={props.changeview} />)
    },[])

    function raise_compose_email () {
        props.raiseCompose(prev => {
            return { 
            visible:true,
            preBody:"",
            preSubject:"", 
            preImportant:false, 
            preRecipients:"",
            }
        })
    }

    const [draftVisible, setDraftVisible] = React.useState(false)

    function raise_drafts () {
        setDraftVisible(prev=>!prev)
    }

    return (
        <div id="topbar">
            {draftVisible && <Drafts user={props.user} raiseCompose={props.raiseCompose} />}
            <div id="domail_icon">
            </div>
            <div id="email_composer">
                <div onClick={raise_compose_email} className="divider">
                    <div id="compose_icon">
                        <IoIosSend size="36" color="red" />
                    </div>
                    <div>Compose Email</div>
                </div>
                <div className="divider">
                    <div onClick={raise_drafts} id="draft_icon">
                        <MdOutlineDrafts size="36" color="grey" />
                    </div>
                    <div>Drafts</div>
                </div>
                
            </div>
            <div id="navigation_icons">

                <div onClick={()=>props.changeview(<AllMail raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user}/>)} className="navigate_icon" id="all_mail">
                    <div className={props.view.type.name==="AllMail"?"active_icon":"icon"}>
                        <AiTwotoneMail />
                        <div className="icon_puropse">All Mails</div>
                    </div>
                </div>

                <div onClick={()=>props.changeview(<ImportantMail raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user} />)} className="navigate_icon" id="important_mail">
                    <div className={props.view.type.name==="ImportantMail"?"active_icon":"icon"}>
                        <MdLabelImportantOutline />
                        <div className="icon_puropse">Important</div>
                    </div>
                </div>

                <div onClick={()=>props.changeview(<InboxMail raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user} />)} className="navigate_icon" id="inbox_mail">
                    <div   className={props.view.type.name==="Inboxmail"?"active_icon":"icon"}>
                        <IoMailOutline />
                        <div className="icon_puropse">Inbox</div>
                    </div>
                </div>
            
                <div onClick={()=>props.changeview(<SentMail raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user} />)} className="navigate_icon" id="sent_mail">
                    <div className={props.view.type.name==="SentMail"?"active_icon":"icon"}>
                        <HiOutlineChevronDoubleRight />
                        <div className="icon_puropse">Sent</div>
                    </div>
                </div>
           
                <div onClick={()=>props.changeview(<ArchivedMail raiseCompose={props.raiseCompose} changeview={props.changeview} user={props.user} />)} className="navigate_icon" id="archived_mail">
                    <div className={props.view.type.name==="ArchivedMail"?"active_icon":"icon"}>
                        <IoArchiveOutline />
                        <div className="icon_puropse">Archived</div>
                    </div>
                </div>
            
                <div onClick={()=>props.changeview(<NetworkMail raiseCompose={props.raiseCompose} />)} className="navigate_icon" id="network_mail">
                    <div className={props.view.type.name==="NetworkMail"?"active_icon":"icon"}>
                        <MdOutlineConnectWithoutContact />
                        <div className="icon_puropse">Network</div>
                    </div>
                </div>
            
                <div onClick={()=>props.changeview(<GroupMail user={props.user} />)} className="navigate_icon" id="groups_mail">
                    <div className={props.view.type.name==="GroupMail"?"active_icon":"icon"}>
                        <MdOutlineGroups />
                        <div className="icon_puropse">Groups</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar;