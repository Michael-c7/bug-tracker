import React from 'react'
import "../styles/loading.scss"


const Loading = () => {
    return (
        <div className="loader-container center-transform">
            <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
