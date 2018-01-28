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
  }
}