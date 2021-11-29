import React from 'react'
import { useUserContext } from '../context/userContext'

const Dashboard = () => {
    const { user, logoutUser } = useUserContext()

    return (
        <div>
            <h1>dashboard component</h1>
            <h2>Name : {user.displayName}</h2>
            <h3>Email : {user.email}</h3>

            <button onClick={logoutUser}>Log Out</button>
        </div>
    )
}

export default Dashboard
