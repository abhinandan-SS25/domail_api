import React from 'react';
import LoginForm from "./LoginForm";
import EnterForm from "./EnterForm";
import WaitForm from "./WaitForm";
import "../auth.css";
import Travel from "../Travel";
import { Link } from 'react-router-dom';

const Login = () => {

    const [view, setView] = React.useState(<WaitForm />)
    
    React.useEffect(
        () => {
            let user = JSON.parse(localStorage.getItem("domail_user"))
            
            if (user===null) {
                setView(<LoginForm />)
            }else{
                setView(<EnterForm changeView={setView} changeTo={<LoginForm />} userData={user}/>)
            }
            
        }, []
    )

    return(
        <div id="login">
            <div className='auth'>
                <div className='auth_declaration'>
                    <div className='declare'>
                        <p>
                            Welcome to domail. We offer email services, that serve your purpose the best, with our security and easy-to-use application.
                        </p>
                        <p>
                            Register for an account to get started and create an @domail account and login, to enjoy our services.
                        </p>
                    </div>
                    <div className='purpose'>
                        Login to your account with @domail.
                    </div>
                </div>
                <hr/>
                <div className='authenticate'>
                    {view}
                </div>
            </div>
            <Link to="/register"><Travel text="Register for a new account" /></Link>
        </div>
    )
}

export default Login;