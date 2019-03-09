import { authActionTypes } from './actionTypes';
import axios from 'axios';

export const authActions = {
  authStart: () => {
    return {
      type: authActionTypes.AUTH_START
    };
  },
  authStatus: () => {
    return {
      type: authActionTypes.AUTH_STATUS
    };
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
      type: authActionTypes.AUTH_LOGOUT
    };
  },
  checkAuthTimeout: expirationTime => {
    return dispatch => {
      setTimeout(() => {
        dispatch(authActions.logout());
      }, expirationTime * 1000);
    };
  },

  authSuccess: (idToken, localId) => {
    return {
      type: authActionTypes.AUTH_SUCCESS,
      idToken: idToken,
      userId: localId
    };
  },

  authFail: error => {
    return {
      type: authActionTypes.AUTH_FAIL,
      error: error
    };
  },

  auth: (email, password, isSignup) => {
    return async dispatch => {
      dispatch(authActions.authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };

      const REACT_APP_FIREBASE_AUTH_API_KEY =
        process.env.REACT_APP_FIREBASE_AUTH_API_KEY;
      let url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
        REACT_APP_FIREBASE_AUTH_API_KEY;

      if (!isSignup) {
        url =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          REACT_APP_FIREBASE_AUTH_API_KEY;
      }

      try {
        const res = await axios.post(url, authData);
        console.log(res);
        const expDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authActions.authSuccess(res.data.idToken, res.data.localId));
        // dispatch(authActions.checkAuthTimeout(res.data.expiresIn));
      } catch (error) {
        // console.log('[Auth] ', error.response.data.error.message);
        dispatch(authActions.authFail(error.response.data.error));
      }
    };
  },
  setAuthRedirectPath: path => {
    return {
      type: authActionTypes.SET_AUTH_REDIRECT_PATH,
      path: path
    };
  },
  authCheckState: () => {
    return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(authActions.logout());
      } else {
        const expDate = new Date(localStorage.getItem('expirationDate'));
        if (expDate < new Date()) {
          dispatch(authActions.logout());
        } else {
          const userId = localStorage.getItem('userId');
          dispatch(authActions.authSuccess(token, userId));
          dispatch(
            authActions.checkAuthTimeout(
              (expDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    };
  }
};
