// 'DEFAULT', 'FOCUS_SESSION_START', 'FOCUS_SESSION_COMPLETE', 'BREAK_SESSION_START', 'BREAK_SESSION_COMPLETE'

export const startFocusSession = () => {
  return {
    type: 'FOCUS_SESSION_START'
  };
};

export const endFocusSession = () => {
  return {
    type: 'FOCUS_SESSION_COMPLETE'
  };
};

// extend 5 min
export const extendSession = () => {
  return {
    type: 'FOCUS_SESSION_EXTENDED'
  }
}

export const startBreakSession = () => {
  return {
    type: 'BREAK_SESSION_START'
  };
}

export const endBreakSession = () => {
  return {
    type: 'BREAK_SESSION_COMPLETE'
  };
}

export const defaultState = () => {
  return {
    type: 'DEFAULT'
  }
}