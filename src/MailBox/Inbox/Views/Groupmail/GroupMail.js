import React from "react";
import "../../allmail.css";

const GroupMail = (props) => {

    const [groupMessage, setGroupMessage] = React.useState({
        visible:false,
        message:""
    })

    const [dis, setDis] = React.useState(false)

    const [networkGroups, setGroups] = React.useState([])

    const [group_accounts, setAccounts] = React.useState([])

    const [groupData, setGroupData] = React.useState({
        group_create_name:"",
        group_create_members:""
    })

    function handleGroupDataChange (event) {
        setGroupMessage({visible:false,message:""})
        setGroupData(prev=> {
            return {
            ...prev,
            [event.target.name]:event.target.value
        }
    })
    }

    function add_name (event) {
        const present_data = groupData.group_create_members
        if (present_data==="") {
            setGroupData(prev=> {
                return {
                ...prev,
                group_create_members:present_data+event.target.getAttribute("data-name")
                }
            })
        } else {
            setGroupData(prev=> {
                return {
                ...prev,
                group_create_members:present_data+","+event.target.getAttribute("data-name")
                }
            })
        }
        
    }

    React.useEffect( update_groups,[])

    React.useEffect(()=>{
        fetch("https://mailmanapi.herokuapp.com/accounts").then(
            response=>response.json()
        ).then (
            response=>setAccounts(response)
        )
    },[])

    const network_accounts = group_accounts.map(account=>{
        const is_user = account.email.split("@")[0]===props.user.username.split("@")[0]?true:false
        console.log(account.email.split("@")[0],props.user.username.split("@")[0])
        return !is_user && <div onClick={add_name} data-name={account.email} className="group_account">
            <div data-name={account.email} className="group_account_name">
                {account.firstname} {account.lastname}
            </div>
            <div data-name={account.email} className="group_account_email">
                {account.email}
            </div>
        </div>
    })

    function subject_search () {
    
        var input, filter;
        input = document.querySelector("#search_group_contact");
        filter = input.value.toUpperCase();
        document.querySelectorAll(".group_account_email").forEach( function(name) {
            var val = name.innerHTML.toUpperCase();
            if (val.indexOf(filter) > -1){
                name.parentElement.style.display="";
            }
            else {
                name.parentElement.style.display="none";
            }
        } )
    }
    function delete_group(event) {
        fetch("https://mailmanapi.herokuapp.com/account/your_groups", {
            method: "POST",
        body: JSON.stringify(
            {
                email:props.user.username,
                password:props.user.password,
                operation:"delete_group",
                id:event.target.getAttribute("data-id")
            }
        )}).then(response=>response.text()).then(
            response=>setGroupMessage({visible:true,message:response})
        ).then(update_groups)
    }

    function update_groups() {
        fetch("https://mailmanapi.herokuapp.com/account/your_groups", {
            method: "POST",
        body: JSON.stringify(
            {
                email:props.user.username,
                password:props.user.password,
                operation:""
            }
        )}).then(
            response => response.json()
        ).then(response=>{
            let net_group = response.map(group=>{
                const members = group.members.map(member=>{
                    return <div>{member}</div>
                })
                return  <div id={group.id} className="network_group">
                    <div className="network_group_name">
                        {group.name} {<span style={{marginLeft:"10px", color:"#f2edaa", fontSize:"14px"}}>{(group.creator)}</span>} {group.creator.split("@")[0]===props.user.username.split("@")[0]?<span onClick={delete_group} data-id={group.id} style={{marginLeft:"10px", color:"white", fontSize:"16px", cursor:"pointer"}}>Delete Group</span>:""}
                    </div>
                    <div className="network_group_members">
                        {members}
                    </div>
                </div>
            })
            setGroups(net_group)
        }
            )
    }

    function create_group_submit(event) {
        if ((groupData.group_create_members==="")||(groupData.group_create_name==="")){
            setGroupMessage({
                visible:true,
                message:"Please complete all fields."
            })
            event.preventDefault()
        }
        else {
            setDis(prev=>!prev)
            fetch("https://mailmanapi.herokuapp.com/account/your_groups", {
            method: "POST",
            body: JSON.stringify(
                {
                    email:props.user.username,
                    password:props.user.password,
                    operation:"new_group",
                    name:groupData.group_create_name,
                    members:groupData.group_create_members
                }
            )}).then(response=>response.text()).then(
                response=>setGroupMessage({
                    visible:true,
                    message:response
                })
            ).then(
                setGroupData({
                    group_create_name:"",
                    group_create_members:""
                })
            ).then(
                setDis(prev=>!prev)
            ).then(update_groups)
        }
    }

    return (
        <div className="mails" id="groupmail">
            <div className="network_declare">
                Groups
                <div className="network_smaller">
                    View and manage your Groups
                </div>
            </div>
            <div id="group_list">
                <div id="create_group">
                    <div className="network_declare">
                        Create New Group
                        <div className="network_smaller">
                            Gather your contacts into a group and create a new one
                        </div>
                    </div>
                    <div id="group_create_details">
                        Enter new group details:
                        <input id="group_create_name" onChange={handleGroupDataChange} name="group_create_name" value={groupData.group_create_name} placeholder="Name the new Group"/>
                        <input id="group_create_members" onChange={handleGroupDataChange} name="group_create_members" value={groupData.group_create_members} placeholder="Add members seperated with ,"/>
                    </div>
                    <button id="create_group_button" disabled={dis} style={{backgroundColor:dis?"rgb(100,100,100)":"rgb(68,68,68)"}} onClick={create_group_submit}>Create Group</button>
                    <hr />
                    <div id="group_contacts">
                        <input id="search_group_contact" onChange={subject_search} placeholder="&#x1F50E;&#xFE0E; Search for an email"/>
                        {network_accounts}
                    </div>
                </div>
                <div id="show_groups">
                    {networkGroups}
                </div>
            </div>
            {groupMessage.visible && <div id="group_message">
                {groupMessage.message}
            </div>}
        </div>
    )
}

export default GroupMail