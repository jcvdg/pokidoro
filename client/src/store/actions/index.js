import * as UserApi from '../../api/UserRequest';

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

export const getBerriesCount = () => async (dispatch) => {
  dispatch({ type: "GETTING_BERRIES_COUNT"});
  try {
    const  { data }  = await UserApi.getBerries();
    dispatch({ type: "GOT_BERRIES_COUNT", data: data.count});
  } catch (e) {
    console.log(e);
    dispatch({ type: "GET_BERRIES_COUNT_FAIL" });
  }
}

export const event = (focusTime) => async (dispatch) => {
  dispatch({ type: "GETTING_EVENT"});
  try {
    const  { data }  = await UserApi.getEvent(focusTime);
    dispatch({ type: "GOT_EVENT", data: data});
  } catch (e) {
    console.log(e);
    dispatch({ type: "GET_EVENT_FAIL" });
  }
}

export const updateWeeklyStats = (stats) => async (dispatch) => {
  dispatch({ type: "WEEKLY_UPDATING"});
  try {
    await UserApi.updateWeeklyStats(stats);
    dispatch({ type: "WEEKLY_UPDATED"});
  } catch (e) {
    console.log(e);
    dispatch({ type: "WEEKLY_FAIL" });
  }
}

export const addSessionStats = ( sessionData ) => async (dispatch) => {
  const cycles = 0;
  dispatch({ type: "SESSION_UPDATING"});
  try {
    await UserApi.addSession(sessionData, cycles);
    dispatch({ type: "SESSION_UPDATED" });
  } catch (e) {
    console.log(e);
    dispatch({ type: "SESSION_UPDATE_FAIL" });
  }
}

export const getWeeklyStats = () => async (dispatch) => {
  dispatch({ type: "GETTING_WEEKLY_GRAPH" });
  try {
    const { data } = await UserApi.getWeeklyStats();
    dispatch({ type: "GOT_WEEKLY_GRAPH", data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "GET_WEEKLY_FAIL" });
  }
}