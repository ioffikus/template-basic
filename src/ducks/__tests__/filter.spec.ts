import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import filter, { getFilter, initialState } from 'src/ducks/filter';
import filterResponse from 'src/core/__mocks__/filterResponse';
import EndpointsConfig from 'src/configs/endpoints';
import nanoid from 'nanoid';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  filter,
  router: (state = {}) => state,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  const abortToken = nanoid();
  afterEach(() => {
    axiosMock.reset();
  });
  it('getFilter success', () => {
    const expectedActions = [
      { type: 'FILTER__CALL_REQUEST' },
      {
        type: 'FILTER__CALL_SUCCESS',
        payload: filterResponse,
      },
    ];
    let state: Store.IState = {
      router: {
        location: {
          pathname: '/catalog',
          search: '',
          hash: '',
          key: 'dummy',
        },
        action: 'PUSH',
      },
      filter: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.FILTERS).reply(200, filterResponse);
    return store.dispatch(getFilter(abortToken)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.filter).toEqual({
        ...initialState,
        ...filterResponse,
      });
    });
  });
  it('getFilter failure', () => {
    const expectedActions = [{ type: 'FILTER__CALL_REQUEST' }, { type: 'FILTER__CALL_FAILURE' }];
    let state: Store.IState = {
      router: {
        location: {
          pathname: '/catalog',
          search: '',
          hash: '',
          key: 'dummy',
        },
        action: 'PUSH',
      },
      filter: {
        ...initialState,
      },
    };
    const store = mockStore(() => state);
    axiosMock.onGet(EndpointsConfig.FILTERS).reply(500);
    return store.dispatch(getFilter(abortToken)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.filter).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
