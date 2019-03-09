import { authActionTypes } from './actionTypes';
import axios from 'axios';

export const authActions = {
  authStart: () => {
    return {
      type: authActionTypes.AUTH_START
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
        dispatch(authActions.authSuccess(res.data.idToken, res.data.localId));
      } catch (error) {
        // console.log('[Auth] ', error.response.data.error.message);
        dispatch(authActions.authFail(error.response.data.error));
      }
    };
  }
};
