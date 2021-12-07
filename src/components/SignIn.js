import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext'
import { Link } from "react-router-dom";

const SignIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef() 
    const { signInUser } = useUserContext()

    const onSubmit = e => {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(email && password) signInUser(email, password)
    }  

    return (
        <section className="form-container center-transform">
            <h1 className="form-header center-text spacing-box-t-xl">Sign In</h1>
            <form className="form-column" onSubmit={onSubmit}>
                <label className="form-label spacing-box-tb-xs">
                    <input className="form-input" type="email" required ref={emailRef} placeholder="Email"/>    
                </label>

                <label className="form-label spacing-box-tb-xs">
                    <input className="form-input" type="text" required ref={passwordRef} placeholder="Password"/>    
                </label>

                <button className="btn-main spacing-box-tb-m" type="submit">Sign In</button>
                
                <div className="spacing-box-tb-s center-text">
                    <div className="spacing-box-tb-xxs">Forgot your <Link className="center-text link-main" to="/forgotPassword">Password?</Link></div>
                    <div className="spacing-box-tb-xxs">Don't Have an Account? <Link className="link-main" to="/SignUp">Sign Up</Link></div>
                    <div className="spacing-box-tb-xxs">Just Curious? Try a <Link className="link-main" to="/TryDemoAccount">Demo Account</Link></div>
                </div>
            </form>
        </section>
    )
}


export default SignIn;