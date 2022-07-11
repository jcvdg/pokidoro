import types from '../actionTypes';

export const berriesCountReducer = (
  state = { berryCount: 0, loading: false, error: false, state: null}, 
  action) => {
  switch (action.type) {
    case types.GETTING_BERRIES_COUNT:
      return { ...state, loading: true, error: false, state: types.GETTING_BERRIES_COUNT };
    case types.GOT_BERRIES_COUNT:
      return { ...state, berryCount: action.data, loading: false, error: false, state: types.GOT_BERRIES_COUNT }
    case types.GET_BERRIES_COUNT_FAIL:
      return { ...state, loading: false, error: true, state: types.GET_BERRIES_COUNT_FAIL}
    default:
      return state;
  }
}

export const getWeeklyStatsReducer = (
  state = { data: [], loading: true, error: false }, 
  action) => {
    switch (action.type) {
      case types.GETTING_WEEKLY_GRAPH:
        return { ...state, loading: true, error: false, state: types.GETTING_WEEKLY_GRAPH };;
      case types.GOT_WEEKLY_GRAPH:
        return { ...state, data: action.data, loading: false, error: false, state: types.GOT_WEEKLY_GRAPH }
      case types.GET_WEEKLY_FAIL:
        return { ...state, loading: false, error: true, state: types.GET_WEEKLY_FAIL};
      default:
        return state;
    }
}