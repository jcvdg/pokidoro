import * as AuthApi from '../../api/AuthRequest';

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" })
  try {
    console.log(formData)
    // const data = {yes:"yes"};
    const { data } = await AuthApi.logIn(formData);
    console.log(data);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" })
  try {
    console.log(formData)
    // const data = {yes:"yes"};
    const { data } = await AuthApi.signUp(formData);
    console.log(data);

    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (e) {
    console.log(e);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGGING_OUT" });
  try {
    // AuthApi.logout();
    dispatch({ type: "USER_LOGGED_OUT"});
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOGOUT_FAIL" });
  }
};