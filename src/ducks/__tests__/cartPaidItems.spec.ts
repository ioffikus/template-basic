import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import cartPaidItems, { getCartPaidItems, initialState } from 'src/ducks/cartPaidItems';
import cartPaidItemsResponse from 'src/core/__mocks__/cartPaidItemsResponse';
import EndpointsConfig from 'src/configs/endpoints';
import queryString from 'query-string';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  cartPaidItems,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  afterEach(() => {
    axiosMock.reset();
  });
  it('getCartPaidItems succes with 1 page', () => {
    const expectedActions = [
      { type: 'CART_PAID_ITEMS__CALL_REQUEST' },
      {
        type: 'CART_PAID_ITEMS__CALL_SUCCESS',
        payload: cartPaidItemsResponse,
      },
    ];
    let state: Store.IState = {
      router: {
        location: {
          pathname: '/',
          search: '',
          hash: '',
          key: 'dummy',
        },
        action: 'POP',
      },
      cartPaidItems: {
        ...initialState,
      },
    };
    const page = '1';
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CART_PAID_ITEMS).reply(200, cartPaidItemsResponse);
    return store.dispatch(getCartPaidItems(page)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.cartPaidItems).toEqual({
        ...initialState,
        ...cartPaidItemsResponse,
      });
    });
  });
  it('getCartPaidItems succes with 2 page', () => {
    const expectedActions = [
      { type: 'CART_PAID_ITEMS__CALL_REQUEST' },
      {
        type: 'CART_PAID_ITEMS__CALL_SUCCESS',
        payload: {
          ...cartPaidItemsResponse,
          results: [...cartPaidItemsResponse.results, ...cartPaidItemsResponse.results],
        },
      },
    ];
    let state: Store.IState = {
      router: {
        location: {
          pathname: '/',
          search: '',
          hash: '',
          key: 'dummy',
        },
        action: 'POP',
      },
      cartPaidItems: {
        ...initialState,
        ...cartPaidItemsResponse,
      },
    };
    const page = '2';
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CART_PAID_ITEMS).reply(200, cartPaidItemsResponse);
    return store.dispatch(getCartPaidItems(page)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.cartPaidItems).toEqual({
        ...initialState,
        ...cartPaidItemsResponse,
        results: [...cartPaidItemsResponse.results, ...cartPaidItemsResponse.results],
      });
    });
  });
  it('getCartPaidItems failure', () => {
    const expectedActions = [{ type: 'CART_PAID_ITEMS__CALL_REQUEST' }, { type: 'CART_PAID_ITEMS__CALL_FAILURE' }];
    let state: Store.IState = {
      router: {
        location: {
          pathname: '/',
          search: '',
          hash: '',
          key: 'dummy',
        },
        action: 'POP',
      },
      cartPaidItems: {
        ...initialState,
      },
    };
    const query = queryString.parse(state.router.location.search);
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CART_PAID_ITEMS).reply(500);
    return store.dispatch(getCartPaidItems(query)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.cartPaidItems).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
