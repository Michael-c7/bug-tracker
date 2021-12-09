import React from 'react'
import { Link } from "react-router-dom";
import { useUserContext } from '../context/userContext'

const ErrorPage = () => {
    const { user } = useUserContext()

    return (
        <div className="form-container center-transform center-text">
            <h1 className="form-header">Something went wrong.</h1>
            <div className="spacing-box-tb-s shrug">¯\_(ツ)_/¯</div>
            <button className="btn-main"><Link to={user ? "/dashboard/home" : "/SignIn"}>Go Home</Link></button>
        </div>
    )
}

export default ErrorPage;
