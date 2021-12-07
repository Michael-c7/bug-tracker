import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext';
import { Link } from "react-router-dom";

const SignUp = () => {
    const emailRef = useRef()
    const nameRef = useRef() 
    const passwordRef = useRef()
    const roleRef = useRef() 

    const { registerUser } = useUserContext()

    const onSubmit = e => {
        e.preventDefault()
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const password = passwordRef.current.value;
        const role = roleRef.current.value;

        if(email && name &&  password && roleRef) {
            registerUser(email, name, password, role)
        }
    }
    
    
    return (
        <section className="form-container center-transform">
            <h1 className="form-header center-text spacing-box-t-xl">Sign Up</h1>
            <form className="form-column" onSubmit={onSubmit}>
                <label className="form-label spacing-box-tb-xs">
                    <input className="form-input" type="text" ref={nameRef} placeholder="Name"/>   
                </label>

                <label className="form-label spacing-box-tb-xs">
                    <input className="form-input" type="email" ref={emailRef} placeholder="Email"/>
                </label>

                <label className="form-label spacing-box-tb-xs">
                    <input className="form-input" type="text" ref={passwordRef} placeholder="Password"/>
                </label>

                <label className="spacing-box-tb-xxs" htmlFor="role">Select a role</label>
                <select className="spacing-box-lr-xxxs" name="role" id="role" ref={roleRef}>
                    <option value="submitter">submitter</option>
                    <option value="project manager">project manager</option>
                    <option value="developer">developer</option>
                    <option value="admin">admin</option>
                </select>

                <button className="btn-main spacing-box-tb-l" type="submit">Sign Up</button>
            </form>

            <div className="spacing-box-tb-s center-text">
                <div className="spacing-box-tb-xxs">Already have an account? <Link className="link-main" to="/SignIn">Sign In</Link></div>
                <div className="spacing-box-tb-xxs">Just Curious? Try a <Link className="link-main" to="/TryDemoAccount">Demo Account</Link></div>
            </div>
        </section>
    )
}

export default SignUp;