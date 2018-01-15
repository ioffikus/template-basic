import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import categories, { getCategories, initialState } from 'src/ducks/categories';
import categoriesResponse from 'src/core/__mocks__/categoriesResponse';
import EndpointsConfig from 'src/configs/endpoints';
import nanoid from 'nanoid';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  categories,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  const abortToken = nanoid();
  afterEach(() => {
    axiosMock.reset();
  });
  it('getCategories success', () => {
    const expectedActions = [
      { type: 'CATEGORIES__CALL_REQUEST' },
      {
        type: 'CATEGORIES__CALL_SUCCESS',
        payload: categoriesResponse,
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
      categories: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CATEGORIES).reply(200, { ...categoriesResponse });
    return store.dispatch(getCategories(abortToken)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.categories).toEqual({
        ...initialState,
        ...categoriesResponse,
      });
    });
  });
  it('getCategories failure', () => {
    const expectedActions = [{ type: 'CATEGORIES__CALL_REQUEST' }, { type: 'CATEGORIES__CALL_FAILURE' }];
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
      categories: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CATEGORIES).reply(500);
    return store.dispatch(getCategories(abortToken)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.categories).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
