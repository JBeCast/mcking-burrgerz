import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurguerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurguerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurguerStart = orderData => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurguer = orderData => {
  return dispatch => {
    dispatch(purchaseBurguerStart());
    axios.post('orders.json', orderData)
      .then(res => {
        dispatch(purchaseBurguerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurguerSuccess(err));
      });
  }
}