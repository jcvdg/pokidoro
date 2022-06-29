import React, { useState,useEffect } from 'react';
import TimeDisplay from './TimeDisplay';
import TimerOptions from './TimerOptions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pomodoroFocusTime, pomodoroBreakTime } from '../actions';


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
    <div>
      <div className="timerButtons">
        <div className="sessionType">
            <p>Focus Time</p>
            <div className="timeSelector">
                <TimerOptions
                  type = "FOCUS"
                  options={focusOptions}
                  selected={defaultFocusOption}
                  // onSelectedChange={setFocusSessionTime} 
                  onSelect={(onSelectFocus)}
                />
            </div>
        </div>
        <div className="sessionType">
            <p>Break Time</p>
            <div className="timeSelector">
                <TimerOptions
                  type = "BREAK"
                  options={breakOptions}
                  selected={defaultBreakOption}
                  // onSelectedChange={setBreakSessionTime} 
                  onSelect={(onSelectBreak)}
                />
            </div>
        </div>
      </div>
      <TimeDisplay timeInSeconds={selectedFocusTime*60}/>
      <div className="button">
          <Link to={`/pomodoro`}>
            Start
          </Link>
      </div>
    </div>
  );
}

export default PomodoroCard;