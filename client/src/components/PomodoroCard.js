import React, { useState,useEffect } from 'react';
import TimeDisplay from './TimeDisplay';
import TimerOptions from './TimerOptions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pomodoroFocusTime, pomodoroBreakTime } from '../actions';
import './PomodoroCard.css';
import musicIcon from '../img/music.svg'

const focusOptions = [15,25,35,45];
const breakOptions = [5,10,15,20];
const defaultFocusOption = 1;
const defaultBreakOption = 0;

const PomodoroCard = (props) => {
  const [timer, setTimer] = React.useState(null);
  // const [focusSessionTime, setFocusSessionTime] = useState(focusOptions[1]*60);
  // const [breakSessionTime, setBreakSessionTime] = useState(breakOptions[0]*60);

  const selectedFocusTime = useSelector((state) => state.selectedFocusTime);
  const dispatch = useDispatch()

  const onSelectFocus = (data) => {
    dispatch(pomodoroFocusTime(data))
  }
  const onSelectBreak = (data) => {
    dispatch(pomodoroBreakTime(data))
  }
  
  return (
    <div className="PomodoroCard">
      <div className="topSection">
        <div className="timerButtons">
          <TimerOptions
            label='Focus Time'
            options={focusOptions}
            selected={defaultFocusOption}
            onSelect={(onSelectFocus)}
          />
          <TimerOptions
            label='Break Time'
            options={breakOptions}
            selected={defaultBreakOption}
            onSelect={(onSelectBreak)}
          />
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
      <div className="centerSection">
        <div className="timer">
          <TimeDisplay
            timeInSeconds={selectedFocusTime*60}
          />
        </div>
        <div className="button">
          <Link to={ `/pomodoro` }>
            Start
          </Link>
        </div>
      </div>
      <div className="bottomSection">
        <div className="taskSection">
          task item here
        </div>
      </div>
    </div>
  );
}

export default PomodoroCard;