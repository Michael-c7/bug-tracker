import React from 'react'
import { useUserContext } from '../context/userContext'
import "../styles/errorMsg.scss"

const ErrorMsg = () => {
    const { error } = useUserContext()
    const [showErrorMsg, setShowErrorMsg] = React.useState(error)

    return (
        <div className={showErrorMsg ? `error-container error-show` : `error-container error-hide`}>
            <div className="error-msg">{error}</div>
            <button className="error-close-btn" onClick={() => setShowErrorMsg(false)}>&times;</button>
        </div>
    )
}

export default ErrorMsg;
