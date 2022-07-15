export const pomodoroFocusTime = (focusTime) => {
  return {
    type: 'SELECTED_FOCUS_TIME',
    payload: focusTime
  }
}

export const pomodoroBreakTime = (breakTime) => {
  return {
    type: 'SELECTED_BREAK_TIME',
    payload: breakTime
  }
}
