import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import profileService from '../../../../features/profile/profileService';
import moment from 'moment';

const Reply = ({ reply }) => {

  const { user } = useSelector((state) => state.auth);
  const [replierPhoto, setReplierPhoto] = useState('');
  useEffect(async () => {
    const data = await profileService.getCodeforcesUserProfile(reply.who.userName);
    setReplierPhoto(data.titlePhoto);
  }, [])
  return (
    <div className='w-3/4 ml-12 m-6 border'>
      <article className="my-6 ml-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center ">

            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={replierPhoto}
              alt="Jese Leos" />
            <div className='flex flex-col'>
              <div className='text-sm'> {reply.who.userName}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{moment(reply.createdAt).fromNow()}</div>
            </div>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{reply.content}</p>
      </article>
    </div>
  )
}

export default Reply