import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import {HowlOptions} from "howler";
import soundRainStorm from '../assets/sounds/heavy-rain-storm-sounds.mp3';

import { startFocusSession, endFocusSession, startBreakSession, endBreakSession, defaultState } from '../store/actions/timerState';
import { event, addSessionStats, updateWeeklyStats } from '../store/actions/index';

import TimeDisplay from './TimeDisplay';
import DisplayPokemon from './DisplayPokemon';
import './PomodoroTimer.css'
import backIcon from '../img/Back-Vector.svg';
import musicIcon from '../img/music.svg';
import musicOffIcon from '../img/musicoff.svg';

const PomodoroTimer = (props) => {
  const selectedFocusTime = useSelector((state) => state.selectedFocusTime);
  const selectedBreakTime = useSelector((state) => state.selectedBreakTime);
  const pomodoroState = useSelector((state) => state.pomodoroState);
  const surpriseEvent = useSelector((state) => state.getEvent.data);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // states
  const [timer, setTimer] = useState();
  const [runTimer, setRunTimer] = useState(false);
  const [focus, setFocus] = useState(true);
  const [timerPause, setTimerPause] = useState(false);
  const [runningTime, setRunningTime] = useState(selectedFocusTime);
  const [play, audioOptions] = useSound(soundRainStorm, {loop: true});
  const [isPlaying, setIsPlaying] = useState(false);

  // on component load, start timer countdown
  useEffect( () => {
    startTimer();
  },[])

  const startTimer = () => {
    console.log('start', pomodoroState)
    if (focus) {
        setRunningTime(selectedFocusTime*60);
        dispatch(startFocusSession());
        // setCount(count+1);
    } else {
        setRunningTime(selectedBreakTime*60);
        dispatch(startBreakSession());
    }
    setRunTimer(true);
    setTimerPause(false);
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
      // pre-fetch the data
      if( focus && runningTime === 4) {
        dispatch(event(selectedFocusTime));
      }
      setRunningTime(runningTime => runningTime - 1);
      // console.log(`if greater, `, runningTime);
    }
    // console.log(`run focus session time - decrement`, runningTime);
    if (runningTime === 0) {
      if (focus)  {
          dispatch(endFocusSession())
          dispatch(updateWeeklyStats(
            { focusTime: selectedFocusTime,
              taskCompleted: 0,
              cycle: 0,
            }
          ));
          console.log('..................................')
      } else {
          let cycles = 0;
          dispatch(endBreakSession());
          dispatch(addSessionStats(
            { sessionDateTime: new Date(), 
              focusTime: selectedFocusTime,
              breakTime: selectedBreakTime,
            }
          ), cycles);
          dispatch(updateWeeklyStats(
            { 
              breakTime: selectedBreakTime,
            }
          ));
          navigateHome();
      }
      setRunTimer(false);
      setFocus(!focus);
      clearInterval(timer);
    }
  };

  const pauseTimer = () => {
    clearInterval(timer);
    setRunTimer(!runTimer);
    setTimerPause(!timerPause);
    console.log('pause completeTimer: ', runTimer);
  };

  const handleMusicClick = () => {
    console.log('playing music requested, ', audioOptions)
    if (isPlaying) {
      audioOptions.pause();
      console.log('stop')
      setIsPlaying(!isPlaying);
    } else {
      play();
      console.log('play')
      setIsPlaying(!isPlaying);
    }
  }

  const handlePageChange = () => {
    dispatch(defaultState());
  }

  const navigateHome = () => {
    dispatch(defaultState());
    return navigate("/");
  }

  return (
    <div className='PomodoroTimer'>
      <div className="topSection">
        <div 
          className="navgation-btn btn"
          >
          <Link to={`/`}>
            <img 
              src={ backIcon } 
              className="backIcon .icon-btn"
              alt="back-arrow icon"
              onClick={ handlePageChange }
            />
          </Link>
        </div>
        <div className="soundscape">
          <div 
            className="btn"
            >
            <img 
              src={ isPlaying ? musicIcon : musicOffIcon } 
              className={"musicIcon icon-btn"}
              alt="music icon"
              onClick={ handleMusicClick }
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
        <TimeDisplay timeInSeconds={ (runTimer || timerPause) ? runningTime : focus ? selectedFocusTime*60 : selectedBreakTime*60}/>
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
      <div className="taskItem" style={{display: pomodoroState === 'FOCUS_SESSION_START'? "" : "none"}}>
        <input type="checkbox"/>
        <div className="taskName">
            task item here
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;