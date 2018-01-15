import axios from 'axios';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import popularItems, { getPopularItems, initialState } from 'src/ducks/popularItems';
import popularItemsResponse from 'src/core/__mocks__/popularItemsResponse';
import EndpointsConfig from 'src/configs/endpoints';
import nanoid from 'nanoid';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  popularItems,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  let state: Store.IState;
  let store: MockStore<Store.IState>;
  const abortToken = nanoid();
  beforeEach(() => {
    state = {
      popularItems: {
        ...initialState,
      },
    };
    store = mockStore(() => state);
  });
  afterEach(() => {
    axiosMock.reset();
  });
  it('getPopularItems success', () => {
    const expectedActions = [
      { type: 'POPULAR_ITEMS__CALL_REQUEST' },
      {
        type: 'POPULAR_ITEMS__CALL_SUCCESS',
        payload: popularItemsResponse,
      },
    ];
    axiosMock.onGet(EndpointsConfig.POPULAR_ITEMS).reply(200, popularItemsResponse);
    return store.dispatch(getPopularItems(abortToken)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.popularItems).toEqual({
        ...initialState,
        ...popularItemsResponse,
      });
    });
  });
  it('getPopularItems failure', () => {
    const expectedActions = [{ type: 'POPULAR_ITEMS__CALL_REQUEST' }, { type: 'POPULAR_ITEMS__CALL_FAILURE' }];
    axiosMock.onGet(EndpointsConfig.POPULAR_ITEMS).reply(500);
    return store.dispatch(getPopularItems(abortToken)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.popularItems).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
