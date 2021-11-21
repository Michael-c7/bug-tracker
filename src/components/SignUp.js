import React, { useState, useRef } from 'react'
import "../styles/login.scss"
import { signUp, login } from "../firebase"


const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const emailRef = useRef()
    const passwordRef = useRef()

    

    const handleSignUp = async () => {
        setLoading(true)
        try {
            await signUp(emailRef.current.value,passwordRef.current.value)
        } catch(error) {
            console.log(error.message)
        }
        setLoading(false)
    }

    const handleLoginIn = async () => {
        setLoading(true)
        try {
            await login(emailRef.current.value,passwordRef.current.value)
        } catch(error) {
            console.log(error.message)
        }
        setLoading(false)
    }
    
    return (
        <section className="login-container">
            <h1 className="login-heading">Sign Up</h1>
            <form className="login-form">

                <label htmlFor="username">Email</label>
                <input id="email" className="login-input" type="email" required ref={emailRef}/>

                <label htmlFor="password">Password</label>
                <input id="password" className="login-input" type="text"  ref={passwordRef}/>

                <button className="login-button-main" type="submit" onClick={handleSignUp} disabled={loading}>Sign Up</button>
                
                <div className="login-secondary-text">
                    Already have an account? <button onClick={handleLoginIn}>Log In</button>
                </div>
            </form>

            
        </section>
    )
}

export default SignUp;