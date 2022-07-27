import React from 'react';
import { useSelector } from 'react-redux';

import './DisplayPokemon.css'
import pokeball from '../../assets/img/pokeball.png';
import { BERRY } from '../../constants';
import types from '../../store/actionTypes';
import { BERRY_IMG_URL } from '../../constants';

const DisplayPokemon = () => {
  const pomodoroState = useSelector((state) => state.pomodoroState);
  const surpriseEvent = useSelector((state) => state.getEvent.data);

  let timerState = pomodoroState === types.FOCUS_SESSION_START || pomodoroState === types.DEFAULT;
  let gotBerry = surpriseEvent.event === BERRY;
  let completionMessage = pomodoroState !== types.FOCUS_SESSION_COMPLETE;


  const displayImage = () => {
    return timerState
      ? <div>
          <img src={pokeball} alt="pokeball" className="pokeball"/></div>
      : <div className='pokemon'>
          <img 
            src={ gotBerry ? BERRY_IMG_URL : surpriseEvent.image} 
            alt={ gotBerry ? "berry" : `${surpriseEvent.pokemonName}`}
            style={
              { width: gotBerry ? 'auto' : 'auto', 
                height: gotBerry ? '8rem' : '100%',
              }}
          />
        </div>
  }

  return (
    <div className="DisplayPokemon">
      <div className="image">
        { displayImage() }
      </div>
      <div 
        className="message"
        style={{ display: completionMessage ? "none" : "block" }}
      >
        {surpriseEvent?.message}
      </div>
    </div>
  )
}

export default DisplayPokemon;