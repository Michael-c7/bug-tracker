import React from 'react'
import { useAuth, logout } from "../firebase"

const Dashboard = () => {
    const currentUser = useAuth()

    const handleLogout = async  _ => {
        // setLoading(true)
        try {
            await logout()
        } catch(error) {
            console.log(error.message)
        }
        // setLoading(false)
    }

    return (
        <div>
            dashboard component
            <div>current users email: {currentUser?.email}</div>

            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Dashboard
