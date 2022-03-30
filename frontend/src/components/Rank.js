import React from 'react'
import '../stylesheet/Rank.css'
const Rank = (props) => {

    const divStyle = {
        color: '#0000'
   }

   if(props.rank === 'specialist')
   {
     divStyle.color = '#03a89e'
   }

  return (
    <div className='userrank' style={divStyle}>
        <h5>{props.rank}</h5>
    </div>
  )
}

export default Rank