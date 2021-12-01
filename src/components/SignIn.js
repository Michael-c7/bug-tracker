import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext'
import { Link } from "react-router-dom";
import demoUserLoginInfo from "../demoUserLoginInfo"

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
        <section className="login-container">
            <h1 className="login-heading">Sign In</h1>
            <form className="login-form" onSubmit={onSubmit}>

                <label htmlFor="email">Email</label>
                <input id="email" className="login-input" type="email" required ref={emailRef}/>

                <label htmlFor="password">Password</label>
                <input id="password" className="login-input" type="text" ref={passwordRef}/>

                <button className="login-button-main" type="submit">Sign In</button>
                
                <Link className="login-button-main" to="/forgotPassword">forgot password?</Link>

                <div className="login-button-main">Dont have an account? <Link to="/SignUp">Sign up</Link></div>
            </form>

            <div className="demo-user-container">
                <h2>Try a demo user!</h2>
                <button onClick={() => signInDemoAdmin()}>Admin</button>
                <button onClick={() => signInDemoProjectManger()}>Project Manager</button>
                <button onClick={() => signInDemoSubmitter()}>submitter</button>
                <button onClick={() => signInDemoDeveloper()}>Developer</button>
            </div>
        </section>
    )
}


export default SignIn;
