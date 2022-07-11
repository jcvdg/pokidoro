import types from '../actionTypes';

export const updatePomodoroState = (state = 'DEFAULT', action) => {
  switch (action.type) {
    case types.FOCUS_SESSION_START:
      return types.FOCUS_SESSION_START;
    case types.FOCUS_SESSION_COMPLETE:
      return types.FOCUS_SESSION_COMPLETE;
    case types.FOCUS_SESSION_EXTENDED:
      return types.FOCUS_SESSION_EXTENDED;
    case types.BREAK_SESSION_START:
      return types.BREAK_SESSION_START;
    case types.BREAK_SESSION_COMPLETE:
      return types.BREAK_SESSION_COMPLETE;
    case types.DEFAULT:
      return types.DEFAULT;
    default:
      return state;
  }
}