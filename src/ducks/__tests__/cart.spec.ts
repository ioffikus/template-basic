import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import AxiosMockAdapter from 'axios-mock-adapter';
import cart, {
  initialState,
  deleteCart,
  postLocalStorageCart,
  addToCart,
  getCartFromLocalStorage,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
} from 'src/ducks/cart';
import auth, { initialState as authInitialState } from 'src/ducks/auth';
import ui from 'src/ducks/ui';
import EndpointsConfig from 'src/configs/endpoints';
import currentCartResponse from 'src/core/__mocks__/currentCartResponse';
import currentCartItemsResponse from 'src/core/__mocks__/currentCartItemsResponse';
import productResponse from 'src/core/__mocks__/productResponse';
import uiStateMock from 'src/store/__mocks__/uiStore';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  cart,
  auth,
  ui,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('actions', () => {
  afterEach(() => {
    window.localStorage.removeItem('cart');
  });
  it('deleteCart', () => {
    const expectedActions = [{ type: 'CART__RESET' }];
    let state: Store.IState = {
      cart: {
        ...initialState,
        items: [{} as any],
        itemsCount: 1,
        totalPrice: 1,
      },
    };
    const store = mockStore(() => state);
    store.dispatch(deleteCart());
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(state).toEqual({
      ...state,
      cart: {
        ...state.cart,
        itemsCount: 0,
        totalPrice: 0,
        items: [],
      },
    });
  });
});

