import { combineReducers } from 'redux';

const selectFocusTimeReducer = (state = 25, action) => {
  switch (action.type) {
    case 'SELECTED_FOCUS_TIME':
      console.log('focus reducer------ ', state, '  now ', action.payload)
      return action.payload;
    default:
      return state;
    }
}
const selectBreakTimeReducer = (state = 5, action) => {
  switch (action.type) {
    case 'SELECTED_BREAK_TIME':
      console.log('break reducer:::::: ', state, '  now ', action.payload)
      return action.payload;
    default:
      return state;
  }
}

const updatePomodoroState = (state = 'DEFAULT', action) => {
  switch (action.type) {
    case 'FOCUS_SESSION_START':
      return 'FOCUS_SESSION_START';
    case 'FOCUS_SESSION_COMPLETE':
      return 'FOCUS_SESSION_COMPLETE';
    case 'FOCUS_SESSION_EXTENDED':
      return 'FOCUS_SESSION_EXTENDED';
    case 'BREAK_SESSION_START':
      return 'BREAK_SESSION_START';
    case 'BREAK_SESSION_COMPLETE':
      return 'BREAK_SESSION_COMPLETE';
    case 'DEFAULT':
      return 'DEFAULT';
    default:
      return state;
  }
}

export default combineReducers({
  selectedFocusTime: selectFocusTimeReducer,
  selectedBreakTime: selectBreakTimeReducer,
  pomodoroState: updatePomodoroState,
});