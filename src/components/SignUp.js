import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext';
import "../styles/login.scss"



const SignUp = () => {
    const emailRef = useRef()
    const nameRef = useRef() 
    const passwordRef = useRef()   

    const { registerUser } = useUserContext()

    const onSubmit = e => {
        e.preventDefault()
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        if(email && name &&  password) {
            registerUser(email, name, password)
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

                <button className="login-button-main" type="submit">Sign Up</button>
                
                {/* <div className="login-secondary-text">
                    Already have an account? <button>Log In</button>
                </div> */}
            </form>
        </section>
    )
}

export default SignUp;