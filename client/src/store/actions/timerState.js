import types from '../actionTypes';

export const startFocusSession = () => {
  return {
    type: types.FOCUS_SESSION_START
  };
};

export const endFocusSession = () => {
  return {
    type: types.FOCUS_SESSION_COMPLETE
  };
};

// extend 5 min
export const extendSession = () => {
  return {
    type: types.FOCUS_SESSION_EXTENDED
  }
}

export const startBreakSession = () => {
  return {
    type: types.BREAK_SESSION_START
  };
}

export const endBreakSession = () => {
  return {
    type: types.BREAK_SESSION_COMPLETE
  };
}

export const defaultState = () => {
  return {
    type: types.DEFAULT
  }
}