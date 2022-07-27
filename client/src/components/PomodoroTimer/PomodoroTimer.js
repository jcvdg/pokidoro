import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
//import actions
import { startFocusSession, endFocusSession, startBreakSession, endBreakSession, defaultState } from '../../store/actions/timerState';
import { event, addSessionStats, updateWeeklyStats } from '../../store/actions/pomodoroEvent';
// import css, assets and components
import './PomodoroTimer.css'
import TimeDisplay from '../TimeDisplay/TimeDisplay';
import DisplayPokemon from '../DisplayPokemon/DisplayPokemon';
import backIcon from '../../assets/img/Back-Vector.svg';
import musicIcon from '../../assets/img/music.svg';
import musicOffIcon from '../../assets/img/musicoff.svg';
import soundRainStorm from '../../assets/sounds/heavy-rain-storm-sounds.mp3';
// import constants
import types from '../../store/actionTypes';
import { PREFETCH_TIME, MINUTE_TO_SECONDS } from '../../constants';

const PomodoroTimer = (props) => {
  // const user = useSelector((state) => state.authReducer.authData);
  const selectedFocusTime = useSelector((state) => state.selectedFocusTime);
  const selectedBreakTime = useSelector((state) => state.selectedBreakTime);
  const pomodoroState = useSelector((state) => state.pomodoroState);
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

  // determine text to display
  const getButtonText = () => {
    return runTimer ? "Pause" : runningTime > 0 ? "Resume" : "Start Break";
  }

  const getDisplayTime = () => {
    return (runTimer || timerPause) ? runningTime : focus ? selectedFocusTime * MINUTE_TO_SECONDS : selectedBreakTime * MINUTE_TO_SECONDS
  }
  
  // pomodoro timer functions
  const startTimer = () => {
    if (focus) {
      setRunningTime(selectedFocusTime);
      dispatch(startFocusSession());
    } else {
      setRunningTime(selectedBreakTime);
      dispatch(startBreakSession());
    }
    console.log('start', pomodoroState)
    setRunTimer(true);
    setTimerPause(false); // timerPause = !runTimer
  };

  const updateTime = () => {
    if (runningTime > 0) {
      // pre-fetch the data
      if( focus && runningTime === PREFETCH_TIME) {
        dispatch(event(selectedFocusTime));
      }
      setRunningTime(runningTime => runningTime - 1);
    } else {
      if (focus)  {
        dispatch(endFocusSession())
      } else {
        dispatch(endBreakSession());
      }
      setRunTimer(false);
      setFocus(!focus);
      clearInterval(timer);
    }
  };

  // stores user session stats
  const updateFocusSessionStats = () => {
    dispatch(updateWeeklyStats( 
      { 
        focusTime: selectedFocusTime,
        taskCompleted: 0,
        cycle: 0,
      }
    ));
  }
  
  const updateBreakSessionStats = () => {
    dispatch(updateWeeklyStats( 
      { 
        breakTime: selectedBreakTime,
      }
    ));
  }
  
  const addUserSessionStats = () => {
    let cycles = 0;
    dispatch(addSessionStats( // take this out into its own function
      { 
        sessionDateTime: new Date(), 
        focusTime: selectedFocusTime,
        breakTime: selectedBreakTime,
      }
    ), cycles); 
  }

  // pomodoro timer controls
  const pauseTimer = () => {
    clearInterval(timer);
    setRunTimer(!runTimer);
    setTimerPause(!timerPause);
  };

  const handleTimerControl = () => {
    runningTime > 0 ? pauseTimer() : startTimer();
  }

  const handleMusicClick = () => {
    if (isPlaying) {
      audioOptions.pause();
      // console.log('stop')
      setIsPlaying(!isPlaying);
    } else {
      play();
      // console.log('play')
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
   
  // on component load, start timer countdown
  useEffect( () => {
    startTimer();
  },[])

  // update timer time
  useEffect(() => {
    let tempInterval;
    if (runTimer) {
      tempInterval = setInterval(updateTime, 1000);
      setTimer(tempInterval);
    }

    return () => {
        clearInterval(tempInterval);
    };
  }, [runTimer, runningTime]);

  // update user data based on timer state
  useEffect(() => {
    if (pomodoroState === types.FOCUS_SESSION_COMPLETE) {
      updateFocusSessionStats();
    } 
    if (pomodoroState === types.BREAK_SESSION_COMPLETE) {
      updateBreakSessionStats();
      addUserSessionStats();
      navigateHome();
    }
  }, [pomodoroState])
  

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
      <div>
        <TimeDisplay timeInSeconds={ getDisplayTime() }/>
      </div>
      <div 
        className="button"
        onClick={ handleTimerControl }
        style={{ display: "flex" }}
      >
        { getButtonText() }
      </div>
      {/* <div
        className="button"
        style={{ display: runningTime === 0 ? "flex" : "none" }}
        // onClick={}
      >
        Add 5 more minutes
      </div> */}
      {/* <div className="taskItem" style={{display: pomodoroState === 'FOCUS_SESSION_START'? "" : "none"}}>
        <input type="checkbox"/>
        <div className="taskName">
            task item here
        </div>
      </div> */}
    </div>
  );
}

export default PomodoroTimer;