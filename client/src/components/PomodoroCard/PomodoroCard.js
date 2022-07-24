import React, { useState, useEffect } from 'react';
import TimeDisplay from '../TimeDisplay/TimeDisplay';
import TimerOptions from '../TimerOptions/TimerOptions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pomodoroFocusTime, pomodoroBreakTime, selectedFocusOption, selectedBreakOption } from '../../store/actions/pomodoroControl';
import { getBerriesCount } from '../../store/actions/getData'
import './PomodoroCard.css';
import { BERRY_IMG_URL } from '../../constants';
// import musicIcon from '../img/music.svg'

const focusOptions = [5,25,35,45];
const breakOptions = [2,10,15,20];

const PomodoroCard = (props) => {
  const user = useSelector((state) => state.authReducer.authData);
  const selectedFocusTime = useSelector((state) => state.selectedFocusTime);
  const selectedBreakTime = useSelector((state) => state.selectedBreakTime);
  const berryCount = useSelector((state) => state.berriesCount.berryCount);

  const dispatch = useDispatch()

  const onSelectFocus = (data) => {
    dispatch(pomodoroFocusTime(data))
  }
  const onSelectBreak = (data) => {
    dispatch(pomodoroBreakTime(data))
  }

  // on initial load, update action
  useEffect(() => {
    if (user) dispatch(getBerriesCount());
  },[]);

  return (
    <div className="PomodoroCard">
      <div className="topSection">
        <div className="timerButtons">
          <TimerOptions
            label='Focus Time'
            options={focusOptions}
            selected = {selectedFocusTime}
            onSelect={onSelectFocus}
          />
          <TimerOptions
            label='Break Time'
            options={breakOptions}
            selected = {selectedBreakTime}
            onSelect={onSelectBreak}
          />
        </div>
        {/* <div className="soundscape">
          <div className="btn">
            <img 
              src={ musicIcon } 
              className="musicIcon icon-btn"
              alt="music icon"
            />
          </div>
          <div className='berries'>35</div>
        </div> */}
        <div className="leftContainer">
          {/* <div className="soundscape">
            <div className="btn">
              <img 
                src={ musicIcon } 
                className="musicIcon icon-btn"
                alt="music icon"
              />
            </div>
          </div> */}
          <div className='berries'>
            <div>{ berryCount }</div>
            <img src={ BERRY_IMG_URL } alt="berry"/>
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
      {/* <div className="bottomSection">
        <div className="taskSection">
          <div>
            task item here
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default PomodoroCard;