import React, { useEffect } from 'react';
import './WeeklyProgressCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { getWeeklyStats } from '../../store/actions/index';

const WeeklyProgressCard = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const weeklyPokemons = useSelector((state) => state.getWeeklyStats.data);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user) dispatch(getWeeklyStats());
  },[])

  const displayPokemons = () => {
    if (!user) return;

    return weeklyPokemons.map( pokemon => {
      return (
        <div key={pokemon._id}>
          <img src={pokemon.image} alt="pokemon"/>
        </div>
      )
    })
  }

  return (
    <div className="WeeklyProgressCard">
      <div className='imageContainer'>
        <div className='weeklyCollections'>
          { displayPokemons() }
        </div>
      </div>
    </div>
  );
}

export default WeeklyProgressCard;
