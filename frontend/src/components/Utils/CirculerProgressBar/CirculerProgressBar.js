import React from 'react'
import './progressBar.min.css'
const CirculerProgressBar = ({percentage}) => {
    return (
        <div className='container1' style={{ background: `conic-gradient(#76B46E ${percentage / 100 * 360}deg, #ededed 0deg)` }}>

            <div className='bar1'>

            </div>
            <div className='bar-text1'>{parseFloat(percentage).toFixed(2)}%</div>
        </div>
    )
}

export default CirculerProgressBar