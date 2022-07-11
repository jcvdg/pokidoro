import types from '../actionTypes';

export const getEventReducer = (
  state = { data: {}, loading: true, error: false, state: null }, 
  action) => {
    switch (action.type) {
      case types.GETTING_EVENT:
        return { ...state, loading: true, error: false, state: types.GETTING_EVENT };
      case types.GOT_EVENT:
        return { ...state, data: action.data, loading: false, error: false, state: types.GOT_EVENT }
      case types.GET_EVENT_FAIL:
        return { ...state, loading: false, error: true, state: types.GET_EVENT_FAIL}
      default:
        return state;
    }
}

export const addSessionReducer = (
  state = { loading: true, error: false, state: null },
  action) => {
  switch (action.type) {
    case types.SESSION_UPDATING:
      return { loading: true, error: false, state: types.SESSION_UPDATING};
    case types.SESSION_UPDATED:
      return { loading: false, error: false, state: types.SESSION_UPDATED};
    case types.SESSION_UPDATE_FAIL:
      return { loading: false, error: true, state: types.SESSION_UPDATE_FAIL};
    default:
      return state;
  }
}

export const updateWeeklyStatsReducer = (
  state = { loading: true, error: false, state: null },
  action) => {
  switch (action.type) {
    case types.WEEKLY_UPDATING:
      return  { loading: true, error: false, state: types.WEEKLY_UPDATING};
    case types.WEEKLY_UPDATED:
      return { loading: false, error: false, state: types.WEEKLY_UPDATED};
    case types.WEEKLY_FAIL:
      return { loading: false, error: true, state: types.WEEKLY_FAIL};
    default:
      return state;
  }
}