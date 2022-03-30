import React from 'react';
import RegisterForm from './RegisterForm';
import "../auth.css";
import Travel from "../Travel";
import { Link } from 'react-router-dom';

const Register = () => {
    
    return(
        <div id="register">
            
            <div className='auth'>
                <div className='auth_declaration'>
                    <div className='declare'>
                        <p>
                            Welcome to domail.
                        </p>
                        <p>
                            Register for a new account to enjoy our services with an @domail account.
                        </p>
                    </div>
                    <div className='purpose'>
                        Register for a new account with @domail.
                    </div>
                </div>
                <hr/>
                <div className='authenticate'>
                    <RegisterForm />
                </div>
            </div>
            <Link to="/"><Travel text="Login to your account" /></Link>
        </div>
    )
}

export default Register;