describe('sideeffects', () => {
  afterEach(() => {
    axiosMock.reset();
    window.localStorage.removeItem('cart');
  });
  it('postLocalStorageCart without ducks/cart.items', () => {
    const putCartInStoreMock = {
      id: 1,
      itemsCount: 8,
      totalPrice: 111,
    };
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__PUT_CART_IN_STORE',
        payload: putCartInStoreMock,
      },
      { type: 'CART__CALL_SUCCESS' },
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__PUT_PRODUCTS_IN_STORE',
        payload: currentCartItemsResponse.results,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      cart: {
        ...initialState,
      },
    };
    axiosMock.onGet(EndpointsConfig.CART_CURRENT).reply(200, currentCartResponse);
    axiosMock.onGet(EndpointsConfig.CART_CURRENT_ITEMS).reply(200, currentCartItemsResponse);
    const store = mockStore(() => state);
    return store.dispatch(postLocalStorageCart()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...state.cart,
          ...putCartInStoreMock,
          items: currentCartItemsResponse.results,
        },
      });
    });
  });
  it('postLocalStorageCart with ducks/cart.items', () => {
    const itemsMock = [
      {
        id: 52,
        item: '2f5f0f0351144d03be7a',
        uid: '2f5f0f0351144d03be7a',
        modified: '2017-10-13T14:07:00.935238Z',
        count: 1,
        in_stock: true,
        is_deleted: false,
        schema_fields: {},
      },
    ];
    const putCartInStoreMock = {
      id: 1,
      itemsCount: 9,
      totalPrice: 112,
    };
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      { type: 'CART__CALL_SUCCESS' },
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__PUT_CART_IN_STORE',
        payload: putCartInStoreMock,
      },
      { type: 'CART__CALL_SUCCESS' },
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__PUT_PRODUCTS_IN_STORE',
        payload: currentCartItemsResponse.results,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      cart: {
        ...initialState,
        itemsCount: 1,
        totalPrice: 0,
        items: itemsMock,
      },
    };
    axiosMock.onGet(EndpointsConfig.CART_CURRENT_ITEMS).reply(200, currentCartItemsResponse);
    axiosMock
      .onPut(EndpointsConfig.CART_CURRENT, { items: [{ count: itemsMock[0].count, item: itemsMock[0].item }] })
      .reply(200);
    axiosMock.onGet(EndpointsConfig.CART_CURRENT).reply(200, {
      ...currentCartResponse,
      items_count: putCartInStoreMock.itemsCount,
      total: '' + putCartInStoreMock.totalPrice,
    });
    const store = mockStore(() => state);
    return store.dispatch(postLocalStorageCart()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...state.cart,
          ...putCartInStoreMock,
          items: currentCartItemsResponse.results,
        },
      });
    });
  });
  it('addToCart without auth and empty cart', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const expectedActions = [
      {
        type: 'CART__ADD_PRODUCT_TO_CART',
        payload: { ...itemMock, uid: undefined as string },
      },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(addToCart(itemMock, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(actions).toEqual(expectedActions);
      expect(state).toEqual({
        ...state,
        cart: {
          id: null as number,
          items: [{ ...itemMock, uid: undefined as string }],
          itemsCount: 1,
          totalPrice: 19,
          isRequestError: false,
          isRequesting: false,
        },
      });
    });
  });
  it('addToCart without auth and added second product', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const newItemMock = currentCartItemsResponse.results[1];
    const expectedActions = [
      {
        type: 'CART__ADD_PRODUCT_TO_CART',
        payload: { ...newItemMock, uid: undefined as string },
      },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
        items: [{ ...itemMock, uid: undefined as string }],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(addToCart(newItemMock, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(actions).toEqual(expectedActions);
      expect(state).toEqual({
        ...state,
        cart: {
          id: null as number,
          items: [{ ...itemMock, uid: undefined as string }, { ...newItemMock, uid: undefined as string }],
          itemsCount: 2,
          totalPrice: 39,
          isRequestError: false,
          isRequesting: false,
        },
      });
    });
  });
  it('addToCart without auth and added double product', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__INCREASE_PRODUCT_QUANTITY',
        payload: 0,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
        items: [{ ...itemMock, uid: undefined as string }],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(`${EndpointsConfig.PRODUCT}${uid}`).reply(200, productResponse);
    const cb = jest.fn();
    return store.dispatch(addToCart(itemMock, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(actions).toEqual(expectedActions);
      expect(state).toEqual({
        ...state,
        cart: {
          id: null as number,
          items: [{ ...itemMock, count: 2, uid: undefined as string }],
          itemsCount: 2,
          totalPrice: 38,
          isRequestError: false,
          isRequesting: false,
        },
      });
    });
  });
  it('addToCart with auth and empty cart', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__ADD_PRODUCT_TO_CART',
        payload: { ...itemMock },
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
      cart: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onPost(EndpointsConfig.CART_CURRENT_ITEMS).reply(200, itemMock);
    const cb = jest.fn();
    return store.dispatch(addToCart(itemMock, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(actions).toEqual(expectedActions);
      expect(state).toEqual({
        ...state,
        cart: {
          id: null as number,
          items: [{ ...itemMock }],
          itemsCount: 1,
          totalPrice: 19,
          isRequestError: false,
          isRequesting: false,
        },
      });
    });
  });
  it('addToCart with auth and added double product', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const id = itemMock.id;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__INCREASE_PRODUCT_QUANTITY',
        payload: 0,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [itemMock],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onPut(`${EndpointsConfig.CART_CURRENT_ITEMS}${id}`).reply(200);
    const cb = jest.fn();
    return store.dispatch(addToCart(itemMock, cb)).then(() => {
      expect(cb).not.toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(actions).toEqual(expectedActions);
      expect(state).toEqual({
        ...state,
        cart: {
          id: 1,
          items: [{ ...itemMock, count: 2 }],
          itemsCount: 2,
          totalPrice: 38,
          isRequestError: false,
          isRequesting: false,
        },
      });
    });
  });
  it('getCartFromLocalStorage', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const putCartInStoreMock = {
      id: 1,
      itemsCount: 1,
      totalPrice: 19,
    };
    const expectedActions = [
      {
        type: 'CART__PUT_CART_IN_STORE',
        payload: putCartInStoreMock,
      },
      { type: 'CART__PUT_PRODUCTS_IN_STORE', payload: [itemMock] },
    ];
    const itemsMockToString = JSON.stringify({ items: [itemMock], ...putCartInStoreMock });
    let state: Store.IState = {
      cart: {
        ...initialState,
      },
    };
    window.localStorage.setItem('cart', itemsMockToString);
    const store = mockStore(() => state);
    return store.dispatch(getCartFromLocalStorage()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          items: [itemMock],
          ...putCartInStoreMock,
          isRequestError: false,
          isRequesting: false,
        },
      });
    });
  });
  it('deleteFromCart without auth', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const localStorageMock = { items: [itemMock], itemsCount: 1, totalPrice: 19, id: null as number };
    const localStorageMockToString = JSON.stringify(localStorageMock);
    const uid = itemMock.uid;
    const expectedActions = [
      {
        type: 'CART__DELETE_PRODUCT_FROM_CART',
        payload: 0,
      },
    ];
    let state: Store.IState = {
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
        id: null,
        items: [itemMock],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    const store = mockStore(() => state);
    store.dispatch(deleteFromCart(uid));
    const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
    expect(actions).toEqual(expectedActions);
    actions.forEach(action => {
      state = reducerMock(state, action);
    });
    expect(window.localStorage.getItem('cart')).toEqual(localStorageMockToString);
    expect(state).toEqual({
      ...state,
      cart: {
        ...initialState,
      },
    });
  });
  it('deleteFromCart with auth and two products', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const itemMock2 = currentCartItemsResponse.results[1];
    const uid = itemMock.uid;
    const id = itemMock.id;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__DELETE_PRODUCT_FROM_CART',
        payload: 0,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [itemMock, itemMock2],
        itemsCount: 2,
        totalPrice: 39,
      },
    };
    axiosMock.onDelete(`${EndpointsConfig.CART_CURRENT_ITEMS}${id}`).reply(200);
    const store = mockStore(() => state);
    return store.dispatch(deleteFromCart(uid)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
          items: [itemMock2],
          itemsCount: 1,
          totalPrice: 20,
        },
      });
    });
  });
  it('deleteFromCart with auth and one product', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const id = itemMock.id;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__DELETE_PRODUCT_FROM_CART',
        payload: 0,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [itemMock],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    axiosMock.onDelete(`${EndpointsConfig.CART_CURRENT_ITEMS}${id}`).reply(200);
    const store = mockStore(() => state);
    return store.dispatch(deleteFromCart(uid)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
        },
      });
    });
  });
  it('increaseQuantity without auth', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const localStorageMock = { items: [itemMock], itemsCount: 1, totalPrice: 19, id: 1 };
    const localStorageMockToString = JSON.stringify(localStorageMock);
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__INCREASE_PRODUCT_QUANTITY',
        payload: 0,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [itemMock],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    axiosMock.onGet(`${EndpointsConfig.PRODUCT}${uid}`).reply(200, productResponse);
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(increaseQuantity(uid, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
          items: [{ ...itemMock, count: 2 }],
          itemsCount: 2,
          totalPrice: 38,
        },
      });
      expect(window.localStorage.getItem('cart')).toEqual(localStorageMockToString);
    });
  });
  it('increaseQuantity without auth and block increase', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__BLOCK_ITEM_INCREASE',
        payload: 0,
      },
      { type: 'CART__CALL_FAILURE' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [itemMock],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    axiosMock
      .onGet(`${EndpointsConfig.PRODUCT}${uid}`)
      .reply(200, { ...productResponse, balance: 1, is_unlimited: false });
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(increaseQuantity(uid, cb)).catch(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
          items: [{ ...itemMock, blockedIncreasing: true }],
          itemsCount: 1,
          totalPrice: 19,
          isRequestError: true,
        },
      });
    });
  });
  it('increaseQuantity with auth', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const id = itemMock.id;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__INCREASE_PRODUCT_QUANTITY',
        payload: 0,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [itemMock],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    axiosMock.onGet(`${EndpointsConfig.PRODUCT}${uid}`).reply(200, productResponse);
    axiosMock.onPut(`${EndpointsConfig.CART_CURRENT_ITEMS}${id}`).reply(200);
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(increaseQuantity(uid, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
          items: [{ ...itemMock, count: 2 }],
          itemsCount: 2,
          totalPrice: 38,
        },
      });
    });
  });
  it('increaseQuantity with auth and block increase', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const id = itemMock.id;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__BLOCK_ITEM_INCREASE',
        payload: 0,
      },
      { type: 'CART__CALL_FAILURE' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [itemMock],
        itemsCount: 1,
        totalPrice: 19,
      },
    };
    axiosMock
      .onGet(`${EndpointsConfig.PRODUCT}${uid}`)
      .reply(200, { ...productResponse, balance: 1, is_unlimited: false });
    axiosMock.onPut(`${EndpointsConfig.CART_CURRENT_ITEMS}${id}`).reply(200);
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(increaseQuantity(uid, cb)).catch(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
          items: [{ ...itemMock, blockedIncreasing: true }],
          itemsCount: 1,
          totalPrice: 19,
          isRequestError: true,
        },
      });
    });
  });
  it('decreaseQuantity without auth', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const expectedActions = [
      {
        type: 'CART__DECREASE_PRODUCT_QUANTITY',
        payload: 0,
      },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [{ ...itemMock, count: 2 }],
        itemsCount: 2,
        totalPrice: 38,
      },
    };
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(decreaseQuantity(uid, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
          items: [itemMock],
          itemsCount: 1,
          totalPrice: 19,
        },
      });
    });
  });
  it('decreaseQuantity with auth', () => {
    const itemMock = currentCartItemsResponse.results[0];
    const uid = itemMock.uid;
    const id = itemMock.id;
    const expectedActions = [
      { type: 'CART__CALL_REQUEST' },
      {
        type: 'CART__DECREASE_PRODUCT_QUANTITY',
        payload: 0,
      },
      { type: 'CART__CALL_SUCCESS' },
    ];
    let state: Store.IState = {
      ui: { ...uiStateMock },
      auth: {
        ...authInitialState,
        isAuthenticated: true,
      },
      cart: {
        ...initialState,
        id: 1,
        items: [{ ...itemMock, count: 2 }],
        itemsCount: 2,
        totalPrice: 38,
      },
    };
    axiosMock.onPut(`${EndpointsConfig.CART_CURRENT_ITEMS}${id}`).reply(200);
    const store = mockStore(() => state);
    const cb = jest.fn();
    return store.dispatch(decreaseQuantity(uid, cb)).then(() => {
      expect(cb).toBeCalled();
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state).toEqual({
        ...state,
        cart: {
          ...initialState,
          id: 1,
          items: [itemMock],
          itemsCount: 1,
          totalPrice: 19,
        },
      });
    });
  });
});
