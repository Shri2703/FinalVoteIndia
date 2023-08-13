import { Button } from 'primereact/button';
import React, { useState, useEffect,useRef } from 'react';
import Result from './Result';


const CountdownTimer = () => {
  const [timer, setTimer] = useState(120);
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
    return <Result />;
    
  }

  return (
    <div>
      {/* <p>Voting Ends in : {formattedTime}</p> */}
      {/* <Toast ref={toast} /> */}
      <span className="text-x">Voting Ends in : {formattedTime}</span>
    </div>
  );
};

export default CountdownTimer;
