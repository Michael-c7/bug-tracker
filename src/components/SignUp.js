import React, { useState, useRef } from 'react'
import "../styles/login.scss"
import { signUp, login } from "../firebase"


const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const emailRef = useRef()
    const passwordRef = useRef()    

    const handleSignUp = async (e) => {
        e.preventDefault()
        let unmounted = false
        setLoading(true)
        try {
            if(!unmounted) {
                await signUp(emailRef.current.value,passwordRef.current.value)
            }

            return () => {
                unmounted = true;
              }
        } catch(error) {
            console.log(error)
            alert(error)
        }
        setLoading(false)
    }

    const handleLoginIn = async (e) => {
        e.preventDefault()
        let unmounted = false
        setLoading(true)
        try {
            if(!unmounted) {
                await login(emailRef.current.value,passwordRef.current.value)
            }

            return () => {
                unmounted = true;
              }
        } catch(error) {
            console.log(error)
        }
        setLoading(false)
    }
    
    return (
        <section className="login-container">
            <h1 className="login-heading">Sign Up</h1>
            <form className="login-form">
                {/*
                    add first name & last name inputs
                */}

                <label htmlFor="username">Email</label>
                <input id="email" className="login-input" type="email" required ref={emailRef}/>

                <label htmlFor="password">Password</label>
                <input id="password" className="login-input" type="text"  ref={passwordRef}/>

                <button className="login-button-main" onClick={handleSignUp}>Sign Up</button>
                
                <div className="login-secondary-text">
                    Already have an account? <button onClick={handleLoginIn}>Log In</button>
                </div>

                {/*
                    add reset password button

                    add login as guest button
                */}
            </form>

            
        </section>
    )
}

export default SignUp;