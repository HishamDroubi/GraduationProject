import React from 'react';
import { useState, useEffect } from 'react';

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "July, 31, 2023";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-row gap-2 w-full justify-center'>
      <div className='rounded inline w-6 h-6 bg-black text-sm text-white flex justify-center items-center'> {days}</div>
      <div className='rounded inline w-6 h-6 bg-black text-sm text-white flex justify-center items-center'> {hours}</div>
      <div className='rounded inline w-6 h-6 bg-black text-sm text-white flex justify-center items-center'> {minutes}</div>
      <div className='rounded inline w-6 h-6 bg-black text-sm text-white flex justify-center items-center'> {seconds}</div>
      
      <div></div>
    </div>
  );
};

export default Timer;