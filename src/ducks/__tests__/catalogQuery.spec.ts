import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import catalogQuery, { getCatalogQuery, initialState } from 'src/ducks/catalogQuery';
import catalogQueryResponse from 'src/core/__mocks__/catalogQueryResponse';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  catalogQuery,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  afterEach(() => {
    axiosMock.reset();
  });
  it('getCatalogQuery succes with order by ID, filters: include subcaterogies, in stock, range price from 100 to 250, categories number 23', () => {
    const expectedActions = [
      {
        type: 'CATALOG_QUERY__SET',
        payload: { ...catalogQueryResponse },
      },
    ];
    let state: Store.IState = {
      router: {
        location: {
          pathname: '/catalog',
          search:
            '?filter=%7B%22include_subcategories__eq%22%3Atrue%2C%22in_stock__eq%22%3Atrue%2C%22price__range%22%3A%5B100%2C250%5D%2C%22categories__in%22%3A%5B23%5D%7D&ordering=-id',
          hash: '',
          key: 'dummy',
        },
        action: 'PUSH',
      },
      catalogQuery: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    return store.dispatch(getCatalogQuery()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.catalogQuery).toEqual({
        ...initialState,
        ...catalogQueryResponse,
      });
    });
  });
  it('getCatalogQuery succes with only order by ID', () => {
    const expectedActions = [
      {
        type: 'CATALOG_QUERY__SET',
        payload: { ...initialState, ordering: 'id' },
      },
    ];
    let state: Store.IState = {
      router: {
        location: {
          pathname: '/catalog',
          search: '?ordering=id',
          hash: '',
          key: 'dummy',
        },
        action: 'PUSH',
      },
      catalogQuery: {
        ...initialState,
        ordering: 'id',
      },
    };
    const store = mockStore(() => state);
    return store.dispatch(getCatalogQuery()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.catalogQuery).toEqual({
        ...initialState,
        ordering: 'id',
      });
    });
  });
  it('getCategories with empty params', () => {
    const expectedActions = [{ type: 'CATALOG_QUERY__SET', payload: { ...initialState } }];
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
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    return store.dispatch(getCatalogQuery()).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.catalogQuery).toEqual({
        ...initialState,
      });
    });
  });
});
