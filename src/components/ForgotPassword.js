import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext'
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const emailRef = useRef()

    const { forgotPassword } = useUserContext()

    const forgotPasswordHandler = _ => {
        const email = emailRef.current.value;
        if(email) forgotPassword(email).then(() => emailRef.current.value = "")
    }

    return (
        <section className="form-container center-transform">
            <h1 className="form-header center-text spacing-box-t-xl">Reset Password</h1>
            <form className="form-column" onSubmit={forgotPasswordHandler}>
                <label className="form-label spacing-box-tb-m">
                    <input className="form-input" type="email" required ref={emailRef} placeholder="Email"/>
                </label>

                <button className="btn-main" type="submit"><Link to="/SuccessPassword">Send password reset email</Link></button>
            </form>

            <div className="spacing-box-tb-m center-text">
                <div className="spacing-box-tb-xxs">Already have an account? <Link className="link-main" to="/SignIn">Sign In</Link></div>
                <div className="spacing-box-tb-xxs">Dont have an account? <Link className="link-main" to="/SignUp">Sign up</Link></div>
            </div>
        </section>
    )
}

export default ForgotPassword;