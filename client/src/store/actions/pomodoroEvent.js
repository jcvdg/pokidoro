import * as UserApi from '../../api/UserRequest';
import types from '../actionTypes';

export const event = (focusTime) => async (dispatch) => {
  dispatch({ type: types.GETTING_EVENT});
  try {
    const  { data }  = await UserApi.getEvent(focusTime);
    dispatch({ type: types.GOT_EVENT, data: data});
  } catch (e) {
    console.log(e);
    dispatch({ type: types.GET_EVENT_FAIL });
  }
}

export const updateWeeklyStats = (stats) => async (dispatch) => {
  dispatch({ type: types.WEEKLY_UPDATING});
  try {
    await UserApi.updateWeeklyStats(stats);
    dispatch({ type: types.WEEKLY_UPDATED});
  } catch (e) {
    console.log(e);
    dispatch({ type: types.WEEKLY_FAIL });
  }
}

export const addSessionStats = ( sessionData ) => async (dispatch) => {
  const cycles = 0;
  dispatch({ type: types.SESSION_UPDATING});
  try {
    await UserApi.addSession(sessionData, cycles);
    dispatch({ type: types.SESSION_UPDATED });
  } catch (e) {
    console.log(e);
    dispatch({ type: types.SESSION_UPDATE_FAIL });
  }
}

