import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import profileService from '../../../../features/profile/profileService';
import moment from 'moment';

const Reply = ({reply}) => {

    const { user } = useSelector((state) => state.auth);
    const [replierPhoto, setReplierPhoto] = useState('');
        useEffect(async() => {
            const data = await profileService.getCodeforcesUserProfile(reply.who.userName);
            setReplierPhoto(data.titlePhoto);
        }, [])  
  return (
    <div className='w-3/4 ml-12 m-6 border'>
      <article class="my-6 ml-6 text-base bg-white rounded-lg dark:bg-gray-900">
                        <footer class="flex justify-between items-center mb-2">
                            <div class="flex items-center ">
                               
                                    <img
                                    class="mr-2 w-6 h-6 rounded-full"
                                    src={replierPhoto}
                                    alt="Jese Leos"/>
                               <div className='flex flex-col'>
                               <div className='text-sm'> {reply.who.userName}</div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">{moment(new Date(reply.createdAt)).fromNow()}</div>
                               </div>
                            </div>
                        </footer>
                        <p class="text-gray-500 dark:text-gray-400 text-sm">{reply.content}</p>
                    </article>
    </div>
  )
}

export default Reply