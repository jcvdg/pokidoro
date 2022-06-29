export const pomodoroFocusTime = (focusTime) => {
  console.log('action creator - focus called, ', focusTime)
  return {
    type: 'SELECTED_FOCUS_TIME',
    payload: focusTime
  }
}

export const pomodoroBreakTime = (breakTime) => {
  console.log('action creator - break called, ', breakTime)
  return {
    type: 'SELECTED_BREAK_TIME',
    payload: breakTime
  }
}