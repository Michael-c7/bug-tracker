import React from 'react'
import { Link } from "react-router-dom";
import { useUserContext } from '../../context/userContext'
import { FaTimes } from "react-icons/fa";
import "../../styles/dashboard_styles/logoutMsg.scss";

const LogoutMsg = () => {
    const { logoutModal, setLogoutModal, logout } = useUserContext()

    const closeModal = e => {
        if (e.target.closest(".modal__close-btn") ||
            !e.target.closest(".modal")) {
                setLogoutModal(false)
          }
    }

    return (
        <section className={`modal-container ${logoutModal ? "show" : "hide"}`} onClick={() => closeModal(false)}>
            <div className="form-container center-transform modal" onClick={() => closeModal(false)}>
                <button className="modal__close-btn"><FaTimes/></button>
                <div className="modal-input-container">
                    <h2>Are you sure you want to logout?</h2>
                    <button className="btn-main" onClick={logout}>
                        <Link to="/SignIn">Logout</Link>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LogoutMsg;
