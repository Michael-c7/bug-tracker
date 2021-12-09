import React from 'react'
import { useUserContext } from '../../context/userContext'
import { FaTimes } from "react-icons/fa";
import "../../styles/dashboard_styles/AreYouSureMsg.scss";

const AreYouSureMsg = () => {
    const { user, logoutUser, userInfo, modalOpen, setModalOpen } = useUserContext()

    return (
        <section className={`form-container center-transform areYouSureMsg ${modalOpen ? "show-msg" : "hide-msg"}`}>
            <button className="areYouSureMsg__close-btn" onClick={() => setModalOpen(false)}>
                <FaTimes/>
            </button>
            <h2 className="areYouSureMsg__heading">Are you sure you want to logout?</h2>
            <button className="btn-main areYouSureMsg__logout" onClick={logoutUser}>Logout</button>
        </section>
    )
}

export default AreYouSureMsg;
