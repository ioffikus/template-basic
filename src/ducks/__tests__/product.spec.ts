import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import product, { getProduct, initialState } from 'src/ducks/product';
import productResponse from 'src/core/__mocks__/productResponse';
import EndpointsConfig from 'src/configs/endpoints';
import nanoid from 'nanoid';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  product,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  const uid = productResponse.uid;
  const abortToken = nanoid();
  afterEach(() => {
    axiosMock.reset();
  });
  it('getProduct success', () => {
    const expectedActions = [
      { type: 'PRODUCTS__CALL_REQUEST' },
      {
        type: 'PRODUCTS__CALL_SUCCESS',
        payload: productResponse,
      },
      {
        payload: {
          description: '',
          keywords: ' ',
          title: '',
        },
        type: 'META__SET_META',
      },
    ];
    let state: Store.IState = {
      router: {
        location: {
          pathname: `/product/${uid}`,
          search: '',
          hash: '',
          key: 'dummy',
        },
        action: 'PUSH',
      },
      product: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(`${EndpointsConfig.PRODUCT}${uid}`).reply(200, productResponse);
    return store.dispatch(getProduct(abortToken)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      const { uid, schema_fields, categories, modifications, pictures, is_unlimited } = productResponse;
      expect(state.product).toEqual({
        ...initialState,
        uid,
        schema_fields,
        categories,
        modifications,
        pictures,
        is_unlimited,
      });
    });
  });
  it('getProduct failure', () => {
    const expectedActions = [{ type: 'PRODUCTS__CALL_REQUEST' }, { type: 'PRODUCTS__CALL_FAILURE' }];
    let state: Store.IState = {
      router: {
        location: {
          pathname: `/product/${uid}`,
          search: '',
          hash: '',
          key: 'dummy',
        },
        action: 'PUSH',
      },
      product: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(`${EndpointsConfig.PRODUCT}${uid}`).reply(500);
    return store.dispatch(getProduct(abortToken)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.product).toEqual({
        ...initialState,
        isRequestError: true,
        isRequesting: true,
      });
    });
  });
});
