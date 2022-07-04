export const selectFocusTimeReducer = (state = 4, action) => {
  switch (action.type) {
    case 'SELECTED_FOCUS_TIME':
      console.log('focus reducer------ ', state, '  now ', action.payload)
      return action.payload;
    default:
      return state;
    }
}
export const selectBreakTimeReducer = (state = 5, action) => {
  switch (action.type) {
    case 'SELECTED_BREAK_TIME':
      console.log('break reducer:::::: ', state, '  now ', action.payload)
      return action.payload;
    default:
      return state;
  }
}

export const updatePomodoroState = (state = 'DEFAULT', action) => {
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