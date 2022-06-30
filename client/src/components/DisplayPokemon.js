import React from 'react';
import { useSelector } from 'react-redux';
import pokeball from '../img/pokeball.png'
const DisplayPokemon = () => {
  const pomodoroState = useSelector((state) => state.pomodoroState);
  
  return (
    <div className="DisplayPokemon">
      <div className="image">
        { pomodoroState === 'FOCUS_SESSION_START'
          ? <div><img src={pokeball} alt="pokeball"/></div>
          : <div>get Pokemon</div>
        }
      </div>
      <div className="message">

      </div>
    </div>
  )
}

export default DisplayPokemon;