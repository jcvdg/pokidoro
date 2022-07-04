import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { selectBreakTimeReducer, selectFocusTimeReducer, updatePomodoroState } from './pomodoroReducer.js';

const berriesCountReducer = (state = { berryCount: 0, loading: false, error: false, state: 'DEFAULT'}, action) => {
  switch (action.type) {
    case 'GETTING_BERRIES_COUNT':
      return { ...state, loading: true, error: false, state: 'GETTING_BERRIES_COUNT' };
    case 'GOT_BERRIES_COUNT':
      return { ...state, berryCount: action.data, loading: false, error: false, state: 'GOT_BERRIES_COUNT' }
    case 'GET_BERRIES_COUNT_FAIL':
      return { ...state, loading: false, error: true, state: 'GET_BERRIES_COUNT_FAIL'}
    default:
      return state;
  }
}

const getEventReducer = (
  state = { data: null, loading: true, error: false }, 
  action) => {
    switch (action.type) {
      case 'GETTING_EVENT':
        return { ...state, loading: true, error: false, state: 'GETTING_EVENT' };
      case 'GOT_EVENT':
        return { ...state, data: action.data, loading: false, error: false, state: 'GOT_EVENT' }
      case 'GET_EVENT_FAIL':
        return { ...state, loading: false, error: true, state: 'GET_EVENT_FAIL'}
      default:
        return state;
    }
}

// export not needed
const addSessionReducer = (state = null, action) => {
  switch (action.type) {
    case 'SESSION_UPDATING':
      return 'SESSION_UPDATING';
    case 'SESSION_UPDATED':
      return 'SESSION_UPDATED'
    case 'SESSION_UPDATE_FAIL':
      return 'SESSION_UPDATE_FAIL';
    default:
      return state;
  }
}

const updateWeeklyStatsReducer = (state = null, action) => {
  switch (action.type) {
    case 'WEEKLY_UPDATING':
      return 'WEEKLY_UPDATING';
    case 'WEEKLY_UPDATED':
      return 'WEEKLY_UPDATED';
    case 'WEEKLY_FAIL':
      return 'WEEKLY_FAIL';
    default:
      return state;
  }
}

const getWeeklyStatsReducer = (
  state = { data: null, loading: true, error: false }, 
  action) => {
    switch (action.type) {
      case 'GETTING_WEEKLY_GRAPH':
        return { ...state, loading: true, error: false, state: 'GETTING_WEEKLY_GRAPH' };;
      case 'GOT_WEEKLY_GRAPH':
        return { ...state, data: action.data, loading: false, error: false, state: 'GOT_WEEKLY_GRAPH' }
      case 'GET_WEEKLY_FAIL':
        return { ...state, loading: false, error: true, state: 'GET_WEEKLY_FAIL'};
      default:
        return state;
    }
}

export default combineReducers({
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