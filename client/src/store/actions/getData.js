import * as UserApi from '../../api/UserRequest';
import types from '../actionTypes';

export const getBerriesCount = () => async (dispatch) => {
  dispatch({ type: types.GETTING_BERRIES_COUNT});
  try {
    const  { data }  = await UserApi.getBerries();
    dispatch({ type: types.GOT_BERRIES_COUNT, data: data.count});
  } catch (e) {
    console.log(e);
    dispatch({ type: types.GET_BERRIES_COUNT_FAIL });
  }
}

export const getWeeklyStats = () => async (dispatch) => {
  dispatch({ type: types.GETTING_WEEKLY_GRAPH });
  try {
    const { data } = await UserApi.getWeeklyStats();
    dispatch({ type: types.GOT_WEEKLY_GRAPH, data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: types.GET_WEEKLY_FAIL });
  }
}