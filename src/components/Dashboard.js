import React from 'react'
import { useUserContext } from '../context/userContext'

const Dashboard = () => {
    const { user, logoutUser, userInfo } = useUserContext()
    const { email, name, role, uid } = userInfo

    React.useEffect(() => {
        console.log(userInfo)
    }, [])
    return (
        <div>
            <h1>dashboard component</h1>
            <h2>Name : {name ? name : "Loading Name..."}</h2>
            <h3>Email : {user.email ? user.email : "Loading Email..."}</h3>
            <h3>Role : {role ? role : "Loading Role.."}</h3>

            <button onClick={logoutUser}>Log Out</button>
        </div>
    )
}

export default Dashboard
