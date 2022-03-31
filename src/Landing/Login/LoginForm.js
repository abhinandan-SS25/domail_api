import React from "react";
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {

    const [error, setError] = React.useState("")

    const [status, setStatus] = React.useState(false)

    const [nav, setNav] = React.useState(true)

    const [loginData, setloginData] = React.useState({
        email:"",
        password:"",
    })

    function submitLoginForm (event) {
        setError("Logging in ...")
        setStatus((prev)=> !prev)
        event.preventDefault()

        if ((loginData.password==="") || (loginData.email==="")) {
            setError("Please complete all fields")
            event.preventDefault()
            setStatus((prev)=> !prev)
        } else {
            fetch("https://mailmanapi.herokuapp.com/login", {
                method: "POST",
                body: JSON.stringify({
                    email:loginData.email.split("@")[1]===undefined?loginData.email+"@domial.com":loginData.email,
                    password:loginData.password
                })
            }).then(
                response => response.text()
            ).then (
                response => {
                    if (response==="Login successful") {
                        setError(response)
                        navigate()
                    }
                    else {
                        setError(response)
                        event.preventDefault()
                    }
                }
            ).then(
                setStatus((prev) => !prev)
            )
        }
    }

    function handleLoginData (event) {
        setError("")
        setloginData (prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    
    let n = useNavigate()

    function navigate () {
        nav && n("/emails/inbox", {state:{username:loginData.email.split("@")[1]===undefined?loginData.email+"@domial.com":loginData.email, mailbox:"inbox", password:loginData.password, f_n:"to", l_n:"@Domail"}})
    }

    return (
        <form className="form" id="loginform" onSubmit={submitLoginForm}>
            <div id="entererror">
                <div className="direction">

                </div>
                <div className="direction">
                    {error}
                </div>
            </div>
            <div id="enter">
                <div id="greet">
                    <p><span>Welcome to @Domail</span></p>
                    Enter your login data
                </div>
                <div className="input">
                    <input onChange={handleLoginData} value={loginData.email} type="text" name="email" autoComplete='off' placeholder='Enter your Email or Username'/>
                </div>
                <div className="input">
                    <input onChange={handleLoginData} value={loginData.password} type="password" name="password" autoComplete='off' placeholder='Enter your Password'/>
                </div>
            </div>
            <div className="input" id="change_on">
                <div className="submit">
                    <button disabled={status} style={{backgroundColor: status===true ? "#ff7e75" : "#ff1100"}}>{status===true ? "LOGGING IN" : "LOG IN"}</button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm;