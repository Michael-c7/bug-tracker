import React from 'react'
import { useUserContext } from '../context/userContext'
import { 
        FaHome,
        FaFolderOpen,
        FaTicketAlt,
        FaProjectDiagram,
        FaPowerOff,
    } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { MdManageAccounts } from "react-icons/md"
import "../styles/dashboard.scss"

import { Link, Outlet } from "react-router-dom";

// components
import Home from "./dashboard_components/Home"
import Projects from "./dashboard_components/Projects"
import LogoutMsg from './dashboard_components/LogoutMsg'
import Modal from "./dashboard_components/Modal"



const Dashboard = () => {
    const { user, logoutUser, userInfo, logoutModal, setLogoutModal } = useUserContext()
    const { email, name, role, uid } = userInfo;
    const [showModal, setShowModal] = React.useState(false)


    // React.useEffect(() => {
    //     console.log(userInfo)
    // }, [])

    return (
        <main className="dashboard-container">
            <LogoutMsg/>
            <Modal showModal={showModal} setShowModal={setShowModal}/>
            <nav className="dashboard-sidebar">
                <ul className="dashboard-sidebar__items">
                    <li className="dashboard-sidebar__item">
                        <Link className="dashboard-sidebar__item__icon" to="/dashboard/Home"><FaHome/></Link>
                    </li>

                    <li className="dashboard-sidebar__item">
                        <Link className="dashboard-sidebar__item__icon" to="/dashboard/Projects"><FaFolderOpen/></Link>
                    </li>

                    <li className="dashboard-sidebar__item">
                        <Link className="dashboard-sidebar__item__icon" to="/dashboard/Tickets"><FaTicketAlt/></Link>
                    </li>

                    <li className="dashboard-sidebar__item">
                        <Link className="dashboard-sidebar__item__icon" to="/dashboard/RoleManagement"><MdManageAccounts/></Link>
                    </li>

                    <li className="dashboard-sidebar__item" onClick={() => setLogoutModal(true)}>
                        <button className="dashboard-sidebar__item__icon remove-btn-default-styles"><FiLogOut/></button>
                    </li>
                </ul>
            </nav>

            <section className="dashboard">
                <nav className="dashboard__navbar">
                    <h2>Logged in as: {name ? name : "Loading Name..."} ({email ? email : "Loading Email..."})</h2>
                    <h2>Role: {role ? role : "Loading Role..."}</h2>
                </nav>
                <div className="dashboard__inner">
                    <Outlet/>
                </div>
            </section>

            {/* <h1>dashboard component</h1>
            <h2>Name : {name ? name : "Loading Name..."}</h2>
            <h3>Email : {user.email ? user.email : "Loading Email..."}</h3>
            <h3>Role : {role ? role : "Loading Role.."}</h3>
            <button onClick={logoutUser}>Log Out</button> */}
        </main>
    )
}

export default Dashboard
