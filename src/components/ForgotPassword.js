import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext'

const ForgotPassword = () => {
    const emailRef = useRef()

    const { forgotPassword } = useUserContext()

    const forgotPasswordHandler = _ => {
        const email = emailRef.current.value;
        if(email) forgotPassword(email).then(() => emailRef.current.value = "")
    }

    return (
        <section className="login-container">
            <h1 className="login-heading">Reset Password</h1>
            <form className="login-form" onSubmit={forgotPasswordHandler}>
                
                <label htmlFor="email">Email</label>
                <input id="email" className="login-input" type="email" required ref={emailRef}/>

                <button className="login-button-main" type="submit">Send reset password email</button>

            </form>
        </section>
    )
}

export default ForgotPassword;