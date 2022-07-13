import React, { useState, useEffect } from 'react';
import TimeDisplay from '../TimeDisplay/TimeDisplay';
import TimerOptions from '../TimerOptions/TimerOptions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pomodoroFocusTime, pomodoroBreakTime } from '../../store/actions/pomodoroControl';
import { getBerriesCount } from '../../store/actions/getData'
import './PomodoroCard.css';
import { BERRY_IMG_URL } from '../../constants';
// import musicIcon from '../img/music.svg'

import { connect } from 'react-redux';

const focusOptions = [15,25,35,45];
const breakOptions = [5,10,15,20];
const defaultFocusOption = 0;
const defaultBreakOption = 0;

const PomodoroCard = (props) => {
  const user = useSelector((state) => state.authReducer.authData);
  // const selectedFocusTime = useSelector((state) => state.selectedFocusTime);
  const berryCount = useSelector((state) => state.berriesCount.berryCount);

  const dispatch = useDispatch()

  // on initial load, update actions
  useEffect(() => {
    if (user) dispatch(getBerriesCount());
  },[]);

  const onSelectFocus = (data) => {
    dispatch(props.pomodoroFocusTime(data))
  }
  const onSelectBreak = (data) => {
    dispatch(props.pomodoroBreakTime(data))
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
            timeInSeconds={props.selectedFocusTime*60}
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

function mapStateToProps(state) {
  return {
    selectedFocusTime: state.selectedFocusTime,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pomodoroFocusTime: (focusTime) => {
      const action = {
        type: 'SELECTED_FOCUS_TIME',
        payload: focusTime
      };
      return dispatch(action)
    },
    pomodoroBreakTime: (breakTime) => {
      const action = {
        type: 'SELECTED_BREAK_TIME',
        payload: breakTime
      };
      return dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroCard);