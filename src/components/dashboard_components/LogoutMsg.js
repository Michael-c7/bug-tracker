import React from 'react'
import { Link } from "react-router-dom";
import { useUserContext } from '../../context/userContext'
import { FaTimes } from "react-icons/fa";
import "../../styles/dashboard_styles/logoutMsg.scss";

const LogoutMsg = () => {
    const { logoutModal, setLogoutModal, logoutUser } = useUserContext()

    const closeModal = e => {
        if (e.target.closest(".modal__close-btn") ||
            !e.target.closest(".modal")) {
                setLogoutModal(false)
          }
    }

    const logout = e => {
        e.preventDefault();
        setLogoutModal(false)
        logoutUser()
    }

    return (
        <section className={`modal-container ${logoutModal ? "show" : "hide"}`} onClick={closeModal}>
            <div className="form-container center-transform modal" onClick={closeModal}>
                <button className="modal__close-btn"><FaTimes/></button>

                <h2 className="center-text spacing-box-tb-m">Are you sure you want to logout?</h2>

                <Link className="center-text logout-btn"  to="/SignIn" onClick={logout}>Logout</Link>
            </div>
        </section>
    )
}

export default LogoutMsg;
