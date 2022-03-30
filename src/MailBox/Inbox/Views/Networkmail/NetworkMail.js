import React from "react";
import "../../allmail.css";

const NetworkMail = (props) => {
    
    const [accounts, setAccounts] = React.useState([])

    React.useEffect(()=>{
        fetch("https://mailmanapi.herokuapp.com/accounts").then(
            response=>response.json()
        ).then (
            response=>setAccounts(response)
        )
    },[])

    function raise_compose_network (recipient) {
        props.raiseCompose({
            preBody:"",
            preSubject:"", 
            preImportant:false, 
            visible:true,
            preRecipients:recipient
        })
    }

    const network_accounts = accounts.map(account=>{
        return <div className="network_account">
            <div className="network_account_name">
                {account.firstname} {account.lastname}
            </div>
            <div className="network_account_email">
                {account.email}
            </div>
            <hr/>
            <div onClick={()=>raise_compose_network(account.email)} className="mail_account">
                Mail {account.firstname}
            </div>
        </div>
    })

    function name_search () {
    
        var input, filter;
        input = document.querySelector("#name_search");
        filter = input.value.toUpperCase();
        document.querySelectorAll(".network_account_name").forEach( function(name) {
            var val = name.innerHTML.toUpperCase();
            if (val.indexOf(filter) > -1){
                name.parentElement.style.display="";
            }
            else {
                name.parentElement.style.display="none";
            }
        } )
    }

    function subject_search () {
    
        var input, filter;
        input = document.querySelector("#subject_search");
        filter = input.value.toUpperCase();
        document.querySelectorAll(".network_account_email").forEach( function(name) {
            var val = name.innerHTML.toUpperCase();
            if (val.indexOf(filter) > -1){
                name.parentElement.style.display="";
            }
            else {
                name.parentElement.style.display="none";
            }
        } )
    }

    return (
        <div className="mails" id="networkmail">
            <div className="network_declare">
                Network
                <div className="network_smaller">
                    Discover other people on @domail.com and expand your Network
                </div>
            </div>
            <div id="search">
                <div className="left_div">
                    Search Accounts:                        
                </div>
                <div className="right_div">
                    <div className="searchbar">
                        <input type="text" onChange={name_search} id="name_search" name="name_search" autoComplete="off" autoSave="off" placeholder="&#x1F50E;&#xFE0E;Type a name"/>
                    </div>
                    <hr/>
                    <div className="searchbar">
                        <input type="text" onChange={subject_search} id="subject_search" name="subject_search" autoComplete="off" autoSave="off" placeholder="&#x1F50E;&#xFE0E;Type an email"/>
                    </div>
                </div> 
            </div>
            <div id="network_contacts">
                {network_accounts}
            </div>
        </div>
    )
}

export default NetworkMail