import React from 'react';
import { useSelector } from 'react-redux';

const DisplayPokemon = () => {
  const pomodoroState = useSelector((state) => state.pomodoroState);
  
  return (
    <>
      { pomodoroState === 'FOCUS_SESSION_START'
        ? <div>Pokemon Here</div>
        : <div>get Pokemon</div>
      }
    </>
  )
}

export default DisplayPokemon;