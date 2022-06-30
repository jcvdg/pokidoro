import React from 'react';
import { useSelector } from 'react-redux';
import './DisplayPokemon.css'
import pokeball from '../img/pokeball.png'
const DisplayPokemon = () => {
  const pomodoroState = useSelector((state) => state.pomodoroState);
  
  return (
    <div className="DisplayPokemon">
      <div className="image">
        { pomodoroState === 'FOCUS_SESSION_START'
          ? <div>
              <img src={pokeball} alt="pokeball" className="pokeball"/></div>
          : <div className='pokemon'>
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" alt="pokemon"/>
            </div>
        }
      </div>
      <div className="message">
      </div>
    </div>
  )
}

export default DisplayPokemon;