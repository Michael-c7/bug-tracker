import React, { useRef } from 'react'
import { useUserContext } from '../context/userContext'

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
        <section className="login-container">
            <h1 className="login-heading">Sign In</h1>
            <form className="login-form" onSubmit={onSubmit}>

                <label htmlFor="email">Email</label>
                <input id="email" className="login-input" type="email" required ref={emailRef}/>

                <label htmlFor="password">Password</label>
                <input id="password" className="login-input" type="text" ref={passwordRef}/>

                <button className="login-button-main" type="submit">Sign In</button>
                
                <button  className="login-button-main">forgot password?</button>
            </form>
        </section>
    )
}


export default SignIn;
