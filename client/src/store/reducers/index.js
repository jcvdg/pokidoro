import { combineReducers } from 'redux';
import types from '../actionTypes';

import authReducer from './authReducer';
import { 
  updatePomodoroState 
} from './pomodoroStatesReducer.js';
import {
  selectFocusTimeReducer,
  selectBreakTimeReducer
} from './pomodoroControlReducer'
import { 
  berriesCountReducer, 
  getWeeklyStatsReducer 
} from './getDataReducer.js';
import { 
  getEventReducer, 
  addSessionReducer, 
  updateWeeklyStatsReducer
} from './pomodoroEventReducer.js';

const appReducer = combineReducers({
  selectedFocusTime: selectFocusTimeReducer,
  selectedBreakTime: selectBreakTimeReducer,
  pomodoroState: updatePomodoroState,
  authReducer: authReducer,
  berriesCount: berriesCountReducer,
  getEvent: getEventReducer,
  getWeeklyStats: getWeeklyStatsReducer,
  updateWeeklyStats: updateWeeklyStatsReducer,
  addSession: addSessionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === types.USER_LOGGED_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
