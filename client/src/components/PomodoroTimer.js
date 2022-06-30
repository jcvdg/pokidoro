import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { startFocusSession, endFocusSession, startBreakSession, endBreakSession } from '../actions/timerState';
import TimeDisplay from './TimeDisplay';
import DisplayPokemon from './DisplayPokemon';
import './PomodoroTimer.css'
import backIcon from '../img/Back-Vector.svg';
import musicIcon from '../img/music.svg'

const PomodoroTimer = (props) => {
  const selectedFocusTime = useSelector((state) => state.selectedFocusTime);
  const selectedBreakTime = useSelector((state) => state.selectedBreakTime);
  const dispatch = useDispatch();

  // states
  const [timer, setTimer] = useState();
  const [runTimer, setRunTimer] = useState(false);
  const [focus, setFocus] = useState(true);
  const [pause, setPause] = useState(false);
  const [runningTime, setRunningTime] = useState(selectedFocusTime);

  // on component load, start timer countdown
  useEffect( () => {
    startTimer();
  },[])

  const startTimer = () => {
    if (focus) {
        setRunningTime(selectedFocusTime);
        dispatch(startFocusSession());
        // setCount(count+1);
    } else {
        setRunningTime(selectedBreakTime);
        dispatch(startBreakSession());
    }
    setRunTimer(true);
    setPause(false);
    console.log('starttimer');
  };

  useEffect(() => {
    let interval = 0;

    if (runTimer) {
        interval = setInterval(updateTime, 1000);
        // console.log('everryun');
        setTimer(interval);
    }

    return () => {
        // console.log('useeffect return - ran');
        // console.log('curernt session focus: ', focus)
        clearInterval(interval);
    };
  }, [runTimer, runningTime]);

  const updateTime = () => {
    if (runningTime > 0) {
      setRunningTime(runningTime => runningTime - 1);
      // console.log(`if greater, `, runningTime);
    }
    // console.log(`run focus session time - decrement`, runningTime);
    if (runningTime === 0) {
      if (focus)  {
          dispatch(endFocusSession())
          console.log('..................................')
      } else {
          dispatch(endBreakSession());
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
      <div className="topSection">
        <div className="navgation-btn btn">
          <Link to={`/`}>
            <img 
              src={ backIcon } 
              class="backIcon .icon-btn"
              alt="back-arrow icon"
            />
          </Link>
        </div>
        <div className="soundscape">
          <div className="btn">
            <img 
              src={ musicIcon } 
              class="musicIcon icon-btn"
              alt="music icon"
            />
          </div>
        </div>
      </div>
      <DisplayPokemon />
      {/* <div>
        Pomodoro Timer:       
        <TimeDisplay timeInSeconds={selectedFocusTime*60}/>
      </div>
      <div>
        Break time:
        <TimeDisplay timeInSeconds={selectedBreakTime*60}/>
      </div> */}
      <div>
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
        style={{ display: runningTime === 0 && !focus ? "flex" : "none" }}
        onClick={ startTimer }
      >
        Start Break
      </div>
      {/* <div
        className="button"
        style={{ display: runningTime === 0 ? "flex" : "none" }}
        // onClick={}
      >
        Add 5 more minutes
      </div> */}
      <div className="taskItem">
        <input type="checkbox"/>
        <div className="taskName">
          task item here
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;