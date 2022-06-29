import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './PomodoroTimer.css'
import TimeDisplay from './TimeDisplay';

const PomodoroTimer = (props) => {
  const selectedFocusTime = useSelector((state) => state.selectedFocusTime);
  const selectedBreakTime = useSelector((state) => state.selectedBreakTime);
  const dispatch = useDispatch();

  // states
  const [timerState, setTimerState] = useState('DEFAULT');

  const [timer, setTimer] = useState();
  const [runTimer, setRunTimer] = useState(false);
  const [focus, setFocus] = useState(true);
  const [pause, setPause] = useState(false);
  const [runningTime, setRunningTime] = useState(selectedFocusTime);


  // on component load, start focus timer
  // 'DEFAULT', 'FOCUS_SESSION_START', 'FOCUS_SESSION_COMPLETE', 'BREAK_SESSION_START', 'BREAK_SESSION_COMPLETE'
  useEffect( () => {
    startTimer();

  },[])

  const startTimer = () => {
    if (focus) {
        setRunningTime(selectedFocusTime);
        setTimerState('FOCUS_SESSION_START');
        // setCount(count+1);
    } else {
        setRunningTime(selectedBreakTime);
        setTimerState('BREAK_SESSION_START');
    }
    setRunTimer(true);
    setPause(false);
    console.log('starttimer');
  };

  useEffect(() => {
    let interval = 0;

    if (runTimer) {
        interval = setInterval(updateTime, 1000);
        console.log('everryun');
        setTimer(interval);
    }

    return () => {
        console.log('useeffect return - ran');
        clearInterval(interval);
    };
  }, [runTimer, runningTime]);

  const updateTime = () => {
    if (runningTime > 0) {
      setRunningTime(runningTime => runningTime - 1);
      console.log(`if greater, `, runningTime);
    }
    console.log(`run focus session time - decrement`, runningTime);
    if (runningTime === 0) {
      if (focus)  {
          setTimerState('FOCUS_SESSION_COMPLETE');
          console.log('..................................', '..................................')
      } else {
          setTimerState('BREAK_SESSION_COMPLETE');
      }
      setRunTimer(false);
      setFocus(!focus);
      clearInterval(timer);
    }
  };

  const pauseTimer = () => {
    clearInterval(timer);
    setRunTimer(!runTimer);
    setPause(!pause);
    console.log('pause completeTimer: ', runTimer);
  };

  return (
    <div className='PomodoroTimer'>
      <div className="button">
          <Link to={`/`}>
            Back
          </Link>
      </div>
      <div>
        Pomodoro Timer:       
        <TimeDisplay timeInSeconds={selectedFocusTime*60}/>
      </div>
      <div>
        Break time:
        <TimeDisplay timeInSeconds={selectedBreakTime*60}/>
      </div>
      <div>
        What the user will see:
        <TimeDisplay timeInSeconds={ (runTimer || pause) ? runningTime : focus ? selectedFocusTime*60 : selectedBreakTime*60}/>
      </div>
      <div 
        className="button"
        onClick={ pauseTimer }
        style={{ display: runningTime > 0 ? "flex" : "none" }}
      >
        {runTimer ? "Pause" : "Resume" }
      </div>
      <div
        className="button"
        style={{ display: runningTime === 0 ? "flex" : "none" }}
        // onClick={}
      >
        Start Break
      </div>
      <div
        className="button"
        style={{ display: runningTime === 0 ? "flex" : "none" }}
        // onClick={}
      >
        Add 5 more minutes
      </div>
    </div>
  );
}

export default PomodoroTimer;