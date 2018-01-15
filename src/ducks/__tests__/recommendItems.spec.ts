import axios from 'axios';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import AxiosMockAdapter from 'axios-mock-adapter';
import recommendItems, { getRecommendItems, initialState } from 'src/ducks/recommendItems';
import recommendItemsResponse from 'src/core/__mocks__/recommendItemsResponse';
import EndpointsConfig from 'src/configs/endpoints';
import nanoid from 'nanoid';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const reducerMock = combineReducers({
  recommendItems,
});
const axiosMock = new AxiosMockAdapter(axios);

describe('sideeffects', () => {
  let state: Store.IState;
  let store: MockStore<Store.IState>;
  const abortToken = nanoid();
  beforeEach(() => {
    state = {
      recommendItems: {
        ...initialState,
      },
    };
    store = mockStore(() => state);
  });
  afterEach(() => {
    axiosMock.reset();
  });
  it('getRecommendItems success', () => {
    const expectedActions = [
      { type: 'RECOMMEND_ITEMS__CALL_REQUEST' },
      {
        type: 'RECOMMEND_ITEMS__CALL_SUCCESS',
        payload: recommendItemsResponse,
      },
    ];
    axiosMock.onGet(EndpointsConfig.RECOMMEND_ITEMS).reply(200, recommendItemsResponse);
    return store.dispatch(getRecommendItems(abortToken)).then(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.recommendItems).toEqual({
        ...initialState,
        ...recommendItemsResponse,
      });
    });
  });
  it('getRecommendItems failure', () => {
    const expectedActions = [{ type: 'RECOMMEND_ITEMS__CALL_REQUEST' }, { type: 'RECOMMEND_ITEMS__CALL_FAILURE' }];
    axiosMock.onGet(EndpointsConfig.RECOMMEND_ITEMS).reply(500);
    return store.dispatch(getRecommendItems(abortToken)).catch(() => {
      const actions = store.getActions().map(({ type, payload }) => ({ type, payload }));
      expect(actions).toEqual(expectedActions);
      actions.forEach(action => {
        state = reducerMock(state, action);
      });
      expect(state.recommendItems).toEqual({
        ...initialState,
        isRequestError: true,
      });
    });
  });
});
