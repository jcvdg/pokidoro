import React from 'react';
import { useSelector } from 'react-redux';

import './DisplayPokemon.css'
import pokeball from '../../assets/img/pokeball.png';

const DisplayPokemon = () => {
  const pomodoroState = useSelector((state) => state.pomodoroState);
  const surpriseEvent = useSelector((state) => state.getEvent.data);

  return (
    <div className="DisplayPokemon">
      <div className="image">
        { pomodoroState === 'FOCUS_SESSION_START' || pomodoroState === 'DEFAULT'
          ? <div>
              <img src={pokeball} alt="pokeball" className="pokeball"/></div>
          : <div className='pokemon'>
              <img 
                src={surpriseEvent.image} 
                alt={ surpriseEvent.event === 'BERRY' ? "berry" : `${surpriseEvent.pokemonName}`}
                style={
                  { width: surpriseEvent.event === 'BERRY' ? 'auto' : 'auto', 
                    height: surpriseEvent.event === 'BERRY' ? '8rem' : '100%',
                  }}
              />
            </div>
        }
      </div>
      <div 
        className="message"
        style={{ display: pomodoroState !== 'FOCUS_SESSION_COMPLETE' ? "none" : "block" }}
      >
        {surpriseEvent?.message}
      </div>
    </div>
  )
}

export default DisplayPokemon;