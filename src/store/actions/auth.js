import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = _ => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData: authData
});

export const authFail = err => ({
  type: actionTypes.AUTH_FAIL,
  error: err
});

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDam1xY_t8BDBj1W9iIT2gBnSvRNkQZ-G4", authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err))
      });
  }
}