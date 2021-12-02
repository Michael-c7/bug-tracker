import React from 'react'
import { useUserContext } from '../context/userContext'
import "../styles/errorMsg.scss"

const ErrorMsg = () => {
    const { error } = useUserContext()
    const [showErrorMsg, setShowErrorMsg] = React.useState(true)

    return (
        <div className={showErrorMsg ? `error-container error-show` : `error-container error-hide`}>
            <div className="error-msg">{error}</div>
            <button className="error-close-btn" onClick={() => setShowErrorMsg(!showErrorMsg)}>&times;</button>
        </div>
    )
}

export default ErrorMsg;
