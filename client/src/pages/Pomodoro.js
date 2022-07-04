import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer/PomodoroTimer';
import './Pomodoro.css';

const Pomodoro = () => {
  return (
    <div className="Pomodoro">
      <PomodoroTimer />
    </div>
  );
}

export default Pomodoro;