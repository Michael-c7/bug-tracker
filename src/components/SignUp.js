import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext';
import "../styles/login.scss"



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
        <section className="login-container">
            <h1 className="login-heading">Sign Up</h1>
            <form className="login-form" onSubmit={onSubmit}>

                <label htmlFor="name">Name</label>
                <input id="name" className="login-input" type="text" ref={nameRef}/>

                <label htmlFor="email">Email</label>
                <input id="email" className="login-input" type="email" ref={emailRef}/>

                <label htmlFor="password">Password</label>
                <input id="password" className="login-input" type="text" ref={passwordRef}/>

                <label htmlFor="role">Select a role</label>
                <select name="role" id="role" ref={roleRef}>
                    <option value="submitter">submitter</option>
                    <option value="project manager">project manager</option>
                    <option value="developer">developer</option>
                    <option value="admin">admin</option>
                </select>

                <button className="login-button-main" type="submit">Sign Up</button>
                
                {/* <div className="login-secondary-text">
                    Already have an account? <button>Log In</button>
                </div> */}
            </form>
        </section>
    )
}

export default SignUp;