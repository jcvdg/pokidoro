import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { selectBreakTimeReducer, selectFocusTimeReducer, updatePomodoroState } from './pomodoroReducer.js';

const berriesCountReducer = (
  state = { berryCount: 0, loading: false, error: false, state: 'DEFAULT'}, 
  action) => {
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
  state = { data: {}, loading: true, error: false, state: 'DEFAULT' }, 
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

const addSessionReducer = (
  state = { loading: true, error: false, state: null },
  // state = null, 
  action) => {
  switch (action.type) {
    case 'SESSION_UPDATING':
      return { loading: true, error: false, state: 'SESSION_UPDATING'};
    case 'SESSION_UPDATED':
      return { loading: false, error: false, state: 'SESSION_UPDATED'};
    case 'SESSION_UPDATE_FAIL':
      return { loading: false, error: true, state: 'SESSION_UPDATE_FAIL'};
    default:
      return state;
  }
}

const updateWeeklyStatsReducer = (
  state = { loading: true, error: false, state: null },
  action) => {
  switch (action.type) {
    case 'WEEKLY_UPDATING':
      return  { loading: true, error: false, state: 'WEEKLY_UPDATING'};
    case 'WEEKLY_UPDATED':
      return { loading: false, error: false, state: 'WEEKLY_UPDATED'};
    case 'WEEKLY_FAIL':
      return { loading: false, error: true, state: 'WEEKLY_FAIL'};
    default:
      return state;
  }
}

const getWeeklyStatsReducer = (
  state = { data: [], loading: true, error: false }, 
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
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
