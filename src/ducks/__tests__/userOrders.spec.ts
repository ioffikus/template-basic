import axios from 'axios';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import userOrders, { getUserOrders, initialState, checkoutUserOrder, payAnOrder } from 'src/ducks/userOrders';
import cart, { initialState as cartInitialState } from 'src/ducks/cart';
import auth, { initialState as authInitialState } from 'src/ducks/auth';
import userOrdersResponse from 'src/core/__mocks__/userOrdersResponse';
import currentCartItemsResponse from 'src/core/__mocks__/currentCartItemsResponse';
import EndpointsConfig from 'src/configs/endpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  userOrders,
  cart,
  auth,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  let state: Store.IState;
  let store: MockStore<Store.IState>;
  const newResultResponse = userOrdersResponse.results.map(item => ({
    ...item,
    cart: {
      ...item.cart,
      total: parseFloat(_.get(item.cart, 'total', '0')),
    },
  }));
  beforeEach(() => {
    state = {
      userOrders: {
        ...initialState,
      },
    };
    store = mockStore(() => state);
  });
  afterEach(() => {
    axiosMock.reset();
  });
  it('getUserOrders success with initialState', () => {
    const expectedActions = [
      { type: 'USER_ORDERS__GET_REQUEST' },
      {
        type: 'USER_ORDERS__GET_SUCCESS',
        payload: { ...userOrdersResponse, results: newResultResponse },
      },
    ];
    axiosMock.onGet(EndpointsConfig.USER_ORDERS).reply(200, userOrdersResponse);
    return store.dispatch(getUserOrders()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.userOrders).toEqual({
        ...initialState,
        ...userOrdersResponse,
        results: newResultResponse,
      });
    });
  });
  it('getUserOrders success with page 2', () => {
    const page = '2';
    state = {
      userOrders: {
        ...initialState,
        ...userOrdersResponse,
        results: newResultResponse,
      },
    };
    const expectedActions = [
      { type: 'USER_ORDERS__GET_REQUEST' },
      {
        type: 'USER_ORDERS__GET_SUCCESS',
        payload: { ...userOrdersResponse, results: [...newResultResponse, ...newResultResponse] },
      },
    ];
    axiosMock.onGet(EndpointsConfig.USER_ORDERS).reply(200, userOrdersResponse);
    return store.dispatch(getUserOrders(page)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.userOrders).toEqual({
        ...initialState,
        ...userOrdersResponse,
        results: [...newResultResponse, ...newResultResponse],
      });
    });
  });
  it('getUserOrders failure', () => {
    state = {
      userOrders: {
        ...initialState,
      },
    };
    const expectedActions = [{ type: 'USER_ORDERS__GET_REQUEST' }, { type: 'USER_ORDERS__GET_FAILURE' }];
    axiosMock.onGet(EndpointsConfig.USER_ORDERS).reply(500);
    return store.dispatch(getUserOrders()).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.userOrders).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
  it('checkoutUserOrder success', () => {
    state = {
      userOrders: {
        ...initialState,
        ...userOrdersResponse,
        results: newResultResponse,
      },
      cart: {
        ...cartInitialState,
        id: 1,
        items: [{ ...currentCartItemsResponse.results[0], uid: undefined as string }],
        itemsCount: 1,
        totalPrice: 19,
      },
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
    };
    const expectedActions = [
      { type: 'USER_ORDERS__POST_REQUEST' },
      { type: 'CART__RESET' },
      { type: 'USER_ORDERS__POST_SUCCESS' },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/user/orders'] },
      },
    ];
    axiosMock.onPost(EndpointsConfig.USER_ORDERS).reply(200);
    return store.dispatch(checkoutUserOrder()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        userOrders: {
          ...initialState,
          ...userOrdersResponse,
          results: newResultResponse,
        },
        cart: { ...cartInitialState, id: 1 },
        auth: {
          ...authInitialState,
          isAuthenticated: true,
        },
      });
    });
  });
  it('checkoutUserOrder failure', () => {
    state = {
      userOrders: {
        ...initialState,
        ...userOrdersResponse,
        results: newResultResponse,
      },
      cart: {
        ...cartInitialState,
        id: 1,
        items: [{ ...currentCartItemsResponse.results[0], uid: undefined as string }],
        itemsCount: 1,
        totalPrice: 19,
      },
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
    };
    const expectedActions = [{ type: 'USER_ORDERS__POST_REQUEST' }, { type: 'USER_ORDERS__POST_FAILURE' }];
    axiosMock.onPost(EndpointsConfig.USER_ORDERS).reply(500);
    return store.dispatch(checkoutUserOrder()).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        userOrders: {
          ...initialState,
          isRequestError: true,
        },
        cart: {
          ...cartInitialState,
          id: 1,
          items: [{ ...currentCartItemsResponse.results[0], uid: undefined as string }],
          itemsCount: 1,
          totalPrice: 19,
        },
        auth: {
          ...authInitialState,
          isAuthenticated: true,
        },
      });
    });
  });
  it('payAnOrder failure', () => {
    const id = 1;
    const expectedActions = [
      { type: 'USER_ORDERS__SET_CURRENT_PAYMENT_ID', payload: 1 },
      { type: 'USER_ORDERS__POST_REQUEST' },
      { type: 'USER_ORDERS__POST_FAILURE' },
    ];
    axiosMock.onPost(EndpointsConfig.PAY_ORDER).reply(500);
    return store.dispatch(payAnOrder(id)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        userOrders: {
          ...initialState,
          isRequestError: true,
        },
        cart: { ...cartInitialState },
        auth: {
          ...authInitialState,
        },
      });
    });
  });
});
