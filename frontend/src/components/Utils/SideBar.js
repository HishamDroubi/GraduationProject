import React from 'react'
import CreateBlogForm from '../groupDetailsComponents/CreateBlogForm'
import { useSelector } from 'react-redux';
import AddPoblemForm from '../AddProblemForm'
import { RadioGroup } from '@mui/material';
import RadioGroupContext from '@mui/material/RadioGroup/RadioGroupContext';

const SideBar = ({ group, level, onFilterHandler }) => {
  const { user } = useSelector((state) => state.auth);
  let percentage = level.solvedProblems.length !== 0 ? level.solvedProblems.length / level.problems.length : 0;
  percentage *= 100;
  console.log(level.problems.length, percentage)
  return (
    <div className="border p-3 h-screen mr-10 w-1/6">
      {group && group.coach.email === user.email && (<button className="w-full"><CreateBlogForm /></button>)}
      {group && (<div className="border h-96 w-full rounded pt-2 px-2">
        <span className="flex justify-center"> Fliter </span>
        <hr />
      </div>)}

      {level && user.role === 'admin' && (<button className="w-full"><AddPoblemForm /></button>)}
      {level  && (<div className="border h-96 w-full rounded pt-2 px-2">
        <span className="flex p-2">Topic:  {level.topic} </span>
        <hr />
        <div className='flex flex-col'>
          <div>
            
            <input onChange={() => onFilterHandler("1")} className='bg-gray-300 m-3' id="choice1" name='filter' type='radio'/>
            <label className='text-sm' for="choice1"><span>Both,</span> <span className='ml-3 text-sm'>{level.problems.length} problems</span></label>
          </div>

          <div>
            <input onChange={() => onFilterHandler("2")} className='bg-gray-300 m-3' id="choice2" name='filter' type='radio'/>
            <label for="choice2"><span>Solved problems,</span> <span className='ml-3 text-sm'>{level.solvedProblems.length} problems</span></label>
          </div>

          <div>
            
            <input onChange={() => onFilterHandler("3")} className='bg-gray-300 m-3' id="choice3" name='filter' type='radio'/>
            <label for="choice3 "><span>Unolved problems,</span> <span className='ml-3 text-sm'>{level.problems.length - level.solvedProblems.length} problems</span></label>

          </div>
          <hr/>
         <div className='m-3'>
         current state: 
          <div className='mt-2 w-full bg-gray-200 rounded-full dark:bg-gray-700'>
          <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${percentage}%`}}> {percentage}%</div>
         </div>

          </div>
        </div>
      </div>)}

    </div>
  )
}

export default SideBar