import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import catalogQuery, { initialState as catalogQueryState } from 'src/ducks/catalogQuery';
import catalog, { getCatalog, initialState } from 'src/ducks/catalog';
import catalogResponse from 'src/core/__mocks__/catalogResponse';
import EndpointsConfig from 'src/configs/endpoints';
import nanoid from 'nanoid';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  catalogQuery,
  catalog,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  const abortToken = nanoid();
  afterEach(() => {
    axiosMock.reset();
  });
  it('getCatalog success', () => {
    const expectedActions = [
      { type: 'CATALOG__CALL_REQUEST' },
      {
        type: 'CATALOG__CALL_SUCCESS',
        payload: catalogResponse,
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
      catalogQuery: {
        ...catalogQueryState,
      },
      catalog: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CATALOG).reply(200, catalogResponse);
    return store.dispatch(getCatalog(abortToken)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.catalog).toEqual({
        ...initialState,
        ...catalogResponse,
      });
    });
  });
  it('getCatalog failure', () => {
    const expectedActions = [{ type: 'CATALOG__CALL_REQUEST' }, { type: 'CATALOG__CALL_FAILURE' }];
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
      catalogQuery: {
        ...catalogQueryState,
      },
      catalog: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.CATALOG).reply(500);
    return store.dispatch(getCatalog(abortToken)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.catalog).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
