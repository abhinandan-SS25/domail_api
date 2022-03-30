import React from "react";
import {useNavigate} from 'react-router-dom';

const EnterForm = (props) => {

    const [error, setError] = React.useState("")

    const [nav, setNav] = React.useState(true)

    const [status, setStatus] = React.useState(false)

    const [enterData, setenterData] = React.useState({
        email:props.userData.email,
        password:"",
    })

    function submitEnterForm (event) {
        setStatus(prev => !prev)
        event.preventDefault()

        if (enterData.password==="") {
            setError("Please complete all fields")
            event.preventDefault()
            setStatus((prev)=> !prev)
        } else {
            fetch("https://mailmanapi.herokuapp.com/login", {
                method: "POST",
                body: JSON.stringify({
                    email:enterData.email,
                    password:enterData.password
                })
            }).then(
                response => response.text()
            ).then (
                response => {
                    if (response==="Login successful") {
                        setError(response)
                        navigate()
                    }
                    else{
                        setError(response)
                        event.preventDefault()
                    }
                }
            ).then(
                setStatus((prev)=> !prev)
            )

        }
    }

    let n = useNavigate()

    function navigate() {
        nav && n("/emails/inbox", {state:{username:enterData.email, mailbox:"inbox", password:enterData.password, f_n:"to", l_n:"@Domail"}})
    }

    function handleEnterData (event) {
        setError("")
        setenterData (prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    return (
        <form className="form" id="enterform" onSubmit={submitEnterForm}>
            <div id="entererror">
                <div className="direction">

                </div>
                <div className="direction">
                    {error}
                </div>
            </div>
            <div id="enter">
                <div id="greet">
                    <p>Welcome back, <span>{props.userData.firstname} {props.userData.lastname}</span></p>
                </div>
                <div className="direction">
                    Log in by entering the password to your account <p>{props.userData.email}</p>
                </div>
                <div className="input">
                    <input onChange={handleEnterData} value={enterData.password} type="password" name="password" autoComplete='off' placeholder='Enter your Password'/>
                </div>
            </div>
            <div className="input" id="change_on">
                <div id="change" onClick={() => props.changeView(props.changeTo)}>
                    Login with a different account
                </div>
                <div className="submit">
                    <button disabled={status} style={{backgroundColor: status===true ? "#ff7e75" : "#ff1100"}}>{status===true ? "LOGGING IN" : "LOG IN"}</button>
                </div>
            </div>
        </form>
    )
}

export default EnterForm;