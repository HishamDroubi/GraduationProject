import React, { useEffect, useState } from 'react'
import Reply from './Reply'
import { Collapse } from '@mui/material';
import ButtonSubmit from '../../../Utils/ButtonSubmit';
import { addReply } from '../../../../features/group/groupDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import profileService from '../../../../features/profile/profileService';
import moment from 'moment';
import IconButton from "@mui/material/IconButton";
import { ReplyAll } from 'react-bootstrap-icons';
const Comment = ({ comment, blog }) => {
   // console.log(comment)
    const { user } = useSelector((state) => state.auth);
    const [commenterPhoto, setCommenterPhoto] = useState('');
    useEffect(async () => {
        const data = await profileService.getCodeforcesUserProfile(comment.who.userName);
        setCommenterPhoto(data.titlePhoto);
    }, [])

    const dispatch = useDispatch();

    const [replys, setReplys] = useState(comment.replys);
    const [content, setContent] = useState('');
    const onAddReplyHandler = async () => {
        console.log(user);
        const data = {
            blogId: blog._id,
            user: user,
            content: content,
            commentId: comment._id
        }
        console.log(data);
        const tt = await dispatch(addReply(data));
        console.log(tt.payload);
        setReplys(prev => [...prev, tt.payload]);
        setContent('');
    }

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div className='w-3/4 ml-6 m-6 border'>
            <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center ">
                               
                               <img
                               className="mr-2 w-6 h-6 rounded-full"
                               src={commenterPhoto}
                               alt="Jese Leos"/>
                          <div className='flex flex-col'>
                          <div className='text-sm'> {comment.who.userName}</div>
                           <div className="text-xs text-gray-600 dark:text-gray-400">{moment(new Date(comment.createdAt)).fromNow()}</div>
                          </div>
                       </div>



                </footer>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{comment.content}</p>

                <div className="flex items-center mt-4 space-x-4">
                    <button type="button"
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Reply
                    </button>
                </div>
            </article>

            <Collapse className="border w-3/4 mt-3 rounded m-5" in={expanded} timeout="auto" unmountOnExit>
                <div className="flex p-2">
                    <input type="text" id="first_name" value={content} className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-900 block w-3/4 p-2.5" placeholder="add your reply"
                        onChange={(e) => setContent(e.target.value)} />
                    <IconButton onClick={onAddReplyHandler}>
                        <ReplyAll />
                    </IconButton>

                </div>
                {replys.map(r => <Reply reply={r} />)}
            </Collapse>

        </div>
    )
}

export default Comment