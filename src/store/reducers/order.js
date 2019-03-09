import { ActionTypes as actionTypes } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseBurgerProcess = {
  purchaseBurgerInit: (state, action) => {
    return updateObject(state, { purchased: false });
  },
  purchaseBurgerStart: (state, action) => {
    return updateObject(state, { loading: true });
  },
  purchaseBurgerSuccess: (state, action) => {
    const newOrder = updateObject(action.orderData, {
      id: action.orderId
    });

    return updateObject(state, {
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    });
  },
  purchaseBurgerFail: (state, action) => {
    return updateObject(state, { loading: false });
  }
};

const fetchOrdersProcess = {
  start: (state, action) => {
    return updateObject(state, { loading: true });
  },
  success: (state, action) => {
    return updateObject(state, {
      orders: action.orders,
      loading: false
    });
  },
  fail: (state, action) => {
    return updateObject(state, { loading: false });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerProcess.purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerProcess.purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerProcess.purchaseBurgerFail(state, action);

    case actionTypes.PURCHASE_INIT:
      return purchaseBurgerProcess.purchaseBurgerInit(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersProcess.start(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersProcess.success(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersProcess.fail(state, action);

    default:
      return state;
  }
};

export default reducer;
