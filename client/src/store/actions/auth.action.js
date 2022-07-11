import * as AuthApi from '../../api/AuthRequest';
import types from '../actionTypes';

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: types.AUTH_START })
  try {
    console.log(formData)
    // const data = {yes:"yes"};
    const { data } = await AuthApi.logIn(formData);
    console.log(data);
    dispatch({ type: types.AUTH_SUCCESS, data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: types.AUTH_FAIL });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: types.AUTH_START })
  try {
    console.log(formData)
    // const data = {yes:"yes"};
    const { data } = await AuthApi.signUp(formData);
    console.log(data);

    dispatch({ type: types.AUTH_SUCCESS, data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: types.AUTH_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGGING_OUT });
  try {
    // AuthApi.logout();
    dispatch({ type: types.USER_LOGGED_OUT}); //reset redux
    dispatch({ type: types.LOGOUT_SUCCESS });
  } catch (e) {
    console.log(e);
    dispatch({ type: types.LOGOUT_FAIL });
  }
};