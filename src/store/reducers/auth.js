import { authActionTypes } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

const authProcess = {
  start: (state, action) => {
    return updateObject(state, { error: null, loading: true });
  },
  success: (state, action) => {
    const st = updateObject(state, {
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false
    });
    // console.log('[Success] ');
    // console.log(st);
    return st;
  },
  fail: (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  },
  logout: (state, action) => {
    // console.log('[Logout]');
    // console.log(state);
    return updateObject(state, { token: null, userId: null });
  },
  status: (state, action) => {
    return state;
  },
  setAuthRedirectPath: (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
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
    case authActionTypes.AUTH_LOGOUT:
      return authProcess.logout(state, action);
    case authActionTypes.AUTH_STATUS:
      return authProcess.status(state, action);
    case authActionTypes.SET_AUTH_REDIRECT_PATH:
      return authProcess.setAuthRedirectPath(state, action);

    default:
      return state;
  }
};

export default reducer;
