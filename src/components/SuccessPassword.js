import React from 'react'
import { Link } from "react-router-dom";


const SuccessPassword = () => {
    return (
        <section className="form-container center-transform center-text">
            <h2 className="form-header center-text spacing-box-t-xl">Success!</h2>
            <p>Check your email for the link to reset your password</p> 
            <button className="btn-main spacing-box-tb-l"><Link to="/SignIn">Sign In</Link></button>
        </section>
    )
}

export default SuccessPassword;
