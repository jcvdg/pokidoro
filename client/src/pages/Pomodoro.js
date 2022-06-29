import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import './Pomodoro.css';

const Pomodoro = () => {
  return (
    <div className="Pomodoro">
      Pomoodor
      <PomodoroTimer />
    </div>
  );
}

export default Pomodoro;