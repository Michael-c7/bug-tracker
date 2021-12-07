import React from 'react'
import { useUserContext } from '../context/userContext'
import { Link } from "react-router-dom";
import demoUserLoginInfo from "../demoUserLoginInfo"
import "../styles/components.scss";


const TryDemoAccount = () => {
    const { signInUser } = useUserContext()

    let signInDemoAdmin = _ => signInUser(demoUserLoginInfo.admin.email, demoUserLoginInfo.admin.password)
    let signInDemoProjectManger = _ => signInUser(demoUserLoginInfo.projectManager.email, demoUserLoginInfo.projectManager.password)
    let signInDemoSubmitter = _ => signInUser(demoUserLoginInfo.submitter.email, demoUserLoginInfo.submitter.password)
    let signInDemoDeveloper = _ => signInUser(demoUserLoginInfo.developer.email, demoUserLoginInfo.developer.password)

    return (
        <section className="form-container center-transform">
            <h2 className="form-header center-text spacing-box-t-xl">Try a Demo account!</h2>
            <div className="form-column">
                <button className="form-item btn-secondary" onClick={() => signInDemoAdmin()}>Admin</button>
                <button className="form-item btn-secondary" onClick={() => signInDemoProjectManger()}>Project Manager</button>
                <button className="form-item btn-secondary" onClick={() => signInDemoSubmitter()}>submitter</button>
                <button className="form-item btn-secondary" onClick={() => signInDemoDeveloper()}>Developer</button>
            </div>

            <div className="spacing-box-tb-s center-text">
                <div className="spacing-box-tb-xxs">Don't Have an Account? <Link className="link-main" to="/SignUp">Sign Up</Link></div>
                <div className="spacing-box-tb-xxs">Already have an account? <Link className="link-main" to="/SignIn">Sign In</Link></div>
            </div>
        </section>
    )
}

export default TryDemoAccount;