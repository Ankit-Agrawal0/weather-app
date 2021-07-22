import React from 'react'
import '../scss/Loading.scss'
const Loading = () => {
    return (
        <div className='SECTION'>
            <div className="center">
                <div className="loader"></div>
                <p className="text">Weather is loading....</p>
            </div>
        </div>
    )
}

export default Loading
