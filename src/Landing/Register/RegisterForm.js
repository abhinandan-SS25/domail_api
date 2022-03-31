import React from  'react';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {

    const [error, setError] = React.useState("")

    const [status, setStatus] = React.useState(false)

    const [registerData, setRegisterData] = React.useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirm:""
    })

    const [nav, setNav] = React.useState(true)

    function handleRegisterData (event) {
        setError("")
        setRegisterData (prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    function submitRegister (event) {
        setStatus((prev)=> !prev)
        event.preventDefault()
        
        if ((registerData.firstname==="") ||(registerData.lastname==="") || (registerData.email==="") || (registerData.password==="") || (registerData.confirm==="")) {
            setError("Please complete all fields")
            event.preventDefault()
            setStatus((prev)=> !prev)
        } else {
            fetch("https://mailmanapi.herokuapp.com/register", {
                method: "POST",
                body: JSON.stringify(
                    {
                        firstname:registerData.firstname,
                        lastname:registerData.lastname,
                        email:registerData.email,
                        password:registerData.password,
                        confirmation:registerData.confirm,
                    }
                )
            }).then(
                response => response.text()
                ).then(response => {
                    if (response==="Passwords unmatch") {
                        setError("Password and Confirmation of password do not match")
                        event.preventDefault()
                    }
                    else if (response==="Email pre-exists") {
                        setError("An account with assossiated with the e-mail address already exists")
                        event.preventDefault()
                    }
                    else if (response==="Register successful") {
                        setError("Successfuly signed up")
                        localStorage.setItem("domail_user", JSON.stringify({
                                firstname:registerData.firstname,
                                lastname:registerData.lastname,
                                email:registerData.email
                            }))
                        setStatus((prev)=> !prev)
                        navigate()
                    }
                    else{
                        setError("Please try a different email username")
                    }
                    setStatus((prev)=> !prev)
                }
            )
            }
        }

    let n = useNavigate()

    function navigate () {
        nav && n("/")
    }
    
    return (
        <form onSubmit={submitRegister} className="form">
                        <div id="f_n">
                            <div className='direction'>
                                {error}
                            </div>
                            <div className='input'>
                                <input onChange={handleRegisterData} value={registerData.firstname} type="text" name="firstname" autoFocus placeholder='Enter your First Name'/>
                            </div>
                        </div>
                        <div id="l_n">                                
                            <div className='input'>
                                <input onChange={handleRegisterData} value={registerData.lastname} type="text" name="lastname" placeholder='Enter your Last Name'/>
                            </div>
                        </div>
                        <div id="e_n">
                            <div className='input'>
                                <input onChange={handleRegisterData} value={registerData.email} type="text" name="email" autoComplete='off' placeholder='Enter your Email Username'/> @domail.com
                            </div>
                        </div>
                        <div id="pass">
                            <div id="password">
                                <div className='input'>
                                    <input onChange={handleRegisterData} value={registerData.password} type="password" name="password" autoComplete='off' placeholder='Enter your Password'/>
                                </div>
                            </div>
                            <div id="confirm">
                                <div className='input'>
                                    <input onChange={handleRegisterData} value={registerData.confirm} type="password" name="confirm" autoComplete='off' placeholder='Confirm your Password'/>
                                </div>
                            </div>
                        </div>
                        <div className="submit">
                            <button disabled={status} style={{backgroundColor: status===true ? "#ff7e75" : "#ff1100"}}>{status===true ? "REGISTERING" : "REGISTER"}</button>
                        </div>
                    </form>
    )
}
export default RegisterForm;