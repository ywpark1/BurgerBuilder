import { ActionTypes as actionTypes } from './actionTypes';
import axios from '../../axios-orders';

export const orderActions = {
  purchaseBurgerSuccess: (id, orderData) => {
    return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData: orderData
    };
  },
  purchaseBurgerFail: error => {
    return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error
    };
  },
  purchaseBurgerStart: () => {
    return {
      type: actionTypes.PURCHASE_BURGER_START
    };
  },
  purchaseBurger: (orderData, token) => {
    return async dispatch => {
      try {
        dispatch(orderActions.purchaseBurgerStart());
        const res = await axios.post('/orders.json?auth=' + token, orderData);
        console.log(res.data);
        dispatch(orderActions.purchaseBurgerSuccess(res.data.name, orderData));
      } catch (error) {
        dispatch(orderActions.purchaseBurgerFail(error));
      }
    };
  },
  purchaseInit: () => {
    return {
      type: actionTypes.PURCHASE_INIT
    };
  },
  fetchOrdersSuccess: orders => {
    return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: orders
    };
  },
  fetchOrdersFail: error => {
    return {
      type: actionTypes.FETCH_ORDERS_FAIL,
      error: error
    };
  },
  fetchOrdersStart: () => {
    return {
      type: actionTypes.FETCH_ORDERS_START
    };
  },
  fetchOrders: (token, userId) => {
    return async dispatch => {
      dispatch(orderActions.fetchOrdersStart());
      const queryParams =
        '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
      try {
        const res = await axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(orderActions.fetchOrdersSuccess(fetchedOrders));
      } catch (error) {
        dispatch(orderActions.fetchOrdersFail());
      }
    };
  }
};
