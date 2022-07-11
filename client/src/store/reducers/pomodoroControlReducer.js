import types from '../actionTypes';

export const selectFocusTimeReducer = (state = 5, action) => {
  switch (action.type) {
    case types.SELECTED_FOCUS_TIME:
      return action.payload;
    default:
      return state;
    }
}
export const selectBreakTimeReducer = (state = 2, action) => {
  switch (action.type) {
    case types.SELECTED_BREAK_TIME:
      return action.payload;
    default:
      return state;
  }
}
