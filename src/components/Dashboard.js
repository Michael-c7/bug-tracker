import React from 'react'
import { useUserContext } from '../context/userContext'
import { FaHome,FaFolderOpen, FaTicketAlt, FaProjectDiagram, FaPowerOff } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { MdManageAccounts } from "react-icons/md"
import "../styles/dashboard.scss"

const Dashboard = () => {
    const { user, logoutUser, userInfo } = useUserContext()
    const { email, name, role, uid } = userInfo

    React.useEffect(() => {
        console.log(userInfo)
    }, [])


    const logout = desire => {
        logoutUser()
    }
    return (
        <main className="dashboard-container">
            

            <nav className="dashboard-sidebar">
                <ul className="dashboard-sidebar__items">
                    <li className="dashboard-sidebar__item">
                        <a className="dashboard-sidebar__item__icon" href="/"><FaHome/></a>
                    </li>

                    <li className="dashboard-sidebar__item">
                        <a className="dashboard-sidebar__item__icon" href="/"><FaFolderOpen/></a>
                    </li>

                    <li className="dashboard-sidebar__item">
                        <a className="dashboard-sidebar__item__icon" href="/"><FaTicketAlt/></a>
                    </li>

                    <li className="dashboard-sidebar__item">
                        <a className="dashboard-sidebar__item__icon" href="/"><MdManageAccounts/></a>
                    </li>

                    <li className="dashboard-sidebar__item" onClick={() => alert("Are you sure you want to log out?")}>
                        <a className="dashboard-sidebar__item__icon" href="/"><FiLogOut/></a>
                    </li>
                </ul>
            </nav>

            <section className="dashboard">
                <nav className="dashboard__navbar">
                    <h2>Logged in as: {name ? name : "Loading Name..."}</h2>
                    <h2>Role: {role ? role : "Loading Role..."}</h2>
                </nav>
                <div className="dashboard__inner">
                    <h2>Dashboard</h2>
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
