import React from 'react'
import CreateAttachmentForm from './CreateAttachmentForm';
import { useSelector } from 'react-redux';


const SideBar = ({group}) => {
    const { user } = useSelector((state) => state.auth);
  return (
    <div className="border p-3 h-screen mr-10 w-1/6">
      {group.coach.email === user.email && (<button className="w-full"><CreateAttachmentForm /></button>)}
      <div className="border h-96 w-full rounded pt-2 px-2">
        <span className="flex justify-center"> Fliter </span>

        <hr/>
      </div>
      </div>
  )
}

export default SideBar