import React from 'react'
import { useUserContext } from '../context/userContext'
import { FaHome,FaFolderOpen, FaTicketAlt } from "react-icons/fa"
import "../styles/dashboard.scss"


const Dashboard = () => {
    const { user, logoutUser, userInfo } = useUserContext()
    const { email, name, role, uid } = userInfo

    React.useEffect(() => {
        console.log(userInfo)
    }, [])
    return (
        <main className="dashboard-container">
            <nav className="dashboard-navbar">
                <button onClick={logoutUser}>Log Out</button>
            </nav>

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
                </ul>
            </nav>

            <section className="dashboard">
                <h3>dashboard</h3>
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
