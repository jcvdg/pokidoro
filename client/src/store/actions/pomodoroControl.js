import types from '../actionTypes';

export const pomodoroFocusTime = (focusTime) => {
  return {
    type: types.SELECTED_FOCUS_TIME,
    payload: focusTime
  }
}

export const pomodoroBreakTime = (breakTime) => {
  return {
    type: types.SELECTED_BREAK_TIME,
    payload: breakTime
  }
}
