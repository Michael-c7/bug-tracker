import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext'
import { Link } from "react-router-dom";
import demoUserLoginInfo from "../demoUserLoginInfo"
import "../styles/components.scss";

import Loading from "./Loading"

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

    let signInDemoAdmin = _ => signInUser(demoUserLoginInfo.admin.email, demoUserLoginInfo.admin.password)
    let signInDemoProjectManger = _ => signInUser(demoUserLoginInfo.projectManager.email, demoUserLoginInfo.projectManager.password)
    let signInDemoSubmitter = _ => signInUser(demoUserLoginInfo.submitter.email, demoUserLoginInfo.submitter.password)
    let signInDemoDeveloper = _ => signInUser(demoUserLoginInfo.developer.email, demoUserLoginInfo.developer.password)
    

    

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
                </div>
            </form>

            <div>
                <h2 className="center-text form-sub-header">Try a Demo account!</h2>
                <div className="form-column">
                    <button className="form-item btn-secondary" onClick={() => signInDemoAdmin()}>Admin</button>
                    <button className="form-item btn-secondary" onClick={() => signInDemoProjectManger()}>Project Manager</button>
                    <button className="form-item btn-secondary" onClick={() => signInDemoSubmitter()}>submitter</button>
                    <button className="form-item btn-secondary" onClick={() => signInDemoDeveloper()}>Developer</button>
                </div>
            </div>
        </section>
    )
}


export default SignIn;
