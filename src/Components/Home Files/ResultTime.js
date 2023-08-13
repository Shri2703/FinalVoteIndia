
import React, { useState, useEffect,useRef } from 'react';
import Winner from './Winner';
import './ResultTime.css'


const ResultTime = () => {
  const [timer, setTimer] = useState(60);
  const [timerEnded, setTimerEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setTimerEnded(true);
    }
  }, [timer]);

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;

  if (timerEnded) {
    return(
      <>
      <Winner/>
      <h1>Results Published..</h1>
      </>
      
    ) 
    
    
  }

  return (
    <div>
      {/* <p>Voting Ends in : {formattedTime}</p> */}
      {/* <Toast ref={toast} /> */}
      <span className="text-xl">Voting Results will be published in : {formattedTime}</span>
    </div>
  );
};

export default ResultTime;
