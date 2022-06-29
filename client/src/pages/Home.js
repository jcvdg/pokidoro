import React from 'react';
import './Home.css';
import PomodoroCard from '../components/PomodoroCard';
import WeeklyProgressCard from '../components/WeeklyProgressCard';


const Home = () => {
  return (
    <div className="Home">
      <div className="centerColumn">
        <PomodoroCard />
        <WeeklyProgressCard />
      </div>
    </div>
  );
}

export default Home;
