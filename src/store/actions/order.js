import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = orderData => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('orders.json', orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerSuccess(err));
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSucess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = error => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = _ => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('orders.json')
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSucess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
  }
}