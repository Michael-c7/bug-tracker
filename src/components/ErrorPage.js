import React from 'react'
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="form-container center-transform center-text">
            <h1 className="form-header">Something went wrong.</h1>
            <div className="spacing-box-tb-s shrug">¯\_(ツ)_/¯</div>
            <button className="btn-main"><Link to="/signIn">Go Home</Link></button>
        </div>
    )
}

export default ErrorPage;
