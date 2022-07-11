import types from '../actionTypes';

const authReducer = (state = { authData: null, loading: false, error: false}, action) => {
  switch(action.type) {
    case types.AUTH_START:
      return { ...state, loading: true, error: false };
    case types.AUTH_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case types.AUTH_FAIL:
        return { ...state, loading: false, error: true };
    case types.LOGGING_OUT:
      return { ...state, loading: true, error: false }
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem("profile");
      return { ...state, authData: null, loading: false, error: false }
    case types.LOGOUT_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

export default authReducer;