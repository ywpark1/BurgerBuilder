import { authActionTypes } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authProcess = {
  start: (state, action) => {
    return updateObject(state, { error: null, loading: true });
  },
  success: (state, action) => {
    return updateObject(state, {
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false
    });
  },
  fail: (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.AUTH_START:
      return authProcess.start(state, action);
    case authActionTypes.AUTH_SUCCESS:
      return authProcess.success(state, action);
    case authActionTypes.AUTH_FAIL:
      return authProcess.fail(state, action);

    default:
      return state;
  }
};

export default reducer;